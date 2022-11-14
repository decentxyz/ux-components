import { toMinuteString } from "../utils/to-minute-string";
import * as Slider from "@radix-ui/react-slider";

type PlayerTracklineProps = {
  currentTime: number;
  trackDuration: number;
  onChange: (v: number[]) => void;
};

export const PlayerTrackline = (props: PlayerTracklineProps) => {
  const { currentTime, trackDuration, onChange } = props;
  return (
    <div className="flex grow space-x-5 justify-center items-center mx-6 md:mx-0">
      <span className="min-w-[42px]">{toMinuteString(Math.floor(currentTime))}</span>
      <Slider.Root
        defaultValue={[0]}
        max={trackDuration || 300}
        step={1}
        value={[currentTime]}
        onValueChange={onChange}
        className="relative flex items-center w-full group cursor-pointer"
      >
        <Slider.Track className="relative grow-1 h-1 w-full rounded-full bg-background-dark" >
          <Slider.Range className="absolute h-full rounded-full bg-grey.800 group-active:bg-purple"/>
        </Slider.Track>
        <Slider.Thumb className="block w-3 h-3 rounded-full group-hover:scale-150 bg-grey.800 group-hover:bg-purple-dark "/>
      </Slider.Root>

      <span className="min-w-[42px]">{toMinuteString(Math.floor(trackDuration || 0))}</span>
    </div>
  );
};
