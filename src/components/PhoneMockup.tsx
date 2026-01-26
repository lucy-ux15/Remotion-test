import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS } from "./Background";

interface PhoneMockupProps {
  children: React.ReactNode;
  slideFrom?: "bottom" | "none";
  delay?: number;
  offsetX?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  slideFrom = "bottom",
  delay = 0,
  offsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for slide-in with low damping
  const slideProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 80,
      mass: 1,
    },
  });

  // Calculate transform
  const translateY = slideFrom === "bottom"
    ? interpolate(slideProgress, [0, 1], [250, 0])
    : 0;

  // Opacity fade in
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) translateX(${offsetX}px)`,
        opacity,
      }}
    >
      {/* Phone Frame */}
      <div
        style={{
          width: 340,
          height: 700,
          backgroundColor: "#1a1a1a",
          borderRadius: 45,
          padding: 10,
          boxShadow: `
            0 40px 80px rgba(0, 0, 0, 0.12),
            0 16px 32px rgba(0, 0, 0, 0.08),
            inset 0 0 0 1.5px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.white,
            borderRadius: 36,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 30,
              backgroundColor: "#1a1a1a",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              zIndex: 10,
            }}
          />

          {/* Screen Content */}
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating UI Card component with staggered animation
interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  width?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  delay = 0,
  x = 0,
  y = 0,
  width = 200,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered fade-in with translate up (120ms stagger = ~4 frames)
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      stiffness: 120,
      mass: 0.6,
    },
  });

  const yOffset = interpolate(translateY, [0, 1], [12, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity,
        transform: `translateY(${yOffset}px)`,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        padding: "10px 14px",
        boxShadow: `
          0 8px 30px rgba(0, 0, 0, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04)
        `,
      }}
    >
      {children}
    </div>
  );
};
