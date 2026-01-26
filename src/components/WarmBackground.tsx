import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const WarmBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle gradient animation
  const gradientShift = interpolate(frame, [0, 210], [0, 15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          ${145 + gradientShift}deg,
          #F9F5F1 0%,
          #FDF8F4 25%,
          #F5EDE6 50%,
          #FAF6F2 75%,
          #F9F5F1 100%
        )`,
      }}
    >
      {/* Soft warm glow - top left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232, 90, 79, 0.08) 0%, transparent 60%)",
          transform: `translate(${Math.sin(frame / 80) * 20}px, ${Math.cos(frame / 100) * 15}px)`,
          filter: "blur(60px)",
        }}
      />

      {/* Soft peach glow - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 123, 108, 0.06) 0%, transparent 60%)",
          transform: `translate(${Math.cos(frame / 70) * 25}px, ${Math.sin(frame / 90) * 20}px)`,
          filter: "blur(50px)",
        }}
      />

      {/* Very subtle center glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(209, 75, 64, 0.04) 0%, transparent 70%)",
          transform: `translate(-50%, -50%)`,
          filter: "blur(80px)",
        }}
      />
    </AbsoluteFill>
  );
};
