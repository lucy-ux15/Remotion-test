import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";

const { fontFamily: loraFamily } = loadLora();

export const ThankYou: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const opacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Scale spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
    from: 0.95,
    to: 1,
  });

  // Subtle floating animation
  const float = Math.sin(frame / 40) * 2;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #ede0cc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${float}px)`,
        }}
      >
        <span
          style={{
            fontFamily: loraFamily,
            fontSize: 96,
            fontWeight: 400,
            color: "#6b6155",
          }}
        >
          Thank you.
        </span>
      </div>
    </AbsoluteFill>
  );
};
