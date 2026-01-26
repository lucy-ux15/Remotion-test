import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../components/Logo";
import { FeatureHighlight } from "../components/FeatureHighlight";
import { CallToAction } from "../components/CallToAction";
import { Background } from "../components/Background";

export interface Feature {
  title: string;
  description: string;
  icon: "zap" | "shield" | "chart" | "calendar" | "budget";
}

export interface ProductDemoProps {
  companyName: string;
  tagline: string;
  features: Feature[];
  ctaText: string;
  ctaSubtext: string;
}

export const ProductDemo: React.FC<ProductDemoProps> = ({
  companyName,
  tagline,
  features,
  ctaText,
  ctaSubtext,
}) => {
  const { fps } = useVideoConfig();

  // Timing (30 seconds total at 30fps = 900 frames)
  // Logo: 0-5s (frames 0-150)
  // Feature 1: 5-12s (frames 150-360)
  // Feature 2: 12-19s (frames 360-570)
  // Feature 3: 19-25s (frames 570-750)
  // CTA: 25-30s (frames 750-900)

  const LOGO_START = 0;
  const LOGO_DURATION = fps * 5; // 150 frames

  const FEATURE_DURATION = fps * 6; // 180 frames each
  const FEATURE_1_START = fps * 5; // 150
  const FEATURE_2_START = fps * 11; // 330
  const FEATURE_3_START = fps * 17; // 510

  const CTA_START = fps * 24; // 720
  const CTA_DURATION = fps * 6; // 180 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Logo Intro */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION + 30}>
        <Logo companyName={companyName} tagline={tagline} />
      </Sequence>

      {/* Feature 1 */}
      <Sequence from={FEATURE_1_START} durationInFrames={FEATURE_DURATION + 30}>
        <FeatureHighlight
          feature={features[0]}
          index={0}
        />
      </Sequence>

      {/* Feature 2 */}
      <Sequence from={FEATURE_2_START} durationInFrames={FEATURE_DURATION + 30}>
        <FeatureHighlight
          feature={features[1]}
          index={1}
        />
      </Sequence>

      {/* Feature 3 */}
      <Sequence from={FEATURE_3_START} durationInFrames={FEATURE_DURATION + 30}>
        <FeatureHighlight
          feature={features[2]}
          index={2}
        />
      </Sequence>

      {/* Call to Action */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CallToAction ctaText={ctaText} ctaSubtext={ctaSubtext} />
      </Sequence>
    </AbsoluteFill>
  );
};
