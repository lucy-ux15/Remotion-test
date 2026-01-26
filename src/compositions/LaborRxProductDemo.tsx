import { AbsoluteFill, Sequence } from "remotion";
import { LaborRxBackground } from "../components/LaborRxBackground";
import { LaborRxLogo } from "../components/LaborRxLogo";
import { LaborRxHero } from "../components/LaborRxHero";
import { LaborRxDashboard } from "../components/LaborRxDashboard";
import { LaborRxComparison } from "../components/LaborRxComparison";
import { LaborRxCTA } from "../components/LaborRxCTA";

export const LaborRxProductDemo: React.FC = () => {
  // 30 seconds at 30fps = 900 frames
  // Timeline breakdown:
  // Logo: 0-5s (frames 0-150)
  // Hero: 5-11s (frames 150-330)
  // Dashboard: 11-19s (frames 330-570)
  // Comparison: 19-25s (frames 570-750)
  // CTA: 25-30s (frames 750-900)

  const FPS = 30;

  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 5; // 150 frames

  const HERO_START = FPS * 5; // 150
  const HERO_DURATION = FPS * 6; // 180 frames

  const DASHBOARD_START = FPS * 11; // 330
  const DASHBOARD_DURATION = FPS * 8; // 240 frames

  const COMPARISON_START = FPS * 19; // 570
  const COMPARISON_DURATION = FPS * 6; // 180 frames

  const CTA_START = FPS * 25; // 750
  const CTA_DURATION = FPS * 5; // 150 frames

  return (
    <AbsoluteFill>
      {/* Background - always visible */}
      <LaborRxBackground />

      {/* Logo Intro (0-5s) */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION + 30}>
        <LaborRxLogo />
      </Sequence>

      {/* Hero Section (5-11s) */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION + 30}>
        <LaborRxHero />
      </Sequence>

      {/* Dashboard Showcase (11-19s) */}
      <Sequence from={DASHBOARD_START} durationInFrames={DASHBOARD_DURATION + 30}>
        <LaborRxDashboard />
      </Sequence>

      {/* Comparison Section (19-25s) */}
      <Sequence from={COMPARISON_START} durationInFrames={COMPARISON_DURATION + 30}>
        <LaborRxComparison />
      </Sequence>

      {/* Call to Action (25-30s) */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <LaborRxCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
