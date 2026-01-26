import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./LaborRxBackground";

export const LaborRxComparison: React.FC = () => {
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

  // Left card animation
  const leftCardX = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
    },
  });

  // Right card animation
  const rightCardX = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
    },
  });

  // List items stagger animation
  const getItemOpacity = (index: number, startFrame: number) => {
    return interpolate(frame, [startFrame + index * 12, startFrame + index * 12 + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  // Fade out
  const fadeOut = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

  const negativeItems = [
    "paying premium agency prices",
    "straining already tight budgets",
    "falling behind with compliance regulations",
    "compromising quality of care",
  ];

  const positiveItems = [
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
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          width: "90%",
          maxWidth: 1200,
        }}
      >
        {/* Title */}
        <div
          style={{
            transform: `translateY(${(1 - titleY) * 40}px)`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 400,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: COLORS.black,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Your SNF. You choose the outcome.
          </h2>
        </div>

        {/* Comparison cards */}
        <div
          style={{
            display: "flex",
            gap: 40,
            width: "100%",
          }}
        >
          {/* Left card - Without LaborRX */}
          <div
            style={{
              flex: 1,
              background: COLORS.cream,
              borderRadius: 24,
              padding: 48,
              transform: `translateX(${(1 - leftCardX) * -100}px)`,
            }}
          >
            <h3
              style={{
                fontSize: 32,
                fontWeight: 400,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: COLORS.black,
                margin: 0,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Your SNF Minus LaborRX =
            </h3>
            <h4
              style={{
                fontSize: 36,
                fontWeight: 600,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: COLORS.red,
                margin: 0,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Reactive
            </h4>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                textAlign: "center",
                marginBottom: 32,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Scrambling to fill shifts leaves you:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              {negativeItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    opacity: getItemOpacity(index, 40),
                    background: COLORS.white,
                    borderRadius: 20,
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 2}deg)`,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#FEE2E2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: COLORS.red, fontSize: 14, fontWeight: 700 }}>x</span>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      color: COLORS.black,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right card - With LaborRX */}
          <div
            style={{
              flex: 1,
              background: COLORS.tan,
              borderRadius: 24,
              padding: 48,
              transform: `translateX(${(1 - rightCardX) * 100}px)`,
            }}
          >
            <h3
              style={{
                fontSize: 32,
                fontWeight: 400,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: COLORS.black,
                margin: 0,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Your SNF Plus LaborRX =
            </h3>
            <h4
              style={{
                fontSize: 36,
                fontWeight: 600,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: COLORS.green,
                margin: 0,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Proactive
            </h4>
            <p
              style={{
                fontSize: 16,
                color: "#666",
                textAlign: "center",
                marginBottom: 32,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Analyzing your staff needs in real-time means:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              {positiveItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    opacity: getItemOpacity(index, 50),
                    background: COLORS.white,
                    borderRadius: 20,
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#DCFCE7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: COLORS.green, fontSize: 14, fontWeight: 700 }}>+</span>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      color: COLORS.black,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
