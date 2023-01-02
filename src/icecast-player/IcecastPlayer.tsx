import { useContext, useEffect, useRef } from "react";
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
  callbackOnMetadata: () => void;
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
    options,
    theme,
  } = props;

  const playerDispatch = useContext(DispatchPlayerContext);
  const { getStyles } = useMediaContext(theme);
  const { isPlaying } = useContext(PlayerContext);

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

  useEffect(() => {
    if (!audioRef?.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.stop();
    }
  }, [isPlaying]);

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
