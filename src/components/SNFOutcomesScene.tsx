import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SNFOutcomesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 100,
    },
  });

  // Cards slide in from sides
  const leftCardX = spring({
    frame: frame - 5,
    fps,
    config: {
      damping: 16,
      stiffness: 80,
      mass: 1,
    },
  });

  const rightCardX = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 16,
      stiffness: 80,
      mass: 1,
    },
  });

  // Reactive items (negative)
  const reactiveItems = [
    "paying premium agency prices",
    "straining already tight budgets",
    "falling behind with compliance regulations",
    "compromising quality of care",
  ];

  // Proactive items (positive)
  const proactiveItems = [
    "The right staff",
    "Are in the right place",
    "At the right time",
    "For the right budget",
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 20}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 400,
            fontFamily: "'Inter', 'Georgia', serif",
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Your SNF. You choose the outcome.
        </h1>
      </div>

      {/* Cards container */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 60,
        }}
      >
        {/* Reactive Card (Left - Gray) */}
        <div
          style={{
            width: 520,
            background: "#EDEBE8",
            borderRadius: 32,
            padding: "50px 40px",
            transform: `translateX(${(1 - leftCardX) * -100}px)`,
            opacity: leftCardX,
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 400,
              fontFamily: "'Inter', serif",
              color: "#1a1a1a",
              margin: 0,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Your SNF Minus LaborRX =
          </h2>
          <h3
            style={{
              fontSize: 36,
              fontWeight: 600,
              fontFamily: "'Inter', serif",
              color: "#DC2626",
              margin: 0,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Reactive
          </h3>
          <p
            style={{
              fontSize: 16,
              fontFamily: "system-ui",
              color: "#666",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Scrambling to fill shifts leaves you:
          </p>

          {/* Reactive items with staggered animation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reactiveItems.map((item, index) => {
              const itemOpacity = interpolate(frame, [12 + index * 4, 18 + index * 4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const itemX = interpolate(frame, [12 + index * 4, 18 + index * 4], [-20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const rotation = [-3, 2, -2, 1][index];

              return (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "14px 20px",
                    borderRadius: 30,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    transform: `translateX(${itemX}px) rotate(${rotation}deg)`,
                    opacity: itemOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#FEE2E2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700 }}>✕</span>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      fontFamily: "system-ui",
                      color: "#1a1a1a",
                      fontStyle: "italic",
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proactive Card (Right - Beige/Tan) */}
        <div
          style={{
            width: 520,
            background: "#E8E0D0",
            borderRadius: 32,
            padding: "50px 40px",
            transform: `translateX(${(1 - rightCardX) * 100}px)`,
            opacity: rightCardX,
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 400,
              fontFamily: "'Inter', serif",
              color: "#1a1a1a",
              margin: 0,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Your SNF Plus LaborRX =
          </h2>
          <h3
            style={{
              fontSize: 36,
              fontWeight: 600,
              fontFamily: "'Inter', serif",
              color: "#16A34A",
              margin: 0,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Proactive
          </h3>
          <p
            style={{
              fontSize: 16,
              fontFamily: "system-ui",
              color: "#666",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Analyzing your staff needs in real-time means:
          </p>

          {/* Proactive items with staggered animation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            {proactiveItems.map((item, index) => {
              const itemOpacity = interpolate(frame, [15 + index * 4, 21 + index * 4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const itemY = interpolate(frame, [15 + index * 4, 21 + index * 4], [15, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "14px 24px",
                    borderRadius: 30,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    transform: `translateY(${itemY}px)`,
                    opacity: itemOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#DCFCE7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700 }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      fontFamily: "system-ui",
                      color: "#1a1a1a",
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
