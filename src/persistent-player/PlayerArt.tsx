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

    return (
        <div className="flex flex-row justify-between px-6 pt-6 md:py-4 mb-8 md:mb-0 cursor-pointer">
          <div className="md:mr-4 md:w-64 whitespace-nowrap md:text-right">
            <a href={songUrl}>
              <h3 title={project} className="text-ellipsis overflow-hidden hover:text-primary">
                {project || ""}
              </h3>
            </a>
            <a href={website}>
              <p title={artist} className="text-ellipsis overflow-hidden hover:text-primary">
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