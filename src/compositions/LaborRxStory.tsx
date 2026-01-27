import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Easing functions
const easeOut = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const easeIn = (t: number) => {
  return t * t * t;
};

// Scene component for each image
interface SceneProps {
  src: string;
  startFrame: number;
  endFrame: number;
  animation: "logo" | "heroText" | "heroFull" | "valuePropLeft" | "valuePropRight" | "valuePropScale" | "problemCard" | "comparison" | "dashboard" | "thankYou";
}

const Scene: React.FC<SceneProps> = ({ src, startFrame, endFrame, animation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate local frame within this scene
  const localFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  // Don't render if not in range
  if (frame < startFrame || frame >= endFrame) {
    return null;
  }

  let opacity = 1;
  let translateX = 0;
  let translateY = 0;
  let scale = 1;
  let rotate = 0;

  switch (animation) {
    case "logo": {
      // SCENE 1: Logo Intro (0-1.5s / Frames 0-90)
      const fadeInEnd = 15; // 0-0.25s
      const holdEnd = 75; // 0.25-1.25s
      // const fadeOutEnd = 90; // 1.25-1.5s

      if (localFrame < fadeInEnd) {
        // Fade in
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        scale = interpolate(localFrame, [0, fadeInEnd], [0.9, 1], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        // Hold with subtle pulse
        const pulseProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        scale = 1 + 0.02 * Math.sin(pulseProgress * Math.PI * 2);
        opacity = 1;
      } else {
        // Transition out
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        scale = interpolate(exitProgress, [0, 1], [1, 1.1]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "heroText": {
      // SCENE 2: Hero Text Only (1.5-3s / Frames 90-180)
      const fadeInEnd = 18; // 0.3s
      const holdEnd = 72; // 1.2s

      if (localFrame < fadeInEnd) {
        // Fade in
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        translateY = interpolate(localFrame, [0, fadeInEnd], [30, 0], { extrapolateRight: "clamp" });
        scale = interpolate(localFrame, [0, fadeInEnd], [0.95, 1], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        // Hold steady
        opacity = 1;
        translateY = 0;
        scale = 1;
      } else {
        // Begin transition
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateY = interpolate(exitProgress, [0, 1], [0, -20]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0.8]);
      }
      break;
    }

    case "heroFull": {
      // SCENE 3: Hero with Phone (3-5s / Frames 180-300)
      const fadeInEnd = 30; // 0.5s
      const holdEnd = 102; // 1.7s

      if (localFrame < fadeInEnd) {
        // Dynamic entrance with spring
        const springValue = spring({
          frame: localFrame,
          fps,
          config: { damping: 10, stiffness: 100 },
        });
        opacity = springValue;
        translateY = interpolate(springValue, [0, 1], [60, 0]);
        scale = interpolate(springValue, [0, 1], [0.92, 1]);
        rotate = interpolate(springValue, [0, 1], [1, 0]);
      } else if (localFrame < holdEnd) {
        // Hold with life (gentle float)
        const floatProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        translateY = 4 * Math.sin(floatProgress * Math.PI * 2.5);
        scale = 1 + 0.005 * Math.sin(floatProgress * Math.PI * 2);
        opacity = 1;
      } else {
        // Exit
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        scale = interpolate(exitProgress, [0, 1], [1, 0.95]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "valuePropLeft": {
      // SCENE 4: Value Prop 1 (5-6.5s / Frames 300-390) - slides from left
      const fadeInEnd = 18; // 0.3s
      const holdEnd = 72; // 1.2s

      if (localFrame < fadeInEnd) {
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        translateX = interpolate(localFrame, [0, fadeInEnd], [-30, 0], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        opacity = 1;
        translateX = 0;
      } else {
        // Quick transition
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateX = interpolate(exitProgress, [0, 1], [0, 15]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "valuePropRight": {
      // SCENE 5: Value Prop 2 (6.5-8s / Frames 390-480) - slides from right
      const fadeInEnd = 18;
      const holdEnd = 72;

      if (localFrame < fadeInEnd) {
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        translateX = interpolate(localFrame, [0, fadeInEnd], [30, 0], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        opacity = 1;
        translateX = 0;
      } else {
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateX = interpolate(exitProgress, [0, 1], [0, -15]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "valuePropScale": {
      // SCENE 6: Value Prop 3 (8-9.5s / Frames 480-570) - scale entrance
      const fadeInEnd = 18;
      const holdEnd = 72;

      if (localFrame < fadeInEnd) {
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        scale = interpolate(localFrame, [0, fadeInEnd], [0.95, 1], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        opacity = 1;
        scale = 1;
      } else {
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateY = interpolate(exitProgress, [0, 1], [0, -30]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "problemCard": {
      // SCENE 7: Problem Card (9.5-10.5s / Frames 570-630) - bouncy slide from left
      const fadeInEnd = 24; // 0.4s
      const holdEnd = 48; // 0.8s

      if (localFrame < fadeInEnd) {
        const springValue = spring({
          frame: localFrame,
          fps,
          config: { damping: 8, stiffness: 120 },
        });
        opacity = springValue;
        translateX = interpolate(springValue, [0, 1], [-80, 0]);
        rotate = interpolate(springValue, [0, 1], [-4, 0]);
        scale = interpolate(springValue, [0, 1], [0.9, 1]);
      } else if (localFrame < holdEnd) {
        // Micro float
        const floatProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        translateY = 2 * Math.sin(floatProgress * Math.PI * 2);
        opacity = 1;
      } else {
        // Slight move preparation (moves left)
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateX = interpolate(exitProgress, [0, 1], [0, -50]);
        opacity = 1;
      }
      break;
    }

    case "comparison": {
      // SCENE 8: Comparison Cards (10.5-12s / Frames 630-720)
      const fadeInEnd = 30; // 0.5s
      const holdEnd = 72; // 1.2s

      if (localFrame < fadeInEnd) {
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        scale = interpolate(localFrame, [0, fadeInEnd], [0.95, 1], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        // Both cards with gentle float
        const floatProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        translateY = 2 * Math.sin(floatProgress * Math.PI * 3);
        opacity = 1;
      } else {
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        translateY = interpolate(exitProgress, [0, 1], [0, -40]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "dashboard": {
      // SCENE 9: Dashboard Proof (12-13.5s / Frames 720-810) - dramatic entrance
      const fadeInEnd = 30; // 0.5s
      const holdEnd = 72; // 1.2s

      if (localFrame < fadeInEnd) {
        const springValue = spring({
          frame: localFrame,
          fps,
          config: { damping: 10, stiffness: 100 },
        });
        opacity = springValue;
        translateY = interpolate(springValue, [0, 1], [80, 0]);
        scale = interpolate(springValue, [0, 1], [0.9, 1]);
      } else if (localFrame < holdEnd) {
        // Hold with energy
        const pulseProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        scale = 1 + 0.01 * Math.sin(pulseProgress * Math.PI * 4);
        opacity = 1;
      } else {
        // Zoom exit
        const exitProgress = (localFrame - holdEnd) / (duration - holdEnd);
        scale = interpolate(exitProgress, [0, 1], [1, 1.15]);
        opacity = interpolate(exitProgress, [0, 1], [1, 0]);
      }
      break;
    }

    case "thankYou": {
      // SCENE 10: Thank You (13.5-15s / Frames 810-900) - elegant entrance
      const fadeInEnd = 30; // 0.5s
      const holdEnd = 72; // 1.2s

      if (localFrame < fadeInEnd) {
        opacity = interpolate(localFrame, [0, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
        scale = interpolate(localFrame, [0, fadeInEnd], [0.85, 1], { extrapolateRight: "clamp" });
      } else if (localFrame < holdEnd) {
        // Hold with subtle breathe
        const breatheProgress = (localFrame - fadeInEnd) / (holdEnd - fadeInEnd);
        scale = 1 + 0.005 * Math.sin(breatheProgress * Math.PI);
        opacity = 1;
      } else {
        // Final hold with warm glow (stays visible)
        opacity = 1;
        scale = 1;
      }
      break;
    }
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};

export const LaborRxStory: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene definitions (at 60fps)
  const scenes = [
    { src: staticFile("1.png"), startFrame: 0, endFrame: 90, animation: "logo" as const },
    { src: staticFile("2.png"), startFrame: 90, endFrame: 180, animation: "heroText" as const },
    { src: staticFile("3.png"), startFrame: 180, endFrame: 300, animation: "heroFull" as const },
    { src: staticFile("4.png"), startFrame: 300, endFrame: 390, animation: "valuePropLeft" as const },
    { src: staticFile("5.png"), startFrame: 390, endFrame: 480, animation: "valuePropRight" as const },
    { src: staticFile("8.png"), startFrame: 480, endFrame: 570, animation: "valuePropScale" as const },
    { src: staticFile("9.png"), startFrame: 570, endFrame: 630, animation: "problemCard" as const },
    { src: staticFile("10.png"), startFrame: 630, endFrame: 720, animation: "comparison" as const },
    { src: staticFile("11.png"), startFrame: 720, endFrame: 810, animation: "dashboard" as const },
    { src: staticFile("12.png"), startFrame: 810, endFrame: 900, animation: "thankYou" as const },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5F0E8" }}>
      {scenes.map((scene, index) => (
        <Scene
          key={index}
          src={scene.src}
          startFrame={scene.startFrame}
          endFrame={scene.endFrame}
          animation={scene.animation}
        />
      ))}
    </AbsoluteFill>
  );
};
