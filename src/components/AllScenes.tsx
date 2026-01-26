import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { COLORS } from "./Background";

// ============================================
// LaborRx Logo Icon Component
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    <div
      style={{
        position: "absolute",
        width: size * 0.875,
        height: size * 0.5,
        left: size * 0.0625,
        top: size * 0.25,
        borderRadius: "50%",
        background: COLORS.primary,
        opacity: 0.95,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.5,
        height: size * 0.875,
        left: size * 0.25,
        top: size * 0.0625,
        borderRadius: "50%",
        background: COLORS.primary,
        opacity: 0.9,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.375,
        height: size * 0.375,
        left: size * 0.3125,
        top: size * 0.3125,
        borderRadius: "50%",
        background: COLORS.accent,
        opacity: 0.75,
      }}
    />
  </div>
);

// ============================================
// Scene 1: Trendy Logo Reveal
// ============================================
export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth material reveal with trendy timing
  const progress = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 60, mass: 1.2 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  const blur = interpolate(progress, [0, 0.6], [8, 0], { extrapolateRight: "clamp" });
  const translateY = interpolate(progress, [0, 1], [25, 0]);

  // Subtle glow effect
  const glowOpacity = interpolate(frame, [20, 40], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 200,
          background: `radial-gradient(ellipse, ${COLORS.primary}30 0%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: glowOpacity,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        <LaborRxIcon size={100} />
        <h1
          style={{
            fontSize: 76,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: COLORS.secondary,
            margin: 0,
            letterSpacing: "-3px",
          }}
        >
          LaborRx
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 2: Hero "Get your shifts together"
// ============================================
export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slide in
  const phoneProgress = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 70, mass: 1 },
  });
  const phoneY = interpolate(phoneProgress, [0, 1], [350, 0]);
  const phoneOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Staggered elements
  const getStagger = (delay: number) => {
    const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = interpolate(frame - delay, [0, 15], [12, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return { opacity, y };
  };

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Phone mockup */}
      <div
        style={{
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
        }}
      >
        <div
          style={{
            width: 360,
            height: 720,
            backgroundColor: "#1a1a1a",
            borderRadius: 48,
            padding: 12,
            boxShadow: "0 50px 100px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: COLORS.backgroundWarm,
              borderRadius: 38,
              overflow: "hidden",
              padding: "60px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 12,
                width: 130,
                height: 32,
                backgroundColor: "#1a1a1a",
                borderRadius: 16,
              }}
            />

            {/* Content */}
            <div style={{ ...getStagger(20), transform: `translateY(${getStagger(20).y}px)`, textAlign: "center", marginTop: 30 }}>
              <h1 style={{ fontSize: 34, fontWeight: 300, color: COLORS.textLight, margin: 0, lineHeight: 1.15 }}>
                Get your
              </h1>
              <h1 style={{ fontSize: 34, fontWeight: 300, color: COLORS.textLight, margin: 0, lineHeight: 1.15 }}>
                shifts together
              </h1>
            </div>

            <p
              style={{
                ...getStagger(24),
                transform: `translateY(${getStagger(24).y}px)`,
                fontSize: 12,
                color: COLORS.textMuted,
                textAlign: "center",
                marginTop: 16,
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              Our AI staffing platform helps SNF administrators reduce costs and improve patient care.
            </p>

            <div
              style={{
                ...getStagger(28),
                transform: `translateY(${getStagger(28).y}px)`,
                marginTop: 24,
                padding: "14px 28px",
                backgroundColor: COLORS.primary,
                borderRadius: 30,
              }}
            >
              <span style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>Book your Free Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <FloatingCard delay={30} x={160} y={320} width={200}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.primary, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>RN</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Annette Black</div>
            <div style={{ fontSize: 11, color: COLORS.success }}>On time</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={34} x={1520} y={380} width={190}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📅</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>Oct 18, 2023</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>7AM-3PM</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={38} x={1480} y={520} width={210}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>⭐</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Google Rating 4.7</span>
        </div>
      </FloatingCard>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Scheduling Screen (Full Screen)
// ============================================
export const SchedulingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scaleIn = interpolate(frame, [0, 25], [0.97, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const getStagger = (delay: number) => ({
    opacity: interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    y: interpolate(frame - delay, [0, 18], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
        transform: `scale(${scaleIn})`,
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 40, ...getStagger(5) }}>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: COLORS.textLight, margin: 0, fontStyle: "italic", lineHeight: 1.3, maxWidth: 900 }}>
          Scheduling staff drains energy and time.
        </h1>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: COLORS.textLight, margin: "8px 0 0 0", fontStyle: "italic", lineHeight: 1.3 }}>
          LaborRX offers a smooth, cost-efficient staffing solution.
        </h1>
      </div>

      {/* Toggle */}
      <div style={{ ...getStagger(15), transform: `translateY(${getStagger(15).y}px)`, marginBottom: 40 }}>
        <div style={{ display: "flex", backgroundColor: COLORS.backgroundPeach, borderRadius: 30, padding: 5 }}>
          <div style={{ padding: "12px 24px", backgroundColor: COLORS.secondary, borderRadius: 25, color: COLORS.white, fontSize: 14, fontWeight: 500 }}>
            For Facilities
          </div>
          <div style={{ padding: "12px 24px", color: COLORS.text, fontSize: 14, fontWeight: 500 }}>
            For Nurses
          </div>
        </div>
      </div>

      {/* Dashboard Card */}
      <div
        style={{
          ...getStagger(20),
          transform: `translateY(${getStagger(20).y}px)`,
          width: 900,
          backgroundColor: COLORS.white,
          borderRadius: 24,
          padding: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.text, marginBottom: 24 }}>Reports</div>
        <div style={{ display: "flex", gap: 16 }}>
          <StatCard label="Total Call-offs" value="342" change="-12%" isNegative />
          <StatCard label="Auto-Approval Rate" value="78.5%" change="+5.2%" />
          <StatCard label="Shifts Replaced" value="321" change="-18%" isNegative />
          <StatCard label="Unfilled Shifts" value="8" change="+33%" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: Outcomes Comparison
// ============================================
export const OutcomesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const slideX = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const getStagger = (delay: number) => ({
    opacity: interpolate(frame - delay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    y: interpolate(frame - delay, [0, 15], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Title */}
      <h1
        style={{
          ...getStagger(0),
          fontSize: 52,
          fontWeight: 500,
          fontStyle: "italic",
          color: COLORS.text,
          marginBottom: 50,
        }}
      >
        Your SNF. You choose the outcome.
      </h1>

      {/* Comparison Cards */}
      <div style={{ display: "flex", gap: 40 }}>
        {/* Reactive */}
        <div
          style={{
            ...getStagger(10),
            width: 450,
            backgroundColor: "#F5F5F5",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 20, color: COLORS.text }}>Your SNF Minus LaborRX =</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.error, fontStyle: "italic", marginTop: 8 }}>Reactive</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 12 }}>Scrambling to fill shifts leaves you:</div>
          </div>
          {["paying premium agency prices", "straining already tight budgets", "falling behind with compliance", "compromising quality of care"].map((item, i) => (
            <div key={i} style={{ ...getStagger(15 + i * 4), display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "14px 18px", backgroundColor: "#FFF", borderRadius: 12 }}>
              <span style={{ color: COLORS.error, fontSize: 16 }}>✕</span>
              <span style={{ color: COLORS.text, fontStyle: "italic", fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Proactive */}
        <div
          style={{
            ...getStagger(12),
            width: 450,
            backgroundColor: "#F5EFE6",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 20, color: COLORS.text }}>Your SNF Plus LaborRX =</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.success, fontStyle: "italic", marginTop: 8 }}>Proactive</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 12 }}>Analyzing your staff needs means:</div>
          </div>
          {["The right staff", "Are in the right place", "At the right time", "For the right budget"].map((item, i) => (
            <div key={i} style={{ ...getStagger(18 + i * 4), display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "14px 18px", backgroundColor: "rgba(255,255,255,0.7)", borderRadius: 12 }}>
              <span style={{ color: COLORS.success, fontSize: 16 }}>✓</span>
              <span style={{ color: COLORS.text, fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 5: Feature Cards
// ============================================
export const FeatureCardsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const getCardAnim = (index: number) => {
    const delay = index * 6;
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 18, stiffness: 100, mass: 0.8 },
    });
    return {
      opacity: interpolate(progress, [0, 1], [0, 1]),
      scale: interpolate(progress, [0, 1], [0.9, 1]),
      y: interpolate(progress, [0, 1], [30, 0]),
    };
  };

  const features = [
    { icon: "👤", title: "Reduce Labor Costs", color: "#E8F5E9", items: ["Compare costs between per diem and agency", "Adjust staffing based on acuity", "Prevent overtime through tracking"] },
    { icon: "⏰", title: "Maximize Administrative Time", color: "#E3F2FD", items: ["Automate shift posting and tracking", "Communicate efficiently with staff", "View all labor spending in one place"] },
    { icon: "📋", title: "Increase Staffing Efficiency", color: "#FFF3E0", items: ["Predict upcoming shifts", "Automate your shift posting", "Distribute shifts easily and quickly"] },
    { icon: "😊", title: "Increase Staff Satisfaction", color: "#FCE4EC", items: ["Provide mobile app for preferences", "Get rid of mandatory overtime", "Create predictable schedules"] },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeIn }}>
      <h1 style={{ fontSize: 44, fontWeight: 600, color: COLORS.text, marginBottom: 50, textAlign: "center", maxWidth: 800 }}>
        With LaborRX your skilled nursing facility will take a turn for the better
      </h1>

      <div style={{ display: "flex", gap: 24 }}>
        {features.map((feature, i) => {
          const anim = getCardAnim(i);
          return (
            <div
              key={i}
              style={{
                width: 280,
                backgroundColor: feature.color,
                borderRadius: 20,
                padding: 28,
                opacity: anim.opacity,
                transform: `scale(${anim.scale}) translateY(${anim.y}px)`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{feature.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, marginBottom: 16, lineHeight: 1.2 }}>{feature.title}</h3>
              {feature.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                  <span style={{ color: COLORS.success, fontSize: 12, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 6: Thank You
// ============================================
export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.95, 1]);
  const y = interpolate(progress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${y}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 20,
          }}
        >
          Thank you
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <LaborRxIcon size={50} />
          <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.text }}>LaborRx</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Helper Components
// ============================================
const FloatingCard: React.FC<{
  children: React.ReactNode;
  delay: number;
  x: number;
  y: number;
  width: number;
}> = ({ children, delay, x, y, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.7 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [15, 0]);
  const float = Math.sin((frame - delay) / 25) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity,
        transform: `translateY(${translateY + (frame > delay + 20 ? float : 0)}px)`,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: "14px 18px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
};

const StatCard: React.FC<{
  label: string;
  value: string;
  change: string;
  isNegative?: boolean;
}> = ({ label, value, change, isNegative }) => (
  <div style={{ flex: 1, backgroundColor: "#F9F9F9", borderRadius: 16, padding: 20 }}>
    <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.text }}>{value}</div>
    <div style={{ fontSize: 13, color: isNegative ? COLORS.error : COLORS.success, marginTop: 8 }}>
      {change} vs last week
    </div>
  </div>
);
