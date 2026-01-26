import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Logo } from "../components/Logo";
import { ComparisonSection } from "../components/ComparisonSection";
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
  // Logo: 0-5s (frames 0-150)
  // Comparison: 5-13s (frames 150-390)
  // More scenes to come...

  const LOGO_START = 0;
  const LOGO_DURATION = fps * 5; // 150 frames

  const COMPARISON_START = fps * 5; // 150
  const COMPARISON_DURATION = fps * 8; // 240 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Logo Intro */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION + 30}>
        <Logo companyName={companyName} tagline={tagline} />
      </Sequence>

      {/* Comparison Section - Reactive vs Proactive */}
      <Sequence from={COMPARISON_START} durationInFrames={COMPARISON_DURATION}>
        <ComparisonSection />
      </Sequence>
    </AbsoluteFill>
  );
};
