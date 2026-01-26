import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./LaborRxBackground";

export const LaborRxDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleY = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
    },
  });

  // Dashboard card animation
  const cardScale = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });

  // Stats counter animation
  const statsProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

  // Animated counter values
  const totalCallOffs = Math.round(statsProgress * 342);
  const autoApproval = (statsProgress * 78.5).toFixed(1);
  const shiftsReplaced = Math.round(statsProgress * 321);
  const unfilledShifts = Math.round(statsProgress * 8);

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
          gap: 40,
          width: "90%",
          maxWidth: 1400,
        }}
      >
        {/* Title section */}
        <div
          style={{
            transform: `translateY(${(1 - titleY) * 40}px)`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 52,
              fontWeight: 400,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: "#666666",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Scheduling staff drains energy and time.
            <br />
            <span style={{ color: COLORS.black }}>LaborRX offers a smooth, cost-efficient</span>
            <br />
            <span style={{ color: COLORS.black }}>staffing solution.</span>
          </h2>
        </div>

        {/* Tab buttons */}
        <div
          style={{
            display: "flex",
            gap: 0,
            background: COLORS.beige,
            borderRadius: 30,
            padding: 4,
            transform: `scale(${Math.max(0, cardScale)})`,
          }}
        >
          <div
            style={{
              padding: "12px 28px",
              borderRadius: 26,
              background: COLORS.black,
              color: COLORS.white,
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            For Facilities
          </div>
          <div
            style={{
              padding: "12px 28px",
              borderRadius: 26,
              color: COLORS.black,
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            For Nurses
          </div>
        </div>

        {/* Dashboard Card */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            width: "100%",
            transform: `scale(${Math.max(0, cardScale)})`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 20,
              borderBottom: `1px solid ${COLORS.beige}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.beige }} />
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>Serenity Springs Hospital</p>
                <p style={{ fontSize: 13, color: "#888", margin: 0, fontFamily: "'Inter', sans-serif" }}>3517 W. Gray St. Utica, Pennsylvania</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.beige }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>Nick Cooper</p>
                <p style={{ fontSize: 12, color: "#888", margin: 0, fontFamily: "'Inter', sans-serif" }}>Scheduler manager</p>
              </div>
            </div>
          </div>

          {/* Reports title */}
          <h3
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.black,
              margin: 0,
              marginBottom: 24,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Reports
          </h3>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {/* Total Call-offs */}
            <div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Total Call-offs</p>
              <p style={{ fontSize: 42, fontWeight: 600, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>{totalCallOffs}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                <span style={{ color: COLORS.red, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>-12%</span>
                <span style={{ color: "#888", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>vs last week</span>
              </div>
            </div>

            {/* Auto-Approval Rate */}
            <div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Auto-Approval Rate</p>
              <p style={{ fontSize: 42, fontWeight: 600, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>{autoApproval}%</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                <span style={{ color: COLORS.green, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>+5.2%</span>
                <span style={{ color: "#888", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>improvement</span>
              </div>
            </div>

            {/* Shifts Replaced */}
            <div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Shifts Replaced</p>
              <p style={{ fontSize: 42, fontWeight: 600, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>{shiftsReplaced}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                <span style={{ color: COLORS.red, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>-18%</span>
                <span style={{ color: "#888", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>vs last week</span>
              </div>
            </div>

            {/* Unfilled Shifts */}
            <div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Unfilled Shifts</p>
              <p style={{ fontSize: 42, fontWeight: 600, color: COLORS.black, margin: 0, fontFamily: "'Inter', sans-serif" }}>{unfilledShifts}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                <span style={{ color: COLORS.green, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>+33%</span>
                <span style={{ color: "#888", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>increase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
