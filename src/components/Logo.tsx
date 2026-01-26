import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { COLORS } from "./Background";

interface LogoProps {
  fadeOut?: boolean;
  fadeOutStart?: number;
}

// LaborRx Logo Icon - Cross-shaped overlapping ovals
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => {
  const scale = size / 80;
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transform: `scale(${scale})`,
      }}
    >
      {/* Horizontal oval */}
      <div
        style={{
          position: "absolute",
          width: 70,
          height: 40,
          left: 5,
          top: 20,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.95,
        }}
      />
      {/* Vertical oval */}
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 70,
          left: 20,
          top: 5,
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.9,
        }}
      />
      {/* Center intersection (darker) */}
      <div
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          left: 25,
          top: 25,
          borderRadius: "50%",
          background: COLORS.accent,
          opacity: 0.75,
        }}
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ fadeOut = true, fadeOutStart = 70 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle ease-out for opacity: 0 to 1 over ~1 second
  const fadeIn = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Gentle scale: 98% to 100% with ease-out
  const scale = interpolate(frame, [0, fps * 1], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Fade out at end if enabled
  const fadeOutOpacity = fadeOut
    ? interpolate(frame, [fadeOutStart, fadeOutStart + 15], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      })
    : 1;

  const opacity = fadeIn * fadeOutOpacity;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo Icon */}
        <LaborRxIcon size={100} />

        {/* Company Name */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            color: COLORS.secondary,
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

// Smaller logo for outro
export const LogoSmall: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

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
          alignItems: "center",
          gap: 16,
        }}
      >
        <LaborRxIcon size={60} />
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            color: COLORS.secondary,
            margin: 0,
            letterSpacing: "-1.5px",
          }}
        >
          LaborRx
        </h1>
      </div>
    </AbsoluteFill>
  );
};
