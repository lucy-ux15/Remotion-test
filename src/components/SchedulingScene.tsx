import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SchedulingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade in with scale
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 15], [0.99, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dashboard card animation
  const cardOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardY = spring({
    frame: frame - 6,
    fps,
    config: {
      damping: 18,
      stiffness: 90,
      mass: 0.9,
    },
  });

  // Stats animation with stagger
  const stats = [
    { label: "Total Call-offs", value: "342", change: "-12%", positive: false },
    { label: "Auto-Approval Rate", value: "78.5%", change: "+5.2%", positive: true },
    { label: "Shifts Replaced", value: "321", change: "-18%", positive: false },
    { label: "Unfilled Shifts", value: "8", change: "+33%", positive: true },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 60,
      }}
    >
      {/* Title section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 52,
            fontWeight: 400,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#888",
            margin: 0,
            marginBottom: 10,
            fontStyle: "italic",
          }}
        >
          Scheduling staff drains energy and time.
        </h1>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 400,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#888",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          LaborRX offers a smooth, cost-efficient
        </h2>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 400,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#888",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          staffing solution.
        </h2>
      </div>

      {/* Toggle buttons */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 40,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            background: "#1a1a1a",
            color: "white",
            padding: "14px 32px",
            borderRadius: "30px 0 0 30px",
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "system-ui",
          }}
        >
          For Facilities
        </div>
        <div
          style={{
            background: "#F3F0ED",
            color: "#666",
            padding: "14px 32px",
            borderRadius: "0 30px 30px 0",
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "system-ui",
          }}
        >
          For Nurses
        </div>
      </div>

      {/* Dashboard card */}
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: "32px 40px",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
          width: 1100,
          opacity: cardOpacity,
          transform: `translateY(${(1 - cardY) * 30}px)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #E8E0D8 0%, #D4C8BC 100%)",
              }}
            />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "system-ui", color: "#1a1a1a" }}>
                Serenity Springs Hospital
              </div>
              <div style={{ fontSize: 13, fontFamily: "system-ui", color: "#888" }}>
                3517 W. Gray St. Utica, Pennsylvania
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 500, fontFamily: "system-ui", color: "#1a1a1a" }}>
              Nick Cooper
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D4C8BC 0%, #B8A99A 100%)",
              }}
            />
          </div>
        </div>

        {/* Reports title */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 700, fontFamily: "system-ui", color: "#1a1a1a", margin: 0 }}>
            Reports
          </h3>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                background: "#F9F5F1",
                padding: "10px 20px",
                borderRadius: 20,
                fontSize: 14,
                fontFamily: "system-ui",
                color: "#1a1a1a",
              }}
            >
              Last week
            </div>
            <div
              style={{
                background: "#1a1a1a",
                padding: "10px 20px",
                borderRadius: 20,
                fontSize: 14,
                fontFamily: "system-ui",
                color: "white",
              }}
            >
              Create Custom Report
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((stat, index) => {
            const statOpacity = interpolate(frame, [12 + index * 3, 20 + index * 3], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const statY = interpolate(frame, [12 + index * 3, 20 + index * 3], [10, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  background: "#F9F5F1",
                  padding: "24px",
                  borderRadius: 16,
                  opacity: statOpacity,
                  transform: `translateY(${statY}px)`,
                }}
              >
                <div style={{ fontSize: 13, fontFamily: "system-ui", color: "#888", marginBottom: 8 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "system-ui", color: "#1a1a1a", marginBottom: 6 }}>
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "system-ui",
                    color: stat.positive ? "#10B981" : "#E85A4F",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>{stat.positive ? "↗" : "↘"}</span>
                  <span>{stat.change} vs last week</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
