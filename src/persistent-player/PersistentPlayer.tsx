import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DispatchPlayerContext,
  PlayerContext,
} from "../context/player.context";
import { useBoolean } from "../hooks"
import { nextTrackAction, setSongListAction } from "../reducers/player.reducer";
import { PlayerControl } from "./PlayerControl";
import { PlayerTrackline } from "./PlayerTrackline";
import { useMediaContext } from "../context/useMediaContext";
import type { Song } from "src/types/shared";
import PlayerArt from "./PlayerArt";

type PersistentPlayerProps = {
  playlist?: Song[];
};

export const PersistentPlayer = (props: PersistentPlayerProps) => {
  const { playlist } = props;
  const [timePass, setTimePass] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeatOnce, setIsRepeatOnce] = useBoolean(false);
  const [isShuffle, setIsShuffle] = useBoolean(false);
  const { isPlaying, currentSongSrc, release } = useContext(PlayerContext);
  const playerDispatch = useContext(DispatchPlayerContext);
  const { getStyles } = useMediaContext();
  const audioRef = useRef<HTMLAudioElement>();

  const updateTimePass = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = e.currentTarget;
    setTimePass(Math.floor(audio.currentTime));
  };

  const handleChangeTrackLine = (updatedTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = updatedTime[0];
      setTimePass(updatedTime[0]);
    }
  };

  const onEndPlayingSong = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const audio = e.currentTarget;
    if (!audio.loop) {
      playerDispatch(nextTrackAction(1, isShuffle));
    }
  };

  const onNewSongCanPlay = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    if (isPlaying) {
      const audio = e.currentTarget;
      audio.play();
      setDuration(audio.duration);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = isRepeatOnce;
  }, [isRepeatOnce]);

  useEffect(() => {
    const fetchSongList = async () => {
      if (playlist !== undefined) {
        playerDispatch(setSongListAction(playlist));
      }
    }

    fetchSongList().catch(console.error);
  }, []);

  if (!currentSongSrc) return null;

  console.log(release)
  return (
    <div id="player" {...getStyles("player")}>
      <hr {...getStyles("playerHr")} />
      <div {...getStyles("playerContainer")}>
        {release && 
          <PlayerArt 
            songUrl={release?.["songUrl"]} 
            project={release?.["project"]} 
            website={release?.["website"]} 
            artist={release?.["artist"]} 
            image={release?.["image"]} 
            isPlaying={isPlaying}
          />
        }
        <PlayerControl
          isPlaying={isPlaying}
          playerDispatch={playerDispatch}
          // isRepeatOnce={isRepeatOnce}
          toggleReplay={setIsRepeatOnce.toggle}
          isShuffle={isShuffle}
          toggleShuffle={setIsShuffle.toggle}
        />
        <PlayerTrackline
          currentTime={timePass}
          trackDuration={duration}
          onChange={handleChangeTrackLine}
        />
      </div>
      <audio
        src={currentSongSrc}
        ref={audioRef as any}
        onTimeUpdate={updateTimePass}
        onEnded={onEndPlayingSong}
        onCanPlay={onNewSongCanPlay}
        onWaiting={() => console.log('buffering')}
      ></audio>
    </div>
  );
};
