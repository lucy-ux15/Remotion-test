import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { COLORS } from "./Background";

// Custom easing for smooth transitions
const smoothEase = Easing.bezier(0.16, 1, 0.3, 1);

// ============================================
// LaborRx Logo Icon (exact match to screenshot)
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    <div
      style={{
        position: "absolute",
        width: size * 0.95,
        height: size * 0.55,
        left: size * 0.025,
        top: size * 0.225,
        borderRadius: "50%",
        background: "#E8705A",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.55,
        height: size * 0.95,
        left: size * 0.225,
        top: size * 0.025,
        borderRadius: "50%",
        background: "#E8705A",
        opacity: 0.85,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.42,
        height: size * 0.42,
        left: size * 0.29,
        top: size * 0.29,
        borderRadius: "50%",
        background: "#D85A45",
        opacity: 0.7,
      }}
    />
  </div>
);

// ============================================
// Scene 1: Logo (0-0.8s = frames 0-24)
// ============================================
export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scale from 0.95 to 1.0 with soft fade
  const scale = interpolate(frame, [0, 20], [0.95, 1], {
    extrapolateRight: "clamp",
    easing: smoothEase,
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    easing: smoothEase,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F1EB",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <LaborRxIcon size={110} />
        <h1
          style={{
            fontSize: 82,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#1a1a1a",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          LaborRx
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 2: Hero "Get your shifts together" (0.8-1.5s = frames 24-45)
// ============================================
export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe from right to left
  const wipeProgress = interpolate(frame, [0, 15], [100, 0], {
    extrapolateRight: "clamp",
    easing: smoothEase,
  });

  // Word by word fade with upward drift
  const words = ["Get", "your", "shifts", "together"];
  const getWordAnim = (index: number) => {
    const delay = 8 + index * 3;
    return {
      opacity: interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      y: interpolate(frame, [delay, delay + 8], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase }),
    };
  };

  // Phone scale and rotation
  const phoneScale = interpolate(frame, [5, 20], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase });
  const phoneRotation = interpolate(frame, [5, 20], [2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase });
  const phoneOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.backgroundWarm }}>
      {/* Wipe mask */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: `${wipeProgress}%`,
          backgroundColor: "#F5F1EB",
          zIndex: 100,
        }}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
          <LaborRxIcon size={40} />
          <span style={{ fontSize: 24, fontWeight: 600, color: "#1a1a1a" }}>LaborRx</span>
        </div>

        {/* Headline - word by word */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {words.slice(0, 2).map((word, i) => {
              const anim = getWordAnim(i);
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 72,
                    fontWeight: 300,
                    color: "#8B8B8B",
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {words.slice(2).map((word, i) => {
              const anim = getWordAnim(i + 2);
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 72,
                    fontWeight: 300,
                    color: "#8B8B8B",
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: 20, color: "#666", textAlign: "center", maxWidth: 500, marginBottom: 30, opacity: interpolate(frame, [15, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Our AI staffing platform helps SNF administrators reduce costs and improve patient care.
        </p>

        {/* CTA Button */}
        <div
          style={{
            padding: "16px 32px",
            backgroundColor: COLORS.primary,
            borderRadius: 30,
            opacity: interpolate(frame, [18, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>Book your Free Demo</span>
        </div>

        {/* Phone mockup */}
        <div
          style={{
            marginTop: 40,
            opacity: phoneOpacity,
            transform: `scale(${phoneScale}) rotate(${phoneRotation}deg)`,
          }}
        >
          <div
            style={{
              width: 280,
              height: 500,
              backgroundColor: "#1a1a1a",
              borderRadius: 40,
              padding: 8,
              boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ width: "100%", height: "100%", backgroundColor: "#FDF8F5", borderRadius: 34, overflow: "hidden" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Comparison "Your SNF" (1.5-3s = frames 45-90)
// ============================================
export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slide transition
  const slideIn = interpolate(frame, [0, 12], [100, 0], { extrapolateRight: "clamp", easing: smoothEase });

  // Title fade
  const titleOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Left card slides from left
  const leftCardX = interpolate(frame, [10, 25], [-50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase });
  const leftCardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Right card slides from right (0.2s delay = 6 frames)
  const rightCardX = interpolate(frame, [16, 31], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase });
  const rightCardOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Staggered items
  const getItemAnim = (cardDelay: number, index: number) => {
    const delay = cardDelay + 8 + index * 3;
    return {
      opacity: interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      scale: interpolate(frame, [delay, delay + 6], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase }),
    };
  };

  const reactiveItems = ["paying premium agency prices", "straining already tight budgets", "falling behind with compliance regulations", "compromising quality of care"];
  const proactiveItems = ["The right staff", "Are in the right place", "At the right time", "For the right budget"];

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8F6F2", transform: `translateX(${slideIn}%)` }}>
      {/* Title */}
      <h1
        style={{
          fontSize: 48,
          fontWeight: 500,
          fontStyle: "italic",
          color: "#2D2D2D",
          textAlign: "center",
          marginTop: 80,
          marginBottom: 50,
          opacity: titleOpacity,
          fontFamily: "Georgia, serif",
        }}
      >
        Your SNF. You choose the outcome.
      </h1>

      {/* Cards container */}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, padding: "0 100px" }}>
        {/* Reactive Card */}
        <div
          style={{
            width: 480,
            backgroundColor: "#F0F0F0",
            borderRadius: 24,
            padding: 40,
            opacity: leftCardOpacity,
            transform: `translateX(${leftCardX}px)`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 22, color: "#2D2D2D" }}>Your SNF Minus LaborRX =</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#E53935", fontStyle: "italic", marginTop: 8 }}>Reactive</div>
            <div style={{ fontSize: 14, color: "#888", marginTop: 12 }}>Scrambling to fill shifts leaves you:</div>
          </div>
          {reactiveItems.map((item, i) => {
            const anim = getItemAnim(10, i);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                  padding: "14px 20px",
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  opacity: anim.opacity,
                  transform: `scale(${anim.scale})`,
                }}
              >
                <span style={{ color: "#E53935", fontSize: 16, fontWeight: 700 }}>✕</span>
                <span style={{ color: "#2D2D2D", fontStyle: "italic", fontSize: 15 }}>{item}</span>
              </div>
            );
          })}
        </div>

        {/* Proactive Card */}
        <div
          style={{
            width: 480,
            backgroundColor: "#EDE8DC",
            borderRadius: 24,
            padding: 40,
            opacity: rightCardOpacity,
            transform: `translateX(${rightCardX}px)`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 22, color: "#2D2D2D" }}>Your SNF Plus LaborRX =</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#4CAF50", fontStyle: "italic", marginTop: 8 }}>Proactive</div>
            <div style={{ fontSize: 14, color: "#888", marginTop: 12 }}>Analyzing your staff needs in real-time means:</div>
          </div>
          {proactiveItems.map((item, i) => {
            const anim = getItemAnim(16, i);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                  padding: "14px 20px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: 12,
                  opacity: anim.opacity,
                  transform: `scale(${anim.scale})`,
                }}
              >
                <span style={{ color: "#4CAF50", fontSize: 16, fontWeight: 700 }}>✓</span>
                <span style={{ color: "#2D2D2D", fontSize: 15 }}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: Reports Dashboard (3-4s = frames 90-120)
// ============================================
export const ReportsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Upward slide transition
  const slideY = interpolate(frame, [0, 15], [100, 0], { extrapolateRight: "clamp", easing: smoothEase });
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Cascade effect for stat cards (left to right)
  const getStatAnim = (index: number) => {
    const delay = 8 + index * 4;
    return {
      opacity: interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      scale: interpolate(frame, [delay, delay + 8], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase }),
    };
  };

  // Breakdown sections fade
  const breakdownOpacity = interpolate(frame, [20, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const breakdownY = interpolate(frame, [20, 28], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase });

  const stats = [
    { label: "Total Call-offs", value: "342", change: "-12%", isNegative: true },
    { label: "Auto-Approval Rate", value: "78.5%", change: "+5.2%", isNegative: false },
    { label: "Shifts Replaced", value: "321", change: "-18%", isNegative: true },
    { label: "Unfilled Shifts", value: "8", change: "+33%", isNegative: false },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundWarm,
        opacity: fadeIn,
        transform: `translateY(${slideY}px)`,
      }}
    >
      {/* Header text */}
      <div style={{ textAlign: "center", padding: "60px 0 30px" }}>
        <h1 style={{ fontSize: 42, fontWeight: 400, color: "#888", fontStyle: "italic", margin: 0, lineHeight: 1.3 }}>
          Scheduling staff drains energy and time.
        </h1>
        <h1 style={{ fontSize: 42, fontWeight: 400, color: "#888", fontStyle: "italic", margin: "10px 0 0", lineHeight: 1.3 }}>
          LaborRX offers a smooth, cost-efficient staffing solution.
        </h1>
      </div>

      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
        <div style={{ display: "flex", backgroundColor: "#EDE8E0", borderRadius: 30, padding: 4 }}>
          <div style={{ padding: "12px 24px", backgroundColor: "#2D2D2D", borderRadius: 26, color: "white", fontSize: 14 }}>For Facilities</div>
          <div style={{ padding: "12px 24px", color: "#2D2D2D", fontSize: 14 }}>For Nurses</div>
        </div>
      </div>

      {/* Dashboard card */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 1000,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 700, color: "#2D2D2D", marginBottom: 24 }}>Reports</div>

          {/* Stats row with cascade */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            {stats.map((stat, i) => {
              const anim = getStatAnim(i);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    backgroundColor: "#F9F9F9",
                    borderRadius: 12,
                    padding: 20,
                    opacity: anim.opacity,
                    transform: `scale(${anim.scale})`,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#2D2D2D" }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: stat.isNegative ? "#E53935" : "#4CAF50", marginTop: 6 }}>
                    {stat.change} vs last week
                  </div>
                </div>
              );
            })}
          </div>

          {/* Breakdown sections */}
          <div
            style={{
              display: "flex",
              gap: 20,
              opacity: breakdownOpacity,
              transform: `translateY(${breakdownY}px)`,
            }}
          >
            <div style={{ flex: 1, backgroundColor: "#F9F9F9", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Approved Call-offs Breakdown</div>
              <div style={{ fontSize: 12, color: "#666" }}>Auto-Approved: 342 | Manual: 62 | Denied: 10</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "#F9F9F9", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>How Shifts Were Replaced</div>
              <div style={{ fontSize: 12, color: "#666" }}>User Browse: 138 | Admin: 122 | Auto: 61</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 5: Feature Cards (4-5s = frames 120-150)
// ============================================
export const FeatureCardsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom transition from previous
  const zoomIn = interpolate(frame, [0, 10], [1.15, 1], { extrapolateRight: "clamp", easing: smoothEase });
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2x2 grid reveal: top-left, top-right, bottom-left, bottom-right
  const getCardAnim = (index: number) => {
    const delays = [5, 6.5, 8, 9.5]; // 0.05s stagger = ~1.5 frames
    const delay = delays[index];
    return {
      opacity: interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      y: interpolate(frame, [delay, delay + 10], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase }),
    };
  };

  // Breathing animation at end
  const breathe = frame > 20 ? interpolate(Math.sin((frame - 20) / 8), [-1, 1], [1, 1.02]) : 1;

  const features = [
    {
      icon: "👤",
      title: "Reduce Labor Costs",
      color: "#E8F5E9",
      items: ["Compare costs between per diem and agency options", "Adjust staffing based on acuity and census", "Prevent overtime through our tracking system", "Monitor labor costs on our user-friendly dashboard"],
    },
    {
      icon: "⏰",
      title: "Maximize Administrative Time",
      color: "#E3F2FD",
      items: ["Automate your shift posting, time/attendance tracking", "Communicate efficiently with staff through mobile app", "View all labor spending on our centralized dashboard"],
    },
    {
      icon: "📋",
      title: "Increase Staffing Efficiency",
      color: "#FFF8E1",
      items: ["Predict upcoming shifts", "Automate your shift posting", "Choose from your internal per diem pools", "Distribute shifts easily and quickly"],
    },
    {
      icon: "😊",
      title: "Increase Staff Satisfaction/Retention",
      color: "#FCE4EC",
      items: ["Provide mobile app for shift preference selection", "Get rid of mandatory overtime", "Create predictable shift schedules", "Reduce last-minute schedule changes"],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAFAFA",
        opacity: fadeIn,
        transform: `scale(${zoomIn * breathe})`,
      }}
    >
      <div style={{ padding: "60px 80px" }}>
        {/* 2x2 Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {features.map((feature, i) => {
            const anim = getCardAnim(i);
            return (
              <div
                key={i}
                style={{
                  backgroundColor: feature.color,
                  borderRadius: 20,
                  padding: 28,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px)`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#2D2D2D", marginBottom: 16, lineHeight: 1.2 }}>{feature.title}</h3>
                {feature.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#4CAF50", fontSize: 12, marginTop: 3 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
