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
        title="Previous"
        {...getStyles("previousButtonBase") }
        onClick={playerAction.togglePrev}
      >
        <PrevIcon />
      </button>
      {isPlaying ? (
        <button title="Pause" {...getStyles("buttonTransparent")} onClick={playerAction.togglePause}>
          <PauseIcon
            {...getStyles("playIcon")}
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      ) : (
        <button title="Play" {...getStyles("buttonTransparent")} onClick={playerAction.togglePlay}>
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
      >
        <NextIcon />
      </button>
      <button
        title="Shuffle"
        {...getStyles("shuffleButtonBase") }
        onClick={toggleShuffle}
      >
        <ShuffleIcon />
      </button>
      <button
        title="Repeat"
        {...getStyles("repeatButtonBase")}
        onClick={toggleReplay}
      >
        <RepeatIcon className="hover:fill-black" />
      </button>
    </div>
  );
};
