import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";

// Video settings - Premium 10-second animation at 60fps
const FPS = 60;
const DURATION_SECONDS = 10;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
