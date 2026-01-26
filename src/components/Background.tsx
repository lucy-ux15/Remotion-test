import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

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
          ${135 + gradientPosition * 0.2}deg,
          #f8fafc 0%,
          #e0f2fe 25%,
          #f1f5f9 50%,
          #dbeafe 75%,
          #f8fafc 100%
        )`,
      }}
    >
      {/* Animated gradient orbs - blue tones */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 60) * 50}px, ${Math.cos(frame / 80) * 30}px)`,
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
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)",
          transform: `translate(${Math.cos(frame / 70) * 40}px, ${Math.sin(frame / 90) * 25}px)`,
          filter: "blur(50px)",
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
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 50) * 30}px, ${Math.cos(frame / 60) * 40}px)`,
          filter: "blur(45px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)",
          transform: `translate(${Math.cos(frame / 55) * 35}px, ${Math.sin(frame / 65) * 30}px)`,
          filter: "blur(55px)",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
