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

type PlayerControlProps = {
  isPlaying: boolean;
  isRepeatOnce: boolean;
  isShuffle: boolean;
  playerDispatch: Dispatch<PlayerAction>;
  toggleReplay: () => void;
  toggleShuffle: () => void;
};

export const PlayerControl = (props: PlayerControlProps) => {
  const {
    isPlaying,
    isRepeatOnce,
    isShuffle,
    toggleReplay,
    toggleShuffle,
    playerDispatch,
  } = props;

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
    <div className="flex my-6 md:my-4 md:mr-10 justify-center items-center">
      <button
        title="Shuffle"
        tabIndex={Number(isDesktopMode ? 4 : null)}
        className={`md:order-4 mr-8 md:mr-9 relative flex ${
          isShuffle
            ? "after:content-[' '] after:w-1 after:h-1 after:absolute after:-right-1 after:bg-purple after:rounded-full"
            : ""
        }`}
        onClick={toggleShuffle}
      >
        <ShuffleIcon className="hover:fill-black" />
      </button>
      <button
        title="Previous"
        className="md:order-2 md:mr-9 flex"
        onClick={playerAction.togglePrev}
        tabIndex={Number(isDesktopMode ? 2 : null)}
      >
        <PrevIcon className="hover:fill-black" />
      </button>
      {isPlaying ? (
        <button
          title="Pause"
          onClick={playerAction.togglePause}
          className="mx-8 md:order-1 md:mx-6 flex"
          tabIndex={Number(isDesktopMode ? 1 : null)}
        >
          <PauseIcon
            className="fill-primary hover:fill-purple-dark"
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      ) : (
        <button
          title="Play"
          onClick={playerAction.togglePlay}
          className="mx-8 md:order-1 md:mx-6 flex"
          tabIndex={Number(isDesktopMode ? 1 : null)}
        >
          <PlayIcon
            className="fill-primary hover:fill-purple-dark"
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      )}
      <button
        title="Next"
        className="mr-8 md:order-3 md:mr-9 flex"
        onClick={playerAction.toggleNext}
        tabIndex={Number(isDesktopMode ? 3 : null)}
      >
        <NextIcon className="hover:fill-black" />
      </button>
      <button
        title="Repeat"
        className={`md:order-5 relative flex ${
          isRepeatOnce
            ? "after:content-[' '] after:w-1 after:h-1 after:absolute after:right-0 after:bg-purple after:rounded-full"
            : ""
        }`}
        onClick={toggleReplay}
        tabIndex={Number(isDesktopMode ? 4 : null)}
      >
        <RepeatIcon className="hover:fill-black" />
      </button>
    </div>
  );
};