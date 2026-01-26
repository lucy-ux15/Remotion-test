import React from "react";
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
          #E8E2D9 0%,
          #EAE5DB 25%,
          #F5F0E8 50%,
          #E8E2D9 75%,
          #DDD7CE 100%
        )`,
      }}
    >
      {/* Animated gradient orbs - coral/orange tones */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232, 112, 91, 0.15) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 60) * 50}px, ${Math.cos(frame / 80) * 30}px)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214, 147, 130, 0.12) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(232, 112, 91, 0.08) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 50) * 30}px, ${Math.cos(frame / 60) * 40}px)`,
          filter: "blur(45px)",
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(232, 112, 91, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(214, 147, 130, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </AbsoluteFill>
  );
};
