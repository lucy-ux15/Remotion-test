import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoScene,
  HeroScene,
  ComparisonScene,
  ReportsScene,
  FeatureCardsScene,
} from "../components/AllScenes";

export const ProductDemo: React.FC = () => {
  // Premium 10-second animation at 60fps = 600 frames total
  const FPS = 60;

  return (
    <AbsoluteFill>
      {/* Scene 1: Logo Intro (0-2s) */}
      <Sequence from={0} durationInFrames={FPS * 2}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Hero Screen with Phone (2-4.5s) */}
      <Sequence from={FPS * 2} durationInFrames={FPS * 2.5}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Comparison Screen (4.5-6.5s) */}
      <Sequence from={FPS * 4.5} durationInFrames={FPS * 2}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 4: Reports Dashboard (6.5-8.5s) */}
      <Sequence from={FPS * 6.5} durationInFrames={FPS * 2}>
        <ReportsScene />
      </Sequence>

      {/* Scene 5: Feature Cards Finale (8.5-10s) */}
      <Sequence from={FPS * 8.5} durationInFrames={FPS * 1.5}>
        <FeatureCardsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
