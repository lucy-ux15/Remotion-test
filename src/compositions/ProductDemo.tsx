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
  //
  // Scene 1 - Logo Intro:      0s - 2s    (frames 0-120)
  // Scene 2 - Hero Screen:     2s - 4.5s  (frames 120-270)
  // Scene 3 - Comparison:      4.5s - 6.5s (frames 270-390)
  // Scene 4 - Reports:         6.5s - 8.5s (frames 390-510)
  // Scene 5 - Feature Cards:   8.5s - 10s  (frames 510-600)

  const FPS = 60;

  // Scene 1: Logo Intro (0-2s)
  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 2; // 120 frames

  // Scene 2: Hero Screen with Phone (2-4.5s)
  const HERO_START = FPS * 2; // 120 frames
  const HERO_DURATION = FPS * 2.5; // 150 frames

  // Scene 3: Comparison Screen (4.5-6.5s)
  const COMPARISON_START = FPS * 4.5; // 270 frames
  const COMPARISON_DURATION = FPS * 2; // 120 frames

  // Scene 4: Reports Dashboard (6.5-8.5s)
  const REPORTS_START = FPS * 6.5; // 390 frames
  const REPORTS_DURATION = FPS * 2; // 120 frames

  // Scene 5: Feature Cards Finale (8.5-10s)
  const FEATURES_START = FPS * 8.5; // 510 frames
  const FEATURES_DURATION = FPS * 1.5; // 90 frames

  return (
    <AbsoluteFill>
      {/* Scene 1: Logo Intro (0-2s) - Black to logo fade, pulse, zoom out */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Hero Screen with Phone (2-4.5s) */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Comparison Screen (4.5-6.5s) */}
      <Sequence from={COMPARISON_START} durationInFrames={COMPARISON_DURATION}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 4: Reports Dashboard (6.5-8.5s) */}
      <Sequence from={REPORTS_START} durationInFrames={REPORTS_DURATION}>
        <ReportsScene />
      </Sequence>

      {/* Scene 5: Feature Cards Finale (8.5-10s) */}
      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeatureCardsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
