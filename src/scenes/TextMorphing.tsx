import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";

const { fontFamily: loraFamily } = loadLora();

// Timing at 60fps across 600 frames (10 seconds):
// "professional" visible: frames 0-180 (0-3s)
// Crossfade to "cost-efficient": frames 160-210 (0.5s transition)
// "cost-efficient" visible: frames 210-380 (hold ~3s)
// Crossfade to "smooth": frames 360-410 (0.5s transition)
// "smooth platform" visible: frames 410-570 (hold ~2.5s)
// Fade out everything: frames 560-600

export const TextMorphing: React.FC = () => {
  const frame = useCurrentFrame();

  // Overall fade in
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Overall fade out at end
  const fadeOut = interpolate(frame, [560, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const overallOpacity = fadeIn * fadeOut;

  // Word 1: "professional..."
  const word1Opacity = interpolate(frame, [10, 30, 160, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const word1Scale = interpolate(frame, [10, 30, 160, 210], [0.95, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word 2: "cost-efficient..."
  const word2Opacity = interpolate(frame, [170, 220, 360, 410], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const word2Scale = interpolate(frame, [170, 220, 360, 410], [0.95, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word 3: "smooth platform"
  const word3Opacity = interpolate(frame, [370, 420, 560, 600], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const word3Scale = interpolate(frame, [370, 420, 560, 600], [0.95, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top text slide in
  const topTextY = interpolate(frame, [0, 40], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #ede0cc 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: overallOpacity,
      }}
    >
      {/* Top text: "Scheduling staff drains energy and time." */}
      <div
        style={{
          transform: `translateY(${topTextY}px)`,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 58,
            fontWeight: 400,
            color: "#9a9088",
            lineHeight: 1.4,
          }}
        >
          Scheduling staff drains energy
        </div>
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 58,
            fontWeight: 400,
            color: "#9a9088",
            lineHeight: 1.4,
          }}
        >
          and time.
        </div>
      </div>

      {/* Main text with morphing word */}
      <div
        style={{
          fontFamily: loraFamily,
          fontSize: 58,
          fontWeight: 400,
          color: "#9a9088",
          textAlign: "center",
          position: "relative",
        }}
      >
        <span>LaborRX offers a </span>
        <span
          style={{
            position: "relative",
            display: "inline-block",
            minWidth: 420,
          }}
        >
          {/* Word 1: professional... */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              whiteSpace: "nowrap",
              opacity: word1Opacity,
              transform: `scale(${word1Scale})`,
              transformOrigin: "left center",
              display: "inline-block",
            }}
          >
            professional...
          </span>

          {/* Word 2: cost-efficient... */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              whiteSpace: "nowrap",
              opacity: word2Opacity,
              transform: `scale(${word2Scale})`,
              transformOrigin: "left center",
              display: "inline-block",
            }}
          >
            cost-efficient...
          </span>

          {/* Word 3: smooth platform */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              whiteSpace: "nowrap",
              opacity: word3Opacity,
              transform: `scale(${word3Scale})`,
              transformOrigin: "left center",
              display: "inline-block",
            }}
          >
            smooth platform
          </span>

          {/* Invisible spacer */}
          <span style={{ visibility: "hidden" }}>cost-efficient...</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
