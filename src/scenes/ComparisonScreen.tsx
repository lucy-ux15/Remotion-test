import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: loraFamily } = loadLora();
const { fontFamily: interFamily } = loadInter();

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

// Item rotation angles (left card items are slightly tilted like sticky notes)
const negativeRotations = [-2, -1.5, -1, 1];

const RedX: React.FC = () => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "#dc3545",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: 15,
      fontWeight: 700,
      flexShrink: 0,
    }}
  >
    ✕
  </div>
);

const GreenCheck: React.FC = () => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "#28a745",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: 16,
      fontWeight: 700,
      flexShrink: 0,
    }}
  >
    ✓
  </div>
);

export const ComparisonScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade in
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const titleY = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Left card slide from left
  const leftCardProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const leftCardX = interpolate(leftCardProgress, [0, 1], [-300, 0]);
  const leftCardOpacity = interpolate(leftCardProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Right card slide from right
  const rightCardProgress = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const rightCardX = interpolate(rightCardProgress, [0, 1], [300, 0]);
  const rightCardOpacity = interpolate(rightCardProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #ede0cc 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "55px 80px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: loraFamily,
          fontSize: 52,
          fontWeight: 400,
          color: "#4a4440",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 45,
        }}
      >
        Your SNF. You choose the outcome.
      </div>

      {/* Cards container */}
      <div
        style={{
          display: "flex",
          gap: 40,
          width: "100%",
          maxWidth: 1400,
          flex: 1,
        }}
      >
        {/* Left Card - Reactive */}
        <div
          style={{
            flex: 1,
            background: "#edebe7",
            borderRadius: 24,
            padding: "45px 40px",
            opacity: leftCardOpacity,
            transform: `translateX(${leftCardX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: loraFamily,
              fontSize: 30,
              color: "#7a7570",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Your SNF Minus LaborRX =
          </div>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 36,
              fontWeight: 700,
              color: "#dc3545",
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            Reactive
          </div>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 17,
              color: "#8a8480",
              textAlign: "center",
              marginBottom: 28,
            }}
          >
            Scrambling to fill shifts leaves you:
          </div>

          {/* Negative items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
            }}
          >
            {negativeItems.map((item, i) => {
              const delay = 110 + i * 20;
              const itemProgress = spring({
                frame: Math.max(0, frame - delay),
                fps,
                config: { damping: 12, stiffness: 220 },
              });
              const itemOpacity = interpolate(
                Math.max(0, frame - delay),
                [0, 8],
                [0, 1],
                { extrapolateRight: "clamp" }
              );
              const rotation = negativeRotations[i];

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "white",
                    borderRadius: 30,
                    padding: "10px 22px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                    opacity: itemOpacity,
                    transform: `scale(${itemProgress}) rotate(${rotation}deg)`,
                  }}
                >
                  <RedX />
                  <span
                    style={{
                      fontFamily: interFamily,
                      fontSize: 17,
                      color: "#4a4440",
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card - Proactive */}
        <div
          style={{
            flex: 1,
            background: "#ddd0b5",
            borderRadius: 24,
            padding: "45px 40px",
            opacity: rightCardOpacity,
            transform: `translateX(${rightCardX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: loraFamily,
              fontSize: 30,
              color: "#7a7570",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Your SNF Plus LaborRX =
          </div>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 36,
              fontWeight: 700,
              color: "#28a745",
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            Proactive
          </div>
          <div
            style={{
              fontFamily: interFamily,
              fontSize: 17,
              color: "#8a8480",
              textAlign: "center",
              marginBottom: 28,
            }}
          >
            Analyzing your staff needs in real-time means:
          </div>

          {/* Positive items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
            }}
          >
            {positiveItems.map((item, i) => {
              const delay = 140 + i * 20;
              const itemProgress = spring({
                frame: Math.max(0, frame - delay),
                fps,
                config: { damping: 12, stiffness: 220 },
              });
              const itemOpacity = interpolate(
                Math.max(0, frame - delay),
                [0, 8],
                [0, 1],
                { extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "white",
                    borderRadius: 30,
                    padding: "10px 22px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                    opacity: itemOpacity,
                    transform: `scale(${itemProgress})`,
                  }}
                >
                  <GreenCheck />
                  <span
                    style={{
                      fontFamily: interFamily,
                      fontSize: 17,
                      color: "#4a4440",
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
