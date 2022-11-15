import { Dispatch, useMemo } from "react";
import { ICON_BIG } from "../constants/styles";
import NextIcon from "../images/NextIcon";
import PrevIcon from "../images/PrevIcon";
import PlayIcon from "../images/PlayIcon";
import {PauseIcon} from "../images/Pause";
import RepeatIcon from "../images/Repeat";
import ShuffleIcon from "../images/ShuffleIcon";
import {
  nextTrackAction,
  pauseTrackAction,
  PlayerAction,
  playTrackAction,
} from "../reducers/player.reducer";
import { useMediaQuery } from "../hooks";
import { useMediaContext } from "../context/useMediaContext";

type PlayerControlProps = {
  isPlaying: boolean;
  // isRepeatOnce: boolean;
  isShuffle: boolean;
  playerDispatch: Dispatch<PlayerAction>;
  toggleReplay: () => void;
  toggleShuffle: () => void;
};

export const PlayerControl = (props: PlayerControlProps) => {
  const {
    isPlaying,
    // isRepeatOnce,
    isShuffle,
    toggleReplay,
    toggleShuffle,
    playerDispatch,
  } = props;
  const { getStyles } = useMediaContext();

  const isDesktopMode = useMediaQuery(
    `(min-width: 900px)`
  );

  const playerAction = useMemo(
    () => ({
      togglePlay: () => playerDispatch(playTrackAction()),
      togglePause: () => playerDispatch(pauseTrackAction()),
      toggleNext: () => playerDispatch(nextTrackAction(1, isShuffle)),
      togglePrev: () => playerDispatch(nextTrackAction(-1, isShuffle)),
    }),
    [isShuffle]
  );

  return (
    <div {...getStyles("playerControlContainer")}>
      <button
        title="Shuffle"
        tabIndex={Number(isDesktopMode ? 4 : null)}
        {...getStyles("shuffleButtonBase") }
        onClick={toggleShuffle}
      >
        <ShuffleIcon />
      </button>
      <button
        title="Previous"
        {...getStyles("previousButtonBase") }
        onClick={playerAction.togglePrev}
        tabIndex={Number(isDesktopMode ? 2 : null)}
      >
        <PrevIcon />
      </button>
      {isPlaying ? (
        <button title="Pause" tabIndex={Number(isDesktopMode ? 1 : null)} {...getStyles("buttonTransparent")} onClick={playerAction.togglePause}>
          <PauseIcon
            {...getStyles("playIcon")}
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      ) : (
        <button title="Play" tabIndex={Number(isDesktopMode ? 1 : null)} {...getStyles("buttonTransparent")} onClick={playerAction.togglePlay}>
          <PlayIcon
            {...getStyles("playIcon")}
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      )}
      <button
        title="Next"
        {...getStyles("nextButtonBase")}
        onClick={playerAction.toggleNext}
        tabIndex={Number(isDesktopMode ? 3 : null)}
      >
        <NextIcon />
      </button>
      <button
        title="Repeat"
        {...getStyles("repeatButtonBase")}
        onClick={toggleReplay}
        tabIndex={Number(isDesktopMode ? 4 : null)}
      >
        <RepeatIcon className="hover:fill-black" />
      </button>
    </div>
  );
};
