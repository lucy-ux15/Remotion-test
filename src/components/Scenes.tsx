import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { PhoneMockup, FloatingCard } from "./PhoneMockup";
import { COLORS } from "./Background";

// ============================================
// Scene 2: "Get your shifts together" Hero Screen
// ============================================

// Phone screen content: Hero page
const HeroScreenContent: React.FC = () => {
  const frame = useCurrentFrame();

  const getStaggerOpacity = (delay: number) =>
    interpolate(frame - delay, [0, 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  const getStaggerY = (delay: number) =>
    interpolate(frame - delay, [0, 15], [12, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(180deg, ${COLORS.backgroundWarm} 0%, ${COLORS.backgroundPeach} 100%)`,
        padding: "50px 20px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Main headline */}
      <div
        style={{
          opacity: getStaggerOpacity(15),
          transform: `translateY(${getStaggerY(15)}px)`,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 300,
            color: COLORS.textLight,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Get your
        </h1>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 300,
            color: COLORS.textLight,
            margin: "4px 0 0 0",
            lineHeight: 1.2,
          }}
        >
          shifts together
        </h1>
      </div>

      {/* Subtitle */}
      <p
        style={{
          opacity: getStaggerOpacity(20),
          transform: `translateY(${getStaggerY(20)}px)`,
          fontSize: 11,
          color: COLORS.textMuted,
          textAlign: "center",
          marginTop: 16,
          lineHeight: 1.5,
          maxWidth: 260,
        }}
      >
        Our AI staffing platform helps SNF administrators reduce costs and improve patient care.
      </p>

      {/* CTA Button */}
      <div
        style={{
          opacity: getStaggerOpacity(25),
          transform: `translateY(${getStaggerY(25)}px)`,
          marginTop: 20,
          padding: "12px 24px",
          backgroundColor: COLORS.primary,
          borderRadius: 25,
        }}
      >
        <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 500 }}>
          Book your Free Demo
        </span>
      </div>

      {/* Placeholder for visual */}
      <div
        style={{
          opacity: getStaggerOpacity(30),
          marginTop: 30,
          width: 200,
          height: 200,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${COLORS.backgroundPeach} 0%, ${COLORS.primary}20 100%)`,
        }}
      />
    </div>
  );
};

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides in from bottom
  const phoneSlide = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });

  const phoneY = interpolate(phoneSlide, [0, 1], [250, 0]);
  const phoneOpacity = interpolate(frame, [0, 15], [0, 1], {
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
      <div
        style={{
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
        }}
      >
        <PhoneMockup slideFrom="none">
          <HeroScreenContent />
        </PhoneMockup>
      </div>

      {/* Floating cards appear after phone settles */}
      <FloatingCard delay={25} x={180} y={280} width={180}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: COLORS.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 11, fontWeight: 600 }}>RN</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>Annette Black</div>
            <div style={{ fontSize: 10, color: COLORS.success }}>On time</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={29} x={140} y={400} width={170}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 11, color: COLORS.text }}>1 shift pickup</span>
        </div>
      </FloatingCard>

      <FloatingCard delay={33} x={1540} y={320} width={180}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📅</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.text }}>Oct 18, 2023</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>7AM-3PM</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={37} x={1500} y={450} width={200}>
        <div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4 }}>Unit 3</div>
          <div style={{ display: "flex", gap: 4 }}>
            <span
              style={{
                fontSize: 9,
                padding: "2px 6px",
                backgroundColor: COLORS.primary,
                color: "white",
                borderRadius: 4,
              }}
            >
              RN 1/1
            </span>
            <span
              style={{
                fontSize: 9,
                padding: "2px 6px",
                backgroundColor: COLORS.success,
                color: "white",
                borderRadius: 4,
              }}
            >
              LPN 1/1
            </span>
          </div>
        </div>
      </FloatingCard>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Scheduling Screen
// ============================================

