import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./LaborRxBackground";

export const LaborRxLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon animation - appears first
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
      stiffness: 60,
      mass: 1.2,
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
      damping: 14,
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
          flexDirection: "row",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* LaborRx Logo Icon - Cross/Plus shape with overlapping ellipses */}
        <div
          style={{
            width: 140,
            height: 140,
            position: "relative",
            transform: `scale(${logoScale}) rotate(${(1 - logoRotation) * -90}deg)`,
          }}
        >
          {/* Main cross shape made of overlapping rounded shapes */}
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            {/* Vertical ellipse */}
            <ellipse
              cx="70"
              cy="70"
              rx="32"
              ry="55"
              fill={COLORS.coral}
              opacity="0.9"
            />
            {/* Horizontal ellipse */}
            <ellipse
              cx="70"
              cy="70"
              rx="55"
              ry="32"
              fill={COLORS.coral}
              opacity="0.9"
            />
            {/* Center darker overlap */}
            <ellipse
              cx="70"
              cy="70"
              rx="28"
              ry="28"
              fill={COLORS.coralDark}
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Company Name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateX(${(1 - nameX) * 50}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 90,
              fontWeight: 700,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif",
              color: COLORS.black,
              margin: 0,
              letterSpacing: "-2px",
            }}
          >
            Labor<span style={{ fontWeight: 400 }}>Rx</span>
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
