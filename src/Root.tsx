import { Composition } from "remotion";
import { LaborRxTeaser } from "./compositions/LaborRxTeaser";

// Video settings - 7 seconds at 30fps
const FPS = 30;
const DURATION_SECONDS = 7;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaborRxTeaser"
        component={LaborRxTeaser}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
