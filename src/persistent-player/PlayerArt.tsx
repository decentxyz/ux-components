import { useMediaContext } from "../context/useMediaContext";
import { DISC_SIZE } from "../constants/styles"

type PlayerArtProps = {
    songUrl: string;
    project: string;
    website: string;
    artist: string;
    image: string;
    isPlaying: boolean;
}

const PlayerArt = (props: PlayerArtProps) => {
    const {songUrl, project, website, artist, image} = props;
    const { getStyles } = useMediaContext();

    return (
        <div {...getStyles("playerArtContainer")}>
          <a
            href={songUrl}
            style={{animationPlayState: props.isPlaying ? "running" : "paused"}}
            {...getStyles("playerSpinner")}
          >
            <img {...getStyles("playerImage")} src={image} width={DISC_SIZE} height={DISC_SIZE}></img>
          </a>
          <div {...getStyles("playerTextContainer")}>
            <a href={songUrl}>
              <h3 title={project} {...getStyles("playerText")}>
                {project || ""}
              </h3>
            </a>
            <a href={website}>
              <p title={artist} {...getStyles("playerText")}>
                {artist || ""}
              </p>
            </a>
          </div>
        </div>
    )
}

export default PlayerArt