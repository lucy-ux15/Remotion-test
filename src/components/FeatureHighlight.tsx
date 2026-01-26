import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import type { Feature } from "../compositions/ProductDemo";

interface FeatureHighlightProps {
  feature: Feature;
  index: number;
}

const icons = {
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
  chart: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="12" cy="2" r="2" />
      <circle cx="6" cy="12" r="2" />
    </svg>
  ),
};

const gradients = [
  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
];

const glowColors = [
  "rgba(99, 102, 241, 0.4)",
  "rgba(16, 185, 129, 0.4)",
  "rgba(245, 158, 11, 0.4)",
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
            color: "rgba(255, 255, 255, 0.3)",
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
            boxShadow: `0 20px 60px ${glowColors[index]}, 0 8px 20px rgba(0, 0, 0, 0.3)`,
            color: "white",
          }}
        >
          {icons[feature.icon]}
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
              color: "white",
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
              color: "rgba(255, 255, 255, 0.7)",
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

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 100,
          width: 200,
          height: 200,
          border: `2px solid ${glowColors[index].replace("0.4", "0.2")}`,
          borderRadius: 20,
          transform: `scale(${decorScale}) rotate(${frame * 0.2}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
