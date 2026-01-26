import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";

// Video settings
const FPS = 30;
const DURATION_SECONDS = 10; // 10 second teaser video

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
