import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoImageScene,
  HeroImageScene,
  ComparisonImageScene,
  DashboardImageScene,
  FeaturesImageScene,
} from "../components/ImageAnimation";

export const ProductDemo: React.FC = () => {
  // Premium 10-second animation at 60fps = 600 frames total
  // Using ACTUAL screenshot images (not recreated components)
  //
  // Scene 1 - Logo:           0s - 2s    (frames 0-120)
  // Scene 2 - Hero:           2s - 4.5s  (frames 120-270)
  // Scene 3 - Comparison:     4.5s - 6.5s (frames 270-390)
  // Scene 4 - Dashboard:      6.5s - 8.5s (frames 390-510)
  // Scene 5 - Features:       8.5s - 10s  (frames 510-600)

  const FPS = 60;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Scene 1: Logo (0-2s) */}
      <Sequence from={0} durationInFrames={FPS * 2}>
        <LogoImageScene />
      </Sequence>

      {/* Scene 2: Hero with Phone (2-4.5s) */}
      <Sequence from={FPS * 2} durationInFrames={FPS * 2.5}>
        <HeroImageScene />
      </Sequence>

      {/* Scene 3: Comparison Cards (4.5-6.5s) */}
      <Sequence from={FPS * 4.5} durationInFrames={FPS * 2}>
        <ComparisonImageScene />
      </Sequence>

      {/* Scene 4: Dashboard Reports (6.5-8.5s) */}
      <Sequence from={FPS * 6.5} durationInFrames={FPS * 2}>
        <DashboardImageScene />
      </Sequence>

      {/* Scene 5: Feature Grid Finale (8.5-10s) */}
      <Sequence from={FPS * 8.5} durationInFrames={FPS * 1.5}>
        <FeaturesImageScene />
      </Sequence>
    </AbsoluteFill>
  );
};
