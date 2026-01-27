import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoScene,
  HeroScene,
  ComparisonScene,
  ReportsScene,
  FeatureCardsScene,
} from "../components/AllScenes";
import { Background } from "../components/Background";

export const ProductDemo: React.FC = () => {
  // Timing (5 seconds total at 30fps = 150 frames)
  // Scene 1 - Logo: 0-0.8s (frames 0-24)
  // Scene 2 - Hero: 0.8-1.5s (frames 24-45)
  // Scene 3 - Comparison: 1.5-3.0s (frames 45-90)
  // Scene 4 - Reports: 3.0-4.0s (frames 90-120)
  // Scene 5 - Features: 4.0-5.0s (frames 120-150)

  const FPS = 30;

  // Scene 1: Logo (0-0.8s)
  const LOGO_START = 0;
  const LOGO_DURATION = Math.floor(FPS * 0.8); // 24 frames

  // Scene 2: Hero (0.8-1.5s)
  const HERO_START = Math.floor(FPS * 0.8); // 24 frames
  const HERO_DURATION = Math.floor(FPS * 0.7); // 21 frames

  // Scene 3: Comparison (1.5-3.0s)
  const COMPARISON_START = Math.floor(FPS * 1.5); // 45 frames
  const COMPARISON_DURATION = Math.floor(FPS * 1.5); // 45 frames

  // Scene 4: Reports (3.0-4.0s)
  const REPORTS_START = Math.floor(FPS * 3.0); // 90 frames
  const REPORTS_DURATION = Math.floor(FPS * 1.0); // 30 frames

  // Scene 5: Feature Cards (4.0-5.0s)
  const FEATURES_START = Math.floor(FPS * 4.0); // 120 frames
  const FEATURES_DURATION = Math.floor(FPS * 1.0); // 30 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Scene 1: Logo with scale-in (0-0.8s) */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Hero with wipe transition (0.8-1.5s) */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Comparison with staggered cards (1.5-3.0s) */}
      <Sequence from={COMPARISON_START} durationInFrames={COMPARISON_DURATION}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 4: Reports with cascade effect (3.0-4.0s) */}
      <Sequence from={REPORTS_START} durationInFrames={REPORTS_DURATION}>
        <ReportsScene />
      </Sequence>

      {/* Scene 5: Feature cards 2x2 grid (4.0-5.0s) */}
      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeatureCardsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
