import { useContext, useEffect, useRef, useState } from "react";
import {
  DispatchPlayerContext,
  PlayerContext,
} from "../context/player.context";
import { PlayerControl } from "./PlayerControl";
import { useMediaContext } from "../context/useMediaContext";
import type { ThemeType } from "../context/MediaContext";
import type { Song } from "src/types/shared";
import PlayerArt from "./PlayerArt";
import { PlayerInfo } from "./PlayerInfo";
import { setAudioVolumeAction } from "../reducers/player.reducer";

// https://www.npmjs.com/package/icecast-metadata-player#options
type IcecastOptions = {
  playbackMethod?: "mediasource" | "webaudio" | "html5" | undefined
}

type ThemeProps = {
  [key in keyof ThemeType["styles"]]: string;
};

type IcecastPlayerProps = {
  streamURL: string;
  currentSong?: Song | undefined;
  nextSong?: Song | undefined;
  options?: IcecastOptions | undefined
  callbackOnMetadata: (metadata: any) => void;
  callbackOnPlay?: () => void;
  callbackOnPause?: () => void;
  theme?: ThemeProps;
};

/**
 * Mimimal player that handles an icecast stream with real-time metadata updates.
 * https://www.npmjs.com/package/icecast-metadata-player
 */
export const IcecastPlayer = (props: IcecastPlayerProps) => {
  const {
    streamURL,
    currentSong,
    nextSong,
    callbackOnMetadata,
    callbackOnPlay,
    callbackOnPause,
    options,
    theme,
  } = props;

  const playerDispatch = useContext(DispatchPlayerContext);
  const { getStyles } = useMediaContext(theme);
  const { isPlaying, audioVolume } = useContext(PlayerContext);
  const [previousVolume, setPreviousVolume] = useState<number | undefined>();

  const audioRef = useRef<any>(null);

  const onError = (message: string, error: any) => {
    console.log(`IcecastPlayer:: onError: ${message}`, error);

    // HACK: on first play press
    if (audioRef?.current && audioRef.current.state !== 'playing') {
      audioRef.current.play();
    }
  }

  useEffect(() => {
    const setIcecast = async () => {
      const IcecastMetadataPlayer = (await import('icecast-metadata-player')).default;
      audioRef.current = new IcecastMetadataPlayer(streamURL, {
        playbackMethod: options?.playbackMethod,
        onMetadata: callbackOnMetadata,
        onError,
      });
    };

    if (!!streamURL) {
      setIcecast();
    }
  }, [streamURL]);

  // "pausing" actually just mutes the audio
  useEffect(() => {
    if (!audioRef?.current) return;

    if (isPlaying) {
      if (audioRef.current.state !== 'playing') {
        audioRef.current.play();
      }

      if (previousVolume) {
        playerDispatch(setAudioVolumeAction(previousVolume));
      }

      if (callbackOnPlay) callbackOnPlay();
    } else {
      setPreviousVolume(audioVolume);
      playerDispatch(setAudioVolumeAction(0));

      if (callbackOnPause) callbackOnPause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!(audioRef?.current && audioRef.current.state === 'playing')) return;

    audioRef.current.audioElement.volume = audioVolume;
  }, [audioVolume]);

  return (
    <div id="player" {...getStyles("player")}>
      <div {...getStyles("playerContainer")}>
        <PlayerArt
          songUrl={currentSong?.songUrl || ""}
          project={currentSong?.project || ""}
          website={currentSong?.website || ""}
          artist={currentSong?.artist || ""}
          image={currentSong?.image || ""}
          isPlaying={isPlaying}
          theme={theme}
        />
        <PlayerControl
          isPlaying={isPlaying}
          playerDispatch={playerDispatch}
          theme={theme}
        />
        <PlayerInfo
          nextSong={nextSong}
          theme={theme}
        />
      </div>
    </div>
  );
};
