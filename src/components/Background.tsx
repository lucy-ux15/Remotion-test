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
          #0f0f23 0%,
          #1a1a3e 25%,
          #0d0d1f 50%,
          #151530 75%,
          #0f0f23 100%
        )`,
      }}
    >
      {/* Animated gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 60) * 50}px, ${Math.cos(frame / 80) * 30}px)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          transform: `translate(${Math.cos(frame / 70) * 40}px, ${Math.sin(frame / 90) * 25}px)`,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame / 50) * 30}px, ${Math.cos(frame / 60) * 40}px)`,
          filter: "blur(45px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
