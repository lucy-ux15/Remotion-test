import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoRevealScene,
  HeroScene,
  SchedulingScene,
  OutcomesScene,
  FeatureCardsScene,
  ThankYouScene,
} from "../components/AllScenes";
import { Background } from "../components/Background";

export const ProductDemo: React.FC = () => {
  // Timing (18 seconds total at 30fps = 540 frames)
  // Scene 1 - Logo Reveal: 0-2s
  // Scene 2 - Hero "Get your shifts together": 2-5s
  // Scene 3 - Scheduling Screen: 5-8.5s
  // Scene 4 - Outcomes "Your SNF": 8.5-12s
  // Scene 5 - Feature Cards: 12-16s
  // Scene 6 - Thank You: 16-18s

  const FPS = 30;

  // Scene 1: Logo Reveal (~2s)
  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 2; // 60 frames

  // Scene 2: Hero Screen (~3s)
  const HERO_START = Math.floor(FPS * 1.8); // slight overlap
  const HERO_DURATION = FPS * 3.2; // 96 frames

  // Scene 3: Scheduling Screen (~3.5s)
  const SCHEDULING_START = FPS * 5;
  const SCHEDULING_DURATION = FPS * 3.5; // 105 frames

  // Scene 4: Outcomes Screen (~3.5s)
  const OUTCOMES_START = FPS * 8.5;
  const OUTCOMES_DURATION = FPS * 3.5; // 105 frames

  // Scene 5: Feature Cards (~4s)
  const FEATURES_START = FPS * 12;
  const FEATURES_DURATION = FPS * 4; // 120 frames

  // Scene 6: Thank You (~2s)
  const THANKYOU_START = FPS * 16;
  const THANKYOU_DURATION = FPS * 2; // 60 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Scene 1: Trendy Logo Reveal */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <LogoRevealScene />
      </Sequence>

      {/* Scene 2: Hero - "Get your shifts together" */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Scheduling Screen (Full Screen) */}
      <Sequence from={SCHEDULING_START} durationInFrames={SCHEDULING_DURATION}>
        <SchedulingScene />
      </Sequence>

      {/* Scene 4: Outcomes - "Your SNF, You Choose" */}
      <Sequence from={OUTCOMES_START} durationInFrames={OUTCOMES_DURATION}>
        <OutcomesScene />
      </Sequence>

      {/* Scene 5: Feature Cards */}
      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeatureCardsScene />
      </Sequence>

      {/* Scene 6: Thank You */}
      <Sequence from={THANKYOU_START} durationInFrames={THANKYOU_DURATION}>
        <ThankYouScene />
      </Sequence>
    </AbsoluteFill>
  );
};