const SchedulingScreenContent: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [0, 20], [0.99, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.backgroundWarm,
        padding: "50px 16px 16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.textLight,
            margin: 0,
            lineHeight: 1.4,
            fontStyle: "italic",
          }}
        >
          Scheduling staff drains energy and time.
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.textLight,
            margin: "8px 0 0 0",
            lineHeight: 1.4,
            fontStyle: "italic",
          }}
        >
          LaborRX offers a smooth, cost-efficient staffing solution.
        </p>
      </div>

      {/* Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: COLORS.backgroundPeach,
            borderRadius: 25,
            padding: 4,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: COLORS.secondary,
              borderRadius: 20,
              color: COLORS.white,
              fontSize: 10,
            }}
          >
            For Facilities
          </div>
          <div
            style={{
              padding: "8px 16px",
              color: COLORS.text,
              fontSize: 10,
            }}
          >
            For Nurses
          </div>
        </div>
      </div>

      {/* Dashboard preview */}
      <div
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>
          Reports
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <StatBox label="Total Call-offs" value="342" />
          <StatBox label="Auto-Approval" value="78.5%" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <StatBox label="Shifts Replaced" value="321" />
          <StatBox label="Unfilled" value="8" />
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div
    style={{
      flex: 1,
      backgroundColor: "#F9F9F9",
      borderRadius: 8,
      padding: 10,
    }}
  >
    <div style={{ fontSize: 8, color: COLORS.textMuted }}>{label}</div>
    <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{value}</div>
  </div>
);

export const SchedulingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phone shifts left slightly
  const offsetX = interpolate(frame, [0, 20], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Crossfade
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ transform: `translateX(${offsetX}px)` }}>
        <PhoneMockup slideFrom="none">
          <SchedulingScreenContent />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: "Your SNF, You Choose the Outcomes"
// ============================================

const OutcomesScreenContent: React.FC = () => {
  const frame = useCurrentFrame();

  const getStaggerOpacity = (delay: number) =>
    interpolate(frame - delay, [0, 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.background,
        padding: "50px 14px 14px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Title */}
      <h2
        style={{
          opacity: getStaggerOpacity(5),
          fontSize: 18,
          fontWeight: 500,
          fontStyle: "italic",
          color: COLORS.text,
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Your SNF. You choose the outcome.
      </h2>

      {/* Comparison cards */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {/* Reactive */}
        <div
          style={{
            opacity: getStaggerOpacity(10),
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: COLORS.text }}>Your SNF Minus LaborRX =</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.error, fontStyle: "italic" }}>
              Reactive
            </div>
          </div>
          {["paying premium prices", "straining budgets", "falling behind"].map((item, i) => (
            <div
              key={i}
              style={{
                opacity: getStaggerOpacity(15 + i * 4),
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
                padding: "6px 8px",
                backgroundColor: "#FFF",
                borderRadius: 8,
                fontSize: 8,
              }}
            >
              <span style={{ color: COLORS.error }}>✕</span>
              <span style={{ color: COLORS.text, fontStyle: "italic" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Proactive */}
        <div
          style={{
            opacity: getStaggerOpacity(12),
            flex: 1,
            backgroundColor: "#F5EFE6",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: COLORS.text }}>Your SNF Plus LaborRX =</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.success, fontStyle: "italic" }}>
              Proactive
            </div>
          </div>
          {["The right staff", "At the right time", "For the right budget"].map((item, i) => (
            <div
              key={i}
              style={{
                opacity: getStaggerOpacity(18 + i * 4),
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
                padding: "6px 8px",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: 8,
                fontSize: 8,
              }}
            >
              <span style={{ color: COLORS.success }}>✓</span>
              <span style={{ color: COLORS.text }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OutcomesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phone glides slightly right
  const offsetX = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Soft fade in
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ transform: `translateX(${offsetX}px)` }}>
        <PhoneMockup slideFrom="none">
          <OutcomesScreenContent />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
