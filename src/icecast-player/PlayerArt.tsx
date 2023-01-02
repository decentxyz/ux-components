import { useMediaContext } from "../context/useMediaContext";
import { DISC_SIZE } from "../constants/styles"

type PlayerArtProps = {
    songUrl: string;
    project: string;
    website: string;
    artist: string;
    image: string;
    isPlaying: boolean;
    theme?: any;
}

const PlayerArt = (props: PlayerArtProps) => {
    const {songUrl, project, website, artist, image, theme} = props;
    const { getStyles } = useMediaContext(theme);

    return (
        <div {...getStyles("playerArtContainer")}>
          <a
            target="_blank"
            rel="noreferrer"
            href={songUrl}
            {...getStyles("playerSpinner")}
          >
            <img {...getStyles("playerImage")} src={image} width={DISC_SIZE} height={DISC_SIZE}></img>
          </a>
          <div {...getStyles("playerTextContainer")}>
            <a href={songUrl} target="_blank" rel="noreferrer">
              <h3 title={project} {...getStyles("playerText")}>
                {project || ""}
              </h3>
            </a>
            <a href={website} target="_blank" rel="noreferrer">
              <p title={artist} {...getStyles("playerTextArtist")}>
                {artist || ""}
              </p>
            </a>
          </div>
        </div>
    )
}

export default PlayerArt
