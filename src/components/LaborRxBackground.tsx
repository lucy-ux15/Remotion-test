import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// LaborRx Brand Colors
export const COLORS = {
  coral: "#E07B5F",
  coralLight: "#E8947D",
  coralDark: "#C96A50",
  cream: "#F5F1ED",
  beige: "#E8E4DE",
  tan: "#D5C9A5",
  black: "#1A1A1A",
  green: "#22C55E",
  red: "#EF4444",
  orange: "#F97316",
  white: "#FFFFFF",
};

export const LaborRxBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle animation for visual interest
  const gradientShift = interpolate(frame, [0, 900], [0, 30], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          ${160 + gradientShift * 0.1}deg,
          ${COLORS.cream} 0%,
          ${COLORS.beige} 50%,
          ${COLORS.cream} 100%
        )`,
      }}
    >
      {/* Subtle decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.coral}15 0%, transparent 60%)`,
          transform: `translate(${Math.sin(frame / 100) * 20}px, ${Math.cos(frame / 120) * 15}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.tan}30 0%, transparent 60%)`,
          transform: `translate(${Math.cos(frame / 90) * 15}px, ${Math.sin(frame / 110) * 20}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.coral}08 0%, transparent 50%)`,
          transform: `translate(${Math.sin(frame / 80) * 25}px, ${Math.cos(frame / 100) * 20}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
