import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import type { Feature } from "../compositions/ProductDemo";

interface FeatureHighlightProps {
  feature: Feature;
  index: number;
}

const icons = {
  calendar: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
  chart: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
      <path d="M3 20h18" />
    </svg>
  ),
  budget: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5 1.5 2.5 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5" />
    </svg>
  ),
  zap: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const gradients = [
  "linear-gradient(135deg, #E8705B 0%, #D69382 100%)",
  "linear-gradient(135deg, #4A9B7F 0%, #6BB89D 100%)",
  "linear-gradient(135deg, #E8705B 0%, #C45D4A 100%)",
];

const glowColors = [
  "rgba(232, 112, 91, 0.35)",
  "rgba(74, 155, 127, 0.35)",
  "rgba(232, 112, 91, 0.35)",
];

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ feature, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

  // Icon animation
  const iconScale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Card slide in from side
  const slideDirection = index % 2 === 0 ? 1 : -1;
  const cardX = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 1,
    },
  });

  // Title animation
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Description animation
  const descOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descY = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Decorative elements animation
  const decorScale = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 8,
      stiffness: 60,
      mass: 0.8,
    },
  });

  // Number indicator
  const numberScale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 10,
      stiffness: 120,
    },
  });

  const iconKey = feature.icon as keyof typeof icons;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Feature number indicator */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          transform: `scale(${numberScale})`,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "rgba(74, 74, 74, 0.4)",
            letterSpacing: "4px",
          }}
        >
          FEATURE {index + 1} OF 3
        </span>
      </div>

      {/* Main content card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `translateX(${(1 - cardX) * 200 * slideDirection}px)`,
          maxWidth: 900,
          padding: 60,
        }}
      >
        {/* Icon container */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: gradients[index],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${iconScale})`,
            boxShadow: `0 20px 60px ${glowColors[index]}, 0 8px 20px rgba(0, 0, 0, 0.1)`,
            color: "white",
          }}
        >
          {icons[iconKey] || icons.zap}
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleY) * 40}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1A1A1A",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            {feature.title}
          </h2>
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${(1 - descY) * 30}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#4A4A4A",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            {feature.description}
          </p>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            background: gradients[index],
            transform: `scaleX(${decorScale})`,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Decorative corner element */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 100,
          width: 150,
          height: 150,
          border: `2px solid ${glowColors[index].replace("0.35", "0.2")}`,
          borderRadius: 20,
          transform: `scale(${decorScale}) rotate(${frame * 0.1}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
