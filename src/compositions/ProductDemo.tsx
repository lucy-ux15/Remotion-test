import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoScene,
  HeroScene,
  RotatingTextScene,
  ComparisonScene,
  ThankYouScene,
} from "../components/LaborRxScenes";

// LaborRx Premium Product Demo Video
// Total Duration: 33 seconds at 60fps = 1980 frames
//
// Scene Timeline:
// - Scene 1: Logo Intro     (0-3s)    = frames 0-180
// - Scene 2: Hero           (3-10s)   = frames 180-600
// - Scene 3: Text Morphing  (10-20s)  = frames 600-1200
// - Scene 4: Comparison     (20-28s)  = frames 1200-1680
// - Scene 5: Thank You      (28-33s)  = frames 1680-1980

export const ProductDemo: React.FC = () => {
  const FPS = 60;

  return (
    <AbsoluteFill>
      {/* Scene 1: Logo Intro (0-3 seconds) */}
      <Sequence from={0} durationInFrames={FPS * 3}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Hero - "Get your shifts together" (3-10 seconds) */}
      <Sequence from={FPS * 3} durationInFrames={FPS * 7}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Text Morphing - professional / cost-efficient / smooth platform (10-20 seconds) */}
      <Sequence from={FPS * 10} durationInFrames={FPS * 10}>
        <RotatingTextScene />
      </Sequence>

      {/* Scene 4: Comparison - Reactive vs Proactive cards (20-28 seconds) */}
      <Sequence from={FPS * 20} durationInFrames={FPS * 8}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 5: Thank You (28-33 seconds) */}
      <Sequence from={FPS * 28} durationInFrames={FPS * 5}>
        <ThankYouScene />
      </Sequence>
    </AbsoluteFill>
  );
};
