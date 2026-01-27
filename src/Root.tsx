import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";

// Video settings - Premium 30-second animation at 60fps
// 1920x1080 Full HD resolution
const FPS = 60;
const DURATION_SECONDS = 30;

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
