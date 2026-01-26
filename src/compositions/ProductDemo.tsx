import { AbsoluteFill, Sequence } from "remotion";
import { LogoReveal } from "../components/LogoReveal";
import { HeroScene, SchedulingScene, OutcomesScene } from "../components/Scenes";
import { Background } from "../components/Background";

export const ProductDemo: React.FC = () => {
  // Timing (7 seconds total at 30fps = 210 frames)
  // Scene 1 - Logo Reveal: 0-1.5s (frames 0-45)
  // Scene 2 - Hero "Get your shifts together": 1.5-3.5s (frames 45-105)
  // Scene 3 - Scheduling Screen: 3.5-5.5s (frames 105-165)
  // Scene 4 - Outcomes "Your SNF": 5.5-7s (frames 165-210)

  const FPS = 30;

  // Scene 1: Logo Reveal (~1.5s)
  const LOGO_START = 0;
  const LOGO_DURATION = Math.floor(FPS * 1.5); // 45 frames

  // Scene 2: Hero Screen (~2s)
  const HERO_START = Math.floor(FPS * 1.3); // slight overlap for crossfade
  const HERO_DURATION = Math.floor(FPS * 2.2); // 66 frames

  // Scene 3: Scheduling Screen (~2s)
  const SCHEDULING_START = Math.floor(FPS * 3.3);
  const SCHEDULING_DURATION = Math.floor(FPS * 2.2); // 66 frames

  // Scene 4: Outcomes Screen (~1.5s) - ends on stable frame
  const OUTCOMES_START = Math.floor(FPS * 5.3);
  const OUTCOMES_DURATION = Math.floor(FPS * 1.7); // 51 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Scene 1: Logo Reveal with material effect */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <LogoReveal />
      </Sequence>

      {/* Scene 2: Hero - "Get your shifts together" */}
      <Sequence from={HERO_START} durationInFrames={HERO_DURATION}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Scheduling Screen */}
      <Sequence from={SCHEDULING_START} durationInFrames={SCHEDULING_DURATION}>
        <SchedulingScene />
      </Sequence>

      {/* Scene 4: Outcomes - "Your SNF, You Choose" */}
      <Sequence from={OUTCOMES_START} durationInFrames={OUTCOMES_DURATION}>
        <OutcomesScene />
      </Sequence>
    </AbsoluteFill>
  );
};
