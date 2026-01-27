import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoIntroScene,
  HeroScene,
  FeatureHighlightsScene,
  ComparisonScene,
  ThankYouScene,
} from "../components/LaborRxScenes";

// LaborRx Premium Product Demo Video
// Total Duration: 30 seconds at 60fps = 1800 frames
//
// Scene Timeline:
// - Scene 1: Logo Intro        (0-3s)     = frames 0-180
// - Scene 2: Hero Screen       (3-8s)     = frames 180-480
// - Scene 3: Feature Highlights (8-18s)   = frames 480-1080
// - Scene 4: Comparison        (18-25s)   = frames 1080-1500
// - Scene 5: Thank You         (25-30s)   = frames 1500-1800

export const ProductDemo: React.FC = () => {
  const FPS = 60;

  return (
    <AbsoluteFill>
      {/* Scene 1: Logo Intro (0-3 seconds) */}
      <Sequence from={0} durationInFrames={FPS * 3}>
        <LogoIntroScene />
      </Sequence>

      {/* Scene 2: Hero Screen - "Get Your Shifts Together" (3-8 seconds) */}
      <Sequence from={FPS * 3} durationInFrames={FPS * 5}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Feature Highlights - Rotating Text (8-18 seconds) */}
      <Sequence from={FPS * 8} durationInFrames={FPS * 10}>
        <FeatureHighlightsScene />
      </Sequence>

      {/* Scene 4: Comparison Screen - Reactive vs Proactive (18-25 seconds) */}
      <Sequence from={FPS * 18} durationInFrames={FPS * 7}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 5: Thank You / Call-to-Action (25-30 seconds) */}
      <Sequence from={FPS * 25} durationInFrames={FPS * 5}>
        <ThankYouScene />
      </Sequence>
    </AbsoluteFill>
  );
};
