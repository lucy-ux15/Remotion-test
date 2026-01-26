import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./Background";

interface LogoProps {
  companyName: string;
  tagline: string;
}

// LaborRx Logo Icon - Cross-shaped overlapping ovals
const LaborRxIcon: React.FC<{ scale: number; rotation: number }> = ({ scale, rotation }) => {
  return (
    <div
      style={{
        width: 160,
        height: 160,
        position: "relative",
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      {/* Horizontal oval */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 80,
          left: 10,
          top: 40,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.9,
        }}
      />
      {/* Vertical oval */}
      <div
        style={{
          position: "absolute",
          width: 80,
          height: 140,
          left: 40,
          top: 10,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.85,
        }}
      />
      {/* Center intersection (darker) */}
      <div
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          left: 50,
          top: 50,
          borderRadius: "50%",
          background: COLORS.accent,
          opacity: 0.7,
        }}
      />
    </div>
  );
};

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
  const nameOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameX = spring({
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
          gap: 40,
        }}
      >
        {/* Logo with company name in horizontal layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          {/* Logo Icon */}
          <LaborRxIcon
            scale={logoScale}
            rotation={(1 - logoRotation) * -180}
          />

          {/* Company Name */}
          <div
            style={{
              opacity: nameOpacity,
              transform: `translateX(${(1 - nameX) * 50}px)`,
            }}
          >
            <h1
              style={{
                fontSize: 96,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: COLORS.secondary,
                margin: 0,
                letterSpacing: "-3px",
              }}
            >
              Labor<span style={{ fontWeight: 700 }}>Rx</span>
            </h1>
          </div>
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
              color: COLORS.textLight,
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
