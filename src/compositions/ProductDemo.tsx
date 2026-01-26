import { AbsoluteFill, Sequence } from "remotion";
import { Logo, LogoSmall } from "../components/Logo";
import { ProductScreens } from "../components/ProductScreens";
import { Background } from "../components/Background";

export const ProductDemo: React.FC = () => {
  // Timing (10 seconds total at 30fps = 300 frames)
  // Scene 1 - Logo Intro: 0-2.5s (frames 0-75)
  // Scene 2 - Product Screens: 2.5-8.5s (frames 75-255)
  // Scene 3 - Outro: 8.5-10s (frames 255-300)

  const FPS = 30;

  const LOGO_START = 0;
  const LOGO_DURATION = FPS * 3; // 90 frames (3s with fade out)

  const PRODUCT_START = FPS * 2.5; // 75 frames
  const PRODUCT_DURATION = FPS * 7; // 210 frames

  const OUTRO_START = FPS * 8.5; // 255 frames
  const OUTRO_DURATION = FPS * 1.5; // 45 frames

  return (
    <AbsoluteFill>
      <Background />

      {/* Scene 1: Logo Intro */}
      <Sequence from={LOGO_START} durationInFrames={LOGO_DURATION}>
        <Logo fadeOut fadeOutStart={70} />
      </Sequence>

      {/* Scene 2: Product Screens with Phone Mockup */}
      <Sequence from={PRODUCT_START} durationInFrames={PRODUCT_DURATION}>
        <ProductScreens />
      </Sequence>

      {/* Scene 3: Outro - Logo fade back in */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <LogoSmall />
      </Sequence>
    </AbsoluteFill>
  );
};
