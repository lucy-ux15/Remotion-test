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
  // Timing (5 seconds total at 30fps = 150 frames)
  // Scene 1 - Logo Reveal: 0-0.6s
  // Scene 2 - Hero: 0.5-1.3s
  // Scene 3 - Scheduling: 1.2-2.2s
  // Scene 4 - Outcomes: 2.1-3.2s
  // Scene 5 - Features: 3.1-4.2s
  // Scene 6 - Thank You: 4.1-5s

  const FPS = 30;

  // Scene 1: Logo Reveal (~0.6s)
  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 0.7; // 21 frames

  // Scene 2: Hero Screen (~0.8s)
  const HERO_START = FPS * 0.5;
  const HERO_DURATION = FPS * 0.9;

  // Scene 3: Scheduling Screen (~1s)
  const SCHEDULING_START = FPS * 1.2;
  const SCHEDULING_DURATION = FPS * 1;

  // Scene 4: Outcomes Screen (~1.1s)
  const OUTCOMES_START = FPS * 2.1;
  const OUTCOMES_DURATION = FPS * 1.1;

  // Scene 5: Feature Cards (~1.1s)
  const FEATURES_START = FPS * 3.1;
  const FEATURES_DURATION = FPS * 1.1;

  // Scene 6: Thank You (~0.9s)
  const THANKYOU_START = FPS * 4.1;
  const THANKYOU_DURATION = FPS * 0.9;

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
