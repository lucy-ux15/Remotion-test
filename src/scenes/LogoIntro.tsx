import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: interFamily } = loadInter();

export const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale: 80% -> 100% with spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
    from: 0.8,
    to: 1,
  });

  // Opacity: fade in, hold, fade out at end
  const opacity = interpolate(frame, [0, 20, 140, 180], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Glow pulse on the logo symbol
  const glowIntensity = interpolate(frame, [0, 30, 70], [0, 0.8, 0], {
    extrapolateRight: "clamp",
  });

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
          display: "flex",
          alignItems: "center",
          gap: 28,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* Logo symbol - two overlapping ellipses forming an X/star */}
        <div
          style={{
            position: "relative",
            width: 90,
            height: 90,
            filter: `drop-shadow(0 0 ${24 * glowIntensity}px rgba(255, 100, 60, ${glowIntensity * 0.7}))`,
          }}
        >
          {/* Ellipse 1 - rotated 45deg (salmon/coral) */}
          <div
            style={{
              position: "absolute",
              width: 78,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255, 125, 85, 0.78)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
          />
          {/* Ellipse 2 - rotated -45deg (darker coral/red) */}
          <div
            style={{
              position: "absolute",
              width: 78,
              height: 44,
              borderRadius: "50%",
              background: "rgba(228, 68, 48, 0.78)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-45deg)",
            }}
          />
        </div>

        {/* Logo text */}
        <span
          style={{
            fontFamily: interFamily,
            fontSize: 72,
            fontWeight: 800,
            color: "#1a1a1a",
            letterSpacing: -1.5,
          }}
        >
          LaborRx
        </span>
      </div>
    </AbsoluteFill>
  );
};
