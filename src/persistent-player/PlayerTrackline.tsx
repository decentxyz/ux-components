import { toMinuteString } from "../utils/to-minute-string";
import * as Slider from "@radix-ui/react-slider";
import { useMediaContext } from "../context/useMediaContext";

type PlayerTracklineProps = {
  currentTime: number;
  trackDuration: number;
  onChange: (v: number[]) => void;
};

export const PlayerTrackline = (props: PlayerTracklineProps) => {
  const { getStyles } = useMediaContext();
  const { currentTime, trackDuration, onChange } = props;
  return (
    <div {...getStyles("playerTracklineContainer")}>
      <span {...getStyles("playerMinuteString")}>{toMinuteString(Math.floor(currentTime))}</span>
      <Slider.Root
        defaultValue={[0]}
        max={trackDuration || 300}
        step={1}
        value={[currentTime]}
        onValueChange={onChange}
        {...getStyles("sliderRoot")}
      >
        <Slider.Track {...getStyles("sliderTrack")} >
          <Slider.Range {...getStyles("sliderRange")}/>
        </Slider.Track>
        <Slider.Thumb {...getStyles("sliderThumb")}/>
      </Slider.Root>

      <span {...getStyles("playerMinuteString")}>{toMinuteString(Math.floor(trackDuration || 0))}</span>
    </div>
  );
};
