import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoScene,
  HeroScene,
  ComparisonScene,
  ReportsScene,
  FeatureCardsScene,
} from "../components/AllScenes";

export const ProductDemo: React.FC = () => {
  const FPS = 60;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={FPS * 2}>
        <LogoScene />
      </Sequence>

      <Sequence from={FPS * 2} durationInFrames={FPS * 2.5}>
        <HeroScene />
      </Sequence>

      <Sequence from={FPS * 4.5} durationInFrames={FPS * 2}>
        <ComparisonScene />
      </Sequence>

      <Sequence from={FPS * 6.5} durationInFrames={FPS * 2}>
        <ReportsScene />
      </Sequence>

      <Sequence from={FPS * 8.5} durationInFrames={FPS * 6.5}>
        <FeatureCardsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
