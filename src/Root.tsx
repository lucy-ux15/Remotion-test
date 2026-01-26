import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";

// Video settings
const FPS = 30;
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
        defaultProps={{
          companyName: "DataFlow",
          tagline: "Your Dashboard, Reimagined",
          ctaText: "Start Free Trial",
          ctaSubtext: "No credit card required - 14 day free trial",
        }}
      />
    </>
  );
};
