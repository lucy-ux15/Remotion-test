import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "./Background";

// LaborRx Logo Icon - Cross-shaped overlapping ovals
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {/* Horizontal oval */}
      <div
        style={{
          position: "absolute",
          width: size * 0.875,
          height: size * 0.5,
          left: size * 0.0625,
          top: size * 0.25,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.95,
        }}
      />
      {/* Vertical oval */}
      <div
        style={{
          position: "absolute",
          width: size * 0.5,
          height: size * 0.875,
          left: size * 0.25,
          top: size * 0.0625,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.9,
        }}
      />
      {/* Center intersection (darker) */}
      <div
        style={{
          position: "absolute",
          width: size * 0.375,
          height: size * 0.375,
          left: size * 0.3125,
          top: size * 0.3125,
          borderRadius: "50%",
          background: COLORS.accent,
          opacity: 0.75,
        }}
      />
    </div>
  );
};

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Material reveal: blur sharpens, scale grows, opacity fades in, slight upward motion
  // Duration: ~1.5s = 45 frames

  // Opacity: 0 → 1 with ease-out
  const opacity = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Scale: 95% → 100% with ease-out
  const scale = interpolate(frame, [0, 40], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // TranslateY: +8px → 0 with ease-out
  const translateY = interpolate(frame, [0, 35], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Blur: 4px → 0 (material reveal sharpening)
  const blur = interpolate(frame, [0, 30], [4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        filter: `blur(${blur}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <LaborRxIcon size={90} />
        <h1
          style={{
            fontSize: 68,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            color: COLORS.secondary,
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          LaborRx
        </h1>
      </div>
    </AbsoluteFill>
  );
};
