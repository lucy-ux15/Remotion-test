import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./LaborRxBackground";

export const LaborRxCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Title animation
  const titleY = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
    },
  });

  // Button animation
  const buttonScale = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 10,
      stiffness: 120,
    },
  });

  // Button pulse
  const pulseScale = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [1, 1.04]
  );

  // Subtext animation
  const subtextOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.coral}15 0%, transparent 60%)`,
          transform: `scale(${1 + Math.sin(frame / 50) * 0.1})`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            transform: `scale(${logoScale})`,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 140 140" fill="none">
            <ellipse
              cx="70"
              cy="70"
              rx="32"
              ry="55"
              fill={COLORS.coral}
              opacity="0.9"
            />
            <ellipse
              cx="70"
              cy="70"
              rx="55"
              ry="32"
              fill={COLORS.coral}
              opacity="0.9"
            />
            <ellipse
              cx="70"
              cy="70"
              rx="28"
              ry="28"
              fill={COLORS.coralDark}
              opacity="0.7"
            />
          </svg>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              color: COLORS.black,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Labor<span style={{ fontWeight: 400 }}>Rx</span>
          </h1>
        </div>

        {/* Main headline */}
        <div
          style={{
            transform: `translateY(${(1 - titleY) * 40}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 64,
              fontWeight: 500,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: COLORS.black,
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Ready to get your
            <br />
            shifts together?
          </h2>
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${Math.max(0, buttonScale) * pulseScale})`,
          }}
        >
          <div
            style={{
              padding: "24px 56px",
              borderRadius: 32,
              background: COLORS.coral,
              boxShadow: `0 12px 40px ${COLORS.coral}50`,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "'Inter', system-ui, sans-serif",
                color: COLORS.white,
              }}
            >
              Book your Free Demo
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
          }}
        >
          <p
            style={{
              fontSize: 18,
              fontWeight: 400,
              fontFamily: "'Inter', system-ui, sans-serif",
              color: "#888888",
              margin: 0,
            }}
          >
            Zero commitment | Setup in minutes
          </p>
        </div>

        {/* Trust indicators */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 20,
            opacity: subtextOpacity,
          }}
        >
          {[
            { value: "500+", label: "SNFs Trust Us" },
            { value: "98%", label: "Shift Fill Rate" },
            { value: "4.7", label: "Google Rating" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  color: COLORS.black,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                  color: "#888",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
