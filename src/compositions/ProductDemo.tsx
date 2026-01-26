import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Logo } from "../components/Logo";
import { Dashboard } from "../components/Dashboard";
import { CallToAction } from "../components/CallToAction";
import { Background } from "../components/Background";

export interface ProductDemoProps {
  companyName: string;
  tagline: string;
  ctaText: string;
  ctaSubtext: string;
}

export const ProductDemo: React.FC<ProductDemoProps> = ({
  companyName,
  tagline,
  ctaText,
  ctaSubtext,
}) => {
  const { fps } = useVideoConfig();

  // Timing (30 seconds total at 30fps = 900 frames)
  // Logo: 0-5s (frames 0-150) - Brand introduction
  // Dashboard Overview: 5-12s (frames 150-360) - Main dashboard view
  // Analytics View: 12-19s (frames 360-570) - Performance analytics
  // Metrics View: 19-25s (frames 570-750) - Key metrics tracking
  // CTA: 25-30s (frames 750-900) - Call to action

  const LOGO_START = 0;
  const LOGO_DURATION = fps * 5; // 150 frames

  const DASHBOARD_DURATION = fps * 7; // 210 frames each
  const DASHBOARD_1_START = fps * 5; // 150
  const DASHBOARD_2_START = fps * 12; // 360
  const DASHBOARD_3_START = fps * 19; // 570

  const CTA_START = fps * 25; // 750
  const CTA_DURATION = fps * 5; // 150 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Logo Intro */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION + 30}>
        <Logo companyName={companyName} tagline={tagline} />
      </Sequence>

      {/* Dashboard Overview */}
      <Sequence from={DASHBOARD_1_START} durationInFrames={DASHBOARD_DURATION + 30}>
        <Dashboard
          title="Dashboard Overview"
          variant="overview"
        />
      </Sequence>

      {/* Analytics View */}
      <Sequence from={DASHBOARD_2_START} durationInFrames={DASHBOARD_DURATION + 30}>
        <Dashboard
          title="Performance Analytics"
          variant="analytics"
        />
      </Sequence>

      {/* Metrics View */}
      <Sequence from={DASHBOARD_3_START} durationInFrames={DASHBOARD_DURATION + 30}>
        <Dashboard
          title="Key Metrics"
          variant="metrics"
        />
      </Sequence>

      {/* Call to Action */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CallToAction ctaText={ctaText} ctaSubtext={ctaSubtext} />
      </Sequence>
    </AbsoluteFill>
  );
};
