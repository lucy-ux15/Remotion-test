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
          companyName: "LaborRx",
          tagline: "Smart Staffing for Healthcare",
          ctaText: "Book your Free Demo",
          ctaSubtext: "Zero commitment",
        }}
      />
    </>
  );
};
