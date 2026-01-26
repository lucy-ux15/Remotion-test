import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// LaborRx Brand Colors
export const COLORS = {
  primary: "#E86A4F", // Coral/orange-red
  primaryLight: "#F5A08E", // Light coral
  secondary: "#2D2D2D", // Dark gray/black
  background: "#F5F1EB", // Cream/beige
  backgroundWarm: "#FDF6F0", // Warm off-white
  backgroundPeach: "#FDEEE8", // Soft peach
  accent: "#E85A3F", // Darker coral
  success: "#4CAF50", // Green for checkmarks
  error: "#E53935", // Red for X marks
  text: "#2D2D2D",
  textLight: "#666666",
  textMuted: "#999999",
  white: "#FFFFFF",
  cardShadow: "rgba(232, 106, 79, 0.08)",
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Very subtle gradient shift
  const gradientAngle = interpolate(frame, [0, 360], [135, 140], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          ${gradientAngle}deg,
          ${COLORS.backgroundWarm} 0%,
          ${COLORS.backgroundPeach} 35%,
          ${COLORS.background} 70%,
          ${COLORS.backgroundWarm} 100%
        )`,
      }}
    >
      {/* Soft ambient glow - top left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232, 106, 79, 0.06) 0%, transparent 60%)`,
          filter: "blur(80px)",
          transform: `translate(${Math.sin(frame / 120) * 20}px, ${Math.cos(frame / 150) * 15}px)`,
        }}
      />

      {/* Soft ambient glow - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(245, 160, 142, 0.08) 0%, transparent 55%)`,
          filter: "blur(100px)",
          transform: `translate(${Math.cos(frame / 100) * 15}px, ${Math.sin(frame / 130) * 20}px)`,
        }}
      />

      {/* Center subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(253, 238, 232, 0.5) 0%, transparent 50%)`,
          filter: "blur(60px)",
        }}
      />
    </AbsoluteFill>
  );
};
