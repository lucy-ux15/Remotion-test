import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface LogoProps {
  companyName: string;
  tagline: string;
}

export const Logo: React.FC<LogoProps> = ({ companyName, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const logoRotation = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 1,
    },
  });

  // Company name animation (starts after logo)
  const nameOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameY = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Tagline animation (starts after company name)
  const taglineOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Fade out at the end
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 32,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${logoScale}) rotate(${(1 - logoRotation) * -180}deg)`,
            boxShadow: "0 25px 80px rgba(99, 102, 241, 0.4), 0 10px 30px rgba(139, 92, 246, 0.3)",
          }}
        >
          {/* Abstract logo shape */}
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <path
              d="M35 5L55 20V50L35 65L15 50V20L35 5Z"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M35 20L45 27V43L35 50L25 43V27L35 20Z"
              fill="white"
              opacity="0.9"
            />
            <circle cx="35" cy="35" r="6" fill="white" />
          </svg>
        </div>

        {/* Company Name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${(1 - nameY) * 30}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 82,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "white",
              margin: 0,
              letterSpacing: "-2px",
              textShadow: "0 4px 30px rgba(99, 102, 241, 0.3)",
            }}
          >
            {companyName}
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineY) * 20}px)`,
          }}
        >
          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
