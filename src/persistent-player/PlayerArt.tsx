import { useMediaContext } from "../context/useMediaContext";
import { ICON_BIG } from "../constants/styles"

type PlayerArtProps = {
    songUrl: string;
    project: string;
    website: string;
    artist: string;
    image: string;
}

const PlayerArt = (props: PlayerArtProps) => {
    const {songUrl, project, website, artist, image} = props;
    const { getStyles } = useMediaContext();

    return (
        <div {...getStyles("playerArtContainer")}>
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
          <a href={songUrl}>
            <img className="rounded-sm hover:opacity-90" src={image} width={ICON_BIG} height={ICON_BIG}></img>
          </a>
        </div>
    )
}

export default PlayerArt