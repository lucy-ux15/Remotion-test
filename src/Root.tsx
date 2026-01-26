import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";

// Video settings
const FPS = 30;
const DURATION_SECONDS = 5; // 5 second fast teaser with 6 scenes

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
