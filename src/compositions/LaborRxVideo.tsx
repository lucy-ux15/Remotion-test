import { AbsoluteFill, Sequence } from "remotion";
import { LogoIntro } from "../scenes/LogoIntro";
import { HeroScreen } from "../scenes/HeroScreen";
import { TextMorphing } from "../scenes/TextMorphing";
import { ComparisonScreen } from "../scenes/ComparisonScreen";
import { ThankYou } from "../scenes/ThankYou";

export const LaborRxVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#faf8f5" }}>
      {/* Scene 1: Logo Intro (0-3s) = frames 0-180 */}
      <Sequence from={0} durationInFrames={180}>
        <LogoIntro />
      </Sequence>

      {/* Scene 2: Hero Screen (3-10s) = frames 180-600 */}
      <Sequence from={180} durationInFrames={420}>
        <HeroScreen />
      </Sequence>

      {/* Scene 3: Text Morphing (10-20s) = frames 600-1200 */}
      <Sequence from={600} durationInFrames={600}>
        <TextMorphing />
      </Sequence>

      {/* Scene 4: Comparison (20-28s) = frames 1200-1680 */}
      <Sequence from={1200} durationInFrames={480}>
        <ComparisonScreen />
      </Sequence>

      {/* Scene 5: Thank You (28-33s) = frames 1680-1980 */}
      <Sequence from={1680} durationInFrames={300}>
        <ThankYou />
      </Sequence>
    </AbsoluteFill>
  );
};
