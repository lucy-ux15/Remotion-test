import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoImageScene,
  HeroImageScene,
  ComparisonImageScene,
  DashboardImageScene,
  FeaturesImageScene,
  TransitionFlash,
} from "../components/ImageAnimation";

export const ProductDemo: React.FC = () => {
  // Premium 10-second animation at 60fps = 600 frames total
  // Using ACTUAL screenshot images, not recreated components
  //
  // Scene 1 - Logo:           0s - 2s    (frames 0-120)
  // Scene 2 - Hero:           2s - 4.5s  (frames 120-270)
  // Scene 3 - Comparison:     4.5s - 6.5s (frames 270-390)
  // Scene 4 - Dashboard:      6.5s - 8.5s (frames 390-510)
  // Scene 5 - Features:       8.5s - 10s  (frames 510-600)

  const FPS = 60;

  // Scene 1: Logo Intro (0-2s)
  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 2; // 120 frames

  // Scene 2: Hero Screen (2-4.5s)
  const HERO_START = FPS * 2; // 120 frames
  const HERO_DURATION = FPS * 2.5; // 150 frames

  // Scene 3: Comparison Screen (4.5-6.5s)
  const COMPARISON_START = FPS * 4.5; // 270 frames
  const COMPARISON_DURATION = FPS * 2; // 120 frames

  // Scene 4: Dashboard Reports (6.5-8.5s)
  const DASHBOARD_START = FPS * 6.5; // 390 frames
  const DASHBOARD_DURATION = FPS * 2; // 120 frames

  // Scene 5: Feature Grid Finale (8.5-10s)
  const FEATURES_START = FPS * 8.5; // 510 frames
  const FEATURES_DURATION = FPS * 1.5; // 90 frames

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Scene 1: Logo Intro (0-2s) */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <LogoImageScene />
      </Sequence>

      {/* Scene 2: Hero Screen (2-4.5s) */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION}>
        <HeroImageScene />
      </Sequence>

      {/* Scene 3: Comparison Cards (4.5-6.5s) */}
      <Sequence from={COMPARISON_START} durationInFrames={COMPARISON_DURATION}>
        <ComparisonImageScene />
      </Sequence>

      {/* Scene 4: Dashboard Reports (6.5-8.5s) */}
      <Sequence from={DASHBOARD_START} durationInFrames={DASHBOARD_DURATION}>
        <DashboardImageScene />
      </Sequence>

      {/* Scene 5: Feature Grid Finale (8.5-10s) */}
      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeaturesImageScene />
      </Sequence>

      {/* Transition flashes between scenes */}
      <Sequence from={0} durationInFrames={600}>
        <TransitionFlash startFrame={HERO_START} />
        <TransitionFlash startFrame={COMPARISON_START} />
        <TransitionFlash startFrame={DASHBOARD_START} />
        <TransitionFlash startFrame={FEATURES_START} />
      </Sequence>
    </AbsoluteFill>
  );
};
