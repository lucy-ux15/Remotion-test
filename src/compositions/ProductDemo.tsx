import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoScene,
  HeroScene,
  RotatingTextScene,
  ComparisonScene,
  ThankYouScene,
} from "../components/LaborRxScenes";

// LaborRx Premium Product Demo Video
// Total Duration: 35 seconds at 60fps = 2100 frames
//
// Scene Timeline:
// - Scene 1: Logo            (0-3s)     = frames 0-180
// - Scene 2: Hero            (3-8s)     = frames 180-480
// - Scene 3: Rotating Text   (8-18s)    = frames 480-1080
// - Scene 4: Comparison      (18-25s)   = frames 1080-1500
// - Scene 5: Thank You       (25-30s)   = frames 1500-1800

export const ProductDemo: React.FC = () => {
  const FPS = 60;

  return (
    <AbsoluteFill>
      {/* Scene 1: Logo (0-3 seconds) */}
      <Sequence from={0} durationInFrames={FPS * 3}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Hero - "Get your shifts together" (3-8 seconds) */}
      <Sequence from={FPS * 3} durationInFrames={FPS * 5}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Rotating Text - professional / cost-efficient / smooth platform (8-18 seconds) */}
      <Sequence from={FPS * 8} durationInFrames={FPS * 10}>
        <RotatingTextScene />
      </Sequence>

      {/* Scene 4: Comparison - Reactive vs Proactive cards (18-25 seconds) */}
      <Sequence from={FPS * 18} durationInFrames={FPS * 7}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 5: Thank You (25-30 seconds) */}
      <Sequence from={FPS * 25} durationInFrames={FPS * 5}>
        <ThankYouScene />
      </Sequence>
    </AbsoluteFill>
  );
};
