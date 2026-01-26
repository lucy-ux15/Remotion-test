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
          tagline: "Your SNF. You choose the outcome.",
          features: [
            {
              title: "Proactive Staffing",
              description: "Stop scrambling to fill shifts. Analyze your staff needs in real-time.",
              icon: "calendar",
            },
            {
              title: "Real-Time Analytics",
              description: "Track call-offs, auto-approvals, and shift replacements with powerful dashboards.",
              icon: "chart",
            },
            {
              title: "Cost-Efficient",
              description: "The right staff, in the right place, at the right time, for the right budget.",
              icon: "budget",
            },
          ],
          ctaText: "Book Your Free Demo",
          ctaSubtext: "Zero commitment",
        }}
      />
    </>
  );
};
