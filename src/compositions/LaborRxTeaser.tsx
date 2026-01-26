import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { LaborRxLogo } from "../components/LaborRxLogo";
import { PhoneMockupScene } from "../components/PhoneMockupScene";
import { SchedulingScene } from "../components/SchedulingScene";
import { SNFOutcomesScene } from "../components/SNFOutcomesScene";
import { FeatureCardsScene } from "../components/FeatureCardsScene";
import { ThankYouScene } from "../components/ThankYouScene";
import { WarmBackground } from "../components/WarmBackground";

// 6-7 second video at 30fps = 180-210 frames
// Scene timing breakdown:
// Scene 1 - Logo Reveal: 0-36 frames (1.2 seconds)
// Scene 2 - Phone Mockup: 30-70 frames (1.3 seconds, with crossfade)
// Scene 3 - Scheduling Screen: 65-100 frames (1.2 seconds)
// Scene 4 - SNF Outcomes: 95-135 frames (1.3 seconds)
// Scene 5 - Feature Cards: 130-175 frames (1.5 seconds)
// Scene 6 - Thank You: 170-210 frames (1.3 seconds)

export const LaborRxTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transitions (crossfade timings)
  const scene1Opacity = interpolate(frame, [0, 5, 32, 38], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene2Opacity = interpolate(frame, [32, 38, 65, 72], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene3Opacity = interpolate(frame, [65, 72, 98, 105], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene4Opacity = interpolate(frame, [98, 105, 135, 142], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene5Opacity = interpolate(frame, [135, 142, 175, 182], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene6Opacity = interpolate(frame, [175, 182, 210, 210], [0, 1, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Warm background throughout */}
      <WarmBackground />

      {/* Scene 1: Logo Reveal */}
      <AbsoluteFill style={{ opacity: scene1Opacity }}>
        <LaborRxLogo />
      </AbsoluteFill>

      {/* Scene 2: Phone Mockup - "Get your shifts together" */}
      <Sequence from={30} durationInFrames={50}>
        <AbsoluteFill style={{ opacity: scene2Opacity }}>
          <PhoneMockupScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Scheduling Screen */}
      <Sequence from={65} durationInFrames={50}>
        <AbsoluteFill style={{ opacity: scene3Opacity }}>
          <SchedulingScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: SNF Outcomes */}
      <Sequence from={98} durationInFrames={50}>
        <AbsoluteFill style={{ opacity: scene4Opacity }}>
          <SNFOutcomesScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Feature Cards */}
      <Sequence from={135} durationInFrames={55}>
        <AbsoluteFill style={{ opacity: scene5Opacity }}>
          <FeatureCardsScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Thank You */}
      <Sequence from={175} durationInFrames={35}>
        <AbsoluteFill style={{ opacity: scene6Opacity }}>
          <ThankYouScene />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
