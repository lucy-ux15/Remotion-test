import { AbsoluteFill, Sequence } from "remotion";
import {
  Scene1Logo,
  Scene2HeroText,
  Scene3HeroPhone,
  Scene4ValueProp1,
  Scene5ValueProp2,
  Scene6ValueProp3,
  Scene7ProblemCard,
  Scene8Comparison,
  Scene9Dashboard,
  Scene10ThankYou,
} from "../components/ImageSlideshow";

export const ProductDemo: React.FC = () => {
  // 15-second animation at 60fps = 900 frames total
  // Using ACTUAL PNG screenshot images
  const FPS = 60;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Scene 1: Logo (0-1.5s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Logo />
      </Sequence>

      {/* Scene 2: Hero Text Only (1.5-3s) */}
      <Sequence from={90} durationInFrames={90}>
        <Scene2HeroText />
      </Sequence>

      {/* Scene 3: Hero with Phone (3-5s) */}
      <Sequence from={180} durationInFrames={120}>
        <Scene3HeroPhone />
      </Sequence>

      {/* Scene 4: Value Prop 1 - "smooth" (5-6.5s) */}
      <Sequence from={300} durationInFrames={90}>
        <Scene4ValueProp1 />
      </Sequence>

      {/* Scene 5: Value Prop 2 - "cost-efficient" (6.5-8s) */}
      <Sequence from={390} durationInFrames={90}>
        <Scene5ValueProp2 />
      </Sequence>

      {/* Scene 6: Value Prop 3 - "professional" (8-9.5s) */}
      <Sequence from={480} durationInFrames={90}>
        <Scene6ValueProp3 />
      </Sequence>

      {/* Scene 7: Problem Card - Reactive (9.5-10.5s) */}
      <Sequence from={570} durationInFrames={60}>
        <Scene7ProblemCard />
      </Sequence>

      {/* Scene 8: Comparison Cards (10.5-12s) */}
      <Sequence from={630} durationInFrames={90}>
        <Scene8Comparison />
      </Sequence>

      {/* Scene 9: Dashboard (12-13.5s) */}
      <Sequence from={720} durationInFrames={90}>
        <Scene9Dashboard />
      </Sequence>

      {/* Scene 10: Thank You (13.5-15s) */}
      <Sequence from={810} durationInFrames={90}>
        <Scene10ThankYou />
      </Sequence>
    </AbsoluteFill>
  );
};
