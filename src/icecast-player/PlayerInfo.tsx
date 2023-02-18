import { useMediaContext } from "../context/useMediaContext";
import type { Song } from "src/types/shared";

type PlayerInfoProps = {
  nextSong?: Song | undefined;
  theme?: any;
};

export const PlayerInfo = (props: PlayerInfoProps) => {
  const { nextSong, theme } = props;

  const { getStyles } = useMediaContext(theme);

  return (
    <div {...getStyles("playerInfoContainer")}>
      {nextSong?.project && (
        <div {...getStyles("playerTextContainer")}>
          <span {...getStyles("playerInfoNextTag")}>Next track</span>
          <p title={nextSong.project} {...getStyles("playerInfoNextText")}>
            {`${nextSong.project} - ${nextSong.artist}`}
          </p>
        </div>
      )}
    </div>
  );
};
