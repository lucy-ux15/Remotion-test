import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS } from "./Background";

interface PhoneMockupProps {
  children: React.ReactNode;
  slideFrom?: "right" | "bottom";
  delay?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  slideFrom = "right",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for slide-in with low damping for smooth motion
  const slideProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      stiffness: 80,
      mass: 1,
    },
  });

  // Calculate transform based on slide direction
  const translateX = slideFrom === "right" ? interpolate(slideProgress, [0, 1], [400, 0]) : 0;
  const translateY = slideFrom === "bottom" ? interpolate(slideProgress, [0, 1], [300, 0]) : 0;

  // Opacity fade in
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
        opacity,
      }}
    >
      {/* Phone Frame */}
      <div
        style={{
          width: 380,
          height: 780,
          backgroundColor: "#1a1a1a",
          borderRadius: 50,
          padding: 12,
          boxShadow: `
            0 50px 100px rgba(0, 0, 0, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 0 0 2px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.white,
            borderRadius: 40,
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
              width: 150,
              height: 35,
              backgroundColor: "#1a1a1a",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
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

// Floating UI Card component
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

  // Staggered fade-in with translate up
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const yOffset = interpolate(translateY, [0, 1], [20, 0]);

  // Subtle floating animation after appearing
  const floatOffset = frame > delay + 20
    ? Math.sin((frame - delay - 20) / 30) * 3
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity,
        transform: `translateY(${yOffset + floatOffset}px)`,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: "12px 16px",
        boxShadow: `
          0 10px 40px rgba(0, 0, 0, 0.08),
          0 4px 12px rgba(0, 0, 0, 0.04)
        `,
      }}
    >
      {children}
    </div>
  );
};
