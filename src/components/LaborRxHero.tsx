import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./LaborRxBackground";

export const LaborRxHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline animation
  const headlineY = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
    },
  });

  // Subheadline animation
  const subheadlineOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subheadlineY = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
    },
  });

  // CTA button animation
  const buttonScale = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 10,
      stiffness: 120,
    },
  });

  // UI elements animation
  const uiElementsOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

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
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          maxWidth: 1200,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            transform: `translateY(${(1 - headlineY) * 50}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 92,
              fontWeight: 600,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: COLORS.black,
              margin: 0,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Get your
            <br />
            shifts together
          </h1>
        </div>

        {/* Subheadline */}
        <div
          style={{
            opacity: subheadlineOpacity,
            transform: `translateY(${(1 - subheadlineY) * 30}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              color: "#666666",
              margin: 0,
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Our AI staffing platform helps SNF administrators reduce costs
            and improve patient care.
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 20,
            transform: `scale(${Math.max(0, buttonScale)})`,
          }}
        >
          <div
            style={{
              padding: "20px 48px",
              borderRadius: 30,
              background: COLORS.coral,
              boxShadow: `0 8px 30px ${COLORS.coral}50`,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                color: COLORS.white,
              }}
            >
              Book your Free Demo
            </span>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#888888",
              textAlign: "center",
              marginTop: 12,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            Zero commitment
          </p>
        </div>

        {/* Floating UI cards */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "50%",
            opacity: uiElementsOpacity,
            transform: `translateY(${Math.sin(frame / 30) * 8}px)`,
          }}
        >
          {/* Nurse status card */}
          <div
            style={{
              background: COLORS.white,
              borderRadius: 16,
              padding: "16px 24px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontSize: 14, color: "#888", margin: 0, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>RN</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E8E4DE" }} />
              <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black, fontFamily: "'Inter', sans-serif" }}>Annette Black</span>
              <span style={{ padding: "4px 12px", borderRadius: 12, background: "#E8F5E9", color: COLORS.green, fontSize: 13, fontWeight: 500 }}>On time</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E8E4DE" }} />
              <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black, fontFamily: "'Inter', sans-serif" }}>Kathryn Murphy</span>
              <span style={{ padding: "4px 12px", borderRadius: 12, background: "#FEF3E8", color: COLORS.orange, fontSize: 13, fontWeight: 500 }}>Late arrival</span>
            </div>
          </div>
        </div>

        {/* Right side UI card - Schedule picker */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "35%",
            opacity: uiElementsOpacity,
            transform: `translateY(${Math.cos(frame / 35) * 10}px)`,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              borderRadius: 16,
              padding: "16px 24px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 14, color: "#888", fontFamily: "'Inter', sans-serif" }}>Oct 18, 2023</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 14, color: "#888", fontFamily: "'Inter', sans-serif" }}>7AM-3PM</span>
            </div>
          </div>
        </div>

        {/* Google rating badge */}
        <div
          style={{
            position: "absolute",
            right: 150,
            bottom: "25%",
            opacity: uiElementsOpacity,
            transform: `translateY(${Math.sin(frame / 40) * 6}px)`,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              borderRadius: 24,
              padding: "10px 20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: "#4285F4", fontFamily: "'Inter', sans-serif" }}>Google</span>
            <span style={{ fontSize: 14, color: "#666", fontFamily: "'Inter', sans-serif" }}>Rating 4.7</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
