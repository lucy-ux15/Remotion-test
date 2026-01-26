import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text animation with elegant reveal
  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textScale = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 60,
      mass: 1,
    },
  });

  const textY = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 80,
      mass: 0.8,
    },
  });

  // Logo fade in after text
  const logoOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 12,
    fps,
    config: {
      damping: 20,
      stiffness: 80,
    },
  });

  // Decorative elements
  const decorOpacity = interpolate(frame, [20, 35], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(232, 90, 79, 0.15)",
          opacity: decorOpacity,
          transform: `scale(${0.8 + Math.sin(frame * 0.03) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 550,
          height: 550,
          borderRadius: "50%",
          border: "1px solid rgba(232, 90, 79, 0.1)",
          opacity: decorOpacity,
          transform: `scale(${0.9 + Math.cos(frame * 0.025) * 0.08})`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Thank You text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textY) * 30}px) scale(${0.95 + textScale * 0.05})`,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 300,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              color: "#1a1a1a",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-2px",
            }}
          >
            Thank you
          </h1>
        </div>

        {/* LaborRx Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: logoOpacity,
            transform: `scale(${0.9 + logoScale * 0.1})`,
          }}
        >
          {/* Logo Icon */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="22"
              fill="#E85A4F"
              opacity="0.9"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="22"
              ry="40"
              fill="#E85A4F"
              opacity="0.9"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="18"
              ry="18"
              fill="#D14B40"
              opacity="0.8"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="18"
              fill="#EF7B6C"
              opacity="0.7"
              transform="rotate(45 50 50)"
            />
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

          {/* Logo Text */}
          <span
            style={{
              fontSize: 42,
              fontWeight: 700,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-1px",
            }}
          >
            LaborRx
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: logoOpacity,
          }}
        >
          <p
            style={{
              fontSize: 20,
              fontWeight: 400,
              fontFamily: "system-ui, sans-serif",
              color: "#888",
              margin: 0,
            }}
          >
            Get your shifts together
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
