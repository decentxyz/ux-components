import { Dispatch, useMemo } from "react";
import { ICON_BIG } from "../constants/styles";
import PlayIconAlt from "../images/PlayIconAlt";
import PauseAlt from "../images/PauseAlt";
import {
  pauseTrackAction,
  PlayerAction,
  playTrackAction,
} from "../reducers/player.reducer";
import { useMediaContext } from "../context/useMediaContext";

type PlayerControlProps = {
  isPlaying: boolean;
  playerDispatch: Dispatch<PlayerAction>;
  theme?: any;
};

export const PlayerControl = (props: PlayerControlProps) => {
  const {
    isPlaying,
    playerDispatch,
    theme,
  } = props;
  const { getStyles } = useMediaContext(theme);

  const playerAction = useMemo(
    () => ({
      togglePlay: () => playerDispatch(playTrackAction()),
      togglePause: () => playerDispatch(pauseTrackAction()),
    }),
    []
  );

  return (
    <div {...getStyles("playerControlContainer")}>
      {isPlaying ? (
        <button title="Pause" {...getStyles("buttonTransparent")} onClick={playerAction.togglePause}>
          <PauseAlt
            {...getStyles("playIcon")}
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      ) : (
        <button title="Play" {...getStyles("buttonTransparent")} onClick={playerAction.togglePlay}>
          <PlayIconAlt
            {...getStyles("playIcon")}
            width={ICON_BIG}
            height={ICON_BIG}
          />
        </button>
      )}
    </div>
  );
};
