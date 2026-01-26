import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface LogoProps {
  companyName: string;
  tagline: string;
}

export const Logo: React.FC<LogoProps> = ({ companyName, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon animation - overlapping ellipses
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Individual ellipse animations for staggered reveal
  const ellipse1Opacity = interpolate(frame, [0, 15], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ellipse2Opacity = interpolate(frame, [5, 20], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ellipse1Rotation = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 60,
      mass: 1.2,
    },
  });

  const ellipse2Rotation = spring({
    frame: frame - 5,
    fps,
    config: {
      damping: 15,
      stiffness: 60,
      mass: 1.2,
    },
  });

  // Company name animation (starts after logo)
  const nameOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameY = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Tagline animation (starts after company name)
  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = spring({
    frame: frame - 50,
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
        {/* LaborRx Logo Icon - Overlapping Ellipses */}
        <div
          style={{
            width: 160,
            height: 160,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${logoScale})`,
          }}
        >
          {/* First ellipse (horizontal) */}
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 80,
              borderRadius: "50%",
              background: "#E8705B",
              opacity: ellipse1Opacity,
              transform: `rotate(${(1 - ellipse1Rotation) * -45}deg)`,
              mixBlendMode: "multiply",
            }}
          />
          {/* Second ellipse (vertical) */}
          <div
            style={{
              position: "absolute",
              width: 80,
              height: 120,
              borderRadius: "50%",
              background: "#E8705B",
              opacity: ellipse2Opacity,
              transform: `rotate(${(1 - ellipse2Rotation) * 45}deg)`,
              mixBlendMode: "multiply",
            }}
          />
          {/* Center overlap highlight */}
          <div
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(180, 70, 50, 0.3)",
              opacity: Math.min(ellipse1Opacity, ellipse2Opacity),
            }}
          />
        </div>

        {/* Company Name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${(1 - nameY) * 30}px)`,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <h1
            style={{
              fontSize: 90,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-2px",
            }}
          >
            Labor
          </h1>
          <h1
            style={{
              fontSize: 90,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-2px",
            }}
          >
            R
          </h1>
          <h1
            style={{
              fontSize: 90,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-2px",
              fontStyle: "normal",
            }}
          >
            x
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
              fontSize: 36,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#4A4A4A",
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
