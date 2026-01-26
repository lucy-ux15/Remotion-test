import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./Background";

interface ComparisonSectionProps {}

const ReactiveItems = [
  "paying premium agency prices",
  "straining already tight budgets",
  "falling behind with compliance regulations",
  "compromising quality of care",
];

const ProactiveItems = [
  "The right staff",
  "Are in the right place",
  "At the right time",
  "For the right budget",
];

// X Icon for negative items
const XIcon: React.FC = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: COLORS.error,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Check Icon for positive items
const CheckIcon: React.FC = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: COLORS.success,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export const ComparisonSection: React.FC<ComparisonSectionProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [200, 230], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

  // Title animation
  const titleY = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cards animation
  const leftCardX = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const rightCardX = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Item stagger animation
  const getItemAnimation = (index: number, startFrame: number) => {
    const itemDelay = startFrame + index * 12;
    const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const itemY = spring({
      frame: frame - itemDelay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });
    return { opacity: itemOpacity, y: (1 - itemY) * 20 };
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Main Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 500,
            fontFamily: "Georgia, serif",
            color: COLORS.secondary,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Your SNF. You choose the outcome.
        </h1>
      </div>

      {/* Comparison Cards Container */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginTop: 60,
        }}
      >
        {/* Reactive Card (Left) */}
        <div
          style={{
            width: 480,
            padding: 50,
            backgroundColor: COLORS.white,
            borderRadius: 24,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            transform: `translateX(${(1 - leftCardX) * -100}px)`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 500,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: COLORS.secondary,
                margin: 0,
              }}
            >
              Your SNF Minus LaborRX =
            </h2>
            <h3
              style={{
                fontSize: 36,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: COLORS.error,
                margin: "10px 0 0 0",
                fontStyle: "italic",
              }}
            >
              Reactive
            </h3>
            <p
              style={{
                fontSize: 16,
                color: COLORS.textLight,
                margin: "15px 0 0 0",
              }}
            >
              Scrambling to fill shifts leaves you:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
            {ReactiveItems.map((item, index) => {
              const anim = getItemAnimation(index, 40);
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    padding: "12px 20px",
                    backgroundColor: "#FFF5F5",
                    borderRadius: 12,
                  }}
                >
                  <XIcon />
                  <span
                    style={{
                      fontSize: 18,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      color: COLORS.text,
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

        {/* Proactive Card (Right) */}
        <div
          style={{
            width: 480,
            padding: 50,
            backgroundColor: "#F5EFE6",
            borderRadius: 24,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            transform: `translateX(${(1 - rightCardX) * 100}px)`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 500,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: COLORS.secondary,
                margin: 0,
              }}
            >
              Your SNF Plus LaborRX =
            </h2>
            <h3
              style={{
                fontSize: 36,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: COLORS.success,
                margin: "10px 0 0 0",
                fontStyle: "italic",
              }}
            >
              Proactive
            </h3>
            <p
              style={{
                fontSize: 16,
                color: COLORS.textLight,
                margin: "15px 0 0 0",
              }}
            >
              Analyzing your staff needs in real-time means:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
            {ProactiveItems.map((item, index) => {
              const anim = getItemAnimation(index, 70);
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    padding: "12px 20px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 12,
                  }}
                >
                  <CheckIcon />
                  <span
                    style={{
                      fontSize: 18,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      color: COLORS.text,
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
