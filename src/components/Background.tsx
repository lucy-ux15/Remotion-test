import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// LaborRx Brand Colors
export const COLORS = {
  primary: "#E86A4F", // Coral/orange-red
  secondary: "#2D2D2D", // Dark gray/black
  background: "#F5F1EB", // Cream/beige
  backgroundDark: "#EDE8E0",
  accent: "#E85A3F", // Darker coral
  success: "#4CAF50", // Green for checkmarks
  error: "#E53935", // Red for X marks
  text: "#2D2D2D",
  textLight: "#666666",
  white: "#FFFFFF",
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle gradient animation
  const gradientPosition = interpolate(frame, [0, 900], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          ${135 + gradientPosition * 0.15}deg,
          ${COLORS.background} 0%,
          ${COLORS.backgroundDark} 40%,
          ${COLORS.background} 70%,
          #F8F4EE 100%
        )`,
      }}
    >
      {/* Animated gradient orbs with brand colors */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232, 106, 79, 0.08) 0%, transparent 70%)`,
          transform: `translate(${Math.sin(frame / 80) * 40}px, ${Math.cos(frame / 100) * 30}px)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232, 106, 79, 0.06) 0%, transparent 70%)`,
          transform: `translate(${Math.cos(frame / 90) * 35}px, ${Math.sin(frame / 110) * 25}px)`,
          filter: "blur(70px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "25%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(45, 45, 45, 0.03) 0%, transparent 70%)`,
          transform: `translate(${Math.sin(frame / 70) * 25}px, ${Math.cos(frame / 80) * 35}px)`,
          filter: "blur(50px)",
        }}
      />

      {/* Subtle dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${COLORS.secondary}10 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
