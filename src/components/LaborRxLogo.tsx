import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const LaborRxLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Material reveal effect - starts blurred and scaled down
  const revealProgress = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 80,
      mass: 1,
    },
  });

  // Scale from 95% to 100%
  const scale = interpolate(revealProgress, [0, 1], [0.95, 1]);

  // Blur from 12px to 0px
  const blur = interpolate(revealProgress, [0, 1], [12, 0]);

  // Opacity from 0 to 1
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse after reveal
  const glowIntensity = interpolate(
    Math.sin((frame - 20) * 0.1),
    [-1, 1],
    [0.3, 0.5],
  );

  // Logo icon rotation for organic feel
  const iconRotation = spring({
    frame,
    fps,
    config: {
      damping: 25,
      stiffness: 60,
      mass: 1.2,
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
      >
        {/* LaborRx Logo Icon - Overlapping ellipses forming X shape */}
        <div
          style={{
            position: "relative",
            width: 100,
            height: 100,
            transform: `rotate(${(1 - iconRotation) * 10}deg)`,
          }}
        >
          {/* Main coral/red color */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Horizontal ellipse */}
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="22"
              fill="#E85A4F"
              opacity="0.9"
            />
            {/* Vertical ellipse */}
            <ellipse
              cx="50"
              cy="50"
              rx="22"
              ry="40"
              fill="#E85A4F"
              opacity="0.9"
            />
            {/* Overlapping center - darker */}
            <ellipse
              cx="50"
              cy="50"
              rx="18"
              ry="18"
              fill="#D14B40"
              opacity="0.8"
            />
            {/* Diagonal ellipse 1 */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="18"
              fill="#EF7B6C"
              opacity="0.7"
              transform="rotate(45 50 50)"
            />
            {/* Diagonal ellipse 2 */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="18"
              fill="#EF7B6C"
              opacity="0.7"
              transform="rotate(-45 50 50)"
            />
          </svg>

          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: `radial-gradient(circle, rgba(232, 90, 79, ${glowIntensity}) 0%, transparent 70%)`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
          />
        </div>

        {/* LaborRx Text */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-2px",
            }}
          >
            Labor
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-2px",
            }}
          >
            Rx
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
