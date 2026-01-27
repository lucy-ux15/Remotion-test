import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

// ============================================
// EASING FUNCTIONS
// ============================================
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);
const easeOutBounce = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);
const easeSine = Easing.bezier(0.45, 0, 0.55, 1);

// ============================================
// SCENE 1: Logo (0-2s / 0-120 frames)
// Uses: logo.png - beige background with LaborRx logo
// ============================================
export const LogoImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-18 frames: Fade in
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // 18-102: Pulse 1.0 → 1.02 → 1.0
  const pulsePhase = ((frame - 18) / 120) * Math.PI * 2;
  const pulse = frame >= 18 && frame < 102 ? 1 + 0.02 * Math.sin(pulsePhase) : 1;

  // 102-120: Zoom to 1.2 + fade out
  const exitScale = interpolate(frame, [102, 120], [1, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const fadeOut = interpolate(frame, [102, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const opacity = frame < 102 ? fadeIn : fadeIn * fadeOut;
  const scale = frame < 102 ? pulse : exitScale;

  return (
    <AbsoluteFill style={{ backgroundColor: "#E8E4DD" }}>
      <Img
        src={staticFile("images/logo.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: Hero with Phone (2-4.5s / 0-150 frames local)
// Uses: hero.png - white bg with phone mockup and UI cards
// ============================================
export const HeroImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30: Slide up from Y:50px + fade in
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const slideY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-138: Float ±3px
  const floatY = frame >= 30 && frame < 138 ? Math.sin((frame - 30) * 0.05) * 3 : 0;

  // 138-150: Fade out
  const fadeOut = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const opacity = frame < 138 ? fadeIn : fadeIn * fadeOut;
  const translateY = frame < 30 ? slideY : floatY;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <Img
        src={staticFile("images/hero.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Comparison Cards (4.5-6.5s / 0-120 frames local)
// Uses: comparison.png - Reactive vs Proactive cards
// ============================================
export const ComparisonImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30: Slide up + fade in + rotate 2deg → 0
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const slideY = interpolate(frame, [0, 30], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  const rotation = interpolate(frame, [0, 30], [2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-108: Float ±2px
  const floatY = frame >= 30 && frame < 108 ? Math.sin((frame - 30) * 0.04) * 2 : 0;

  // 108-120: Slide up -50px + fade out
  const exitY = interpolate(frame, [108, 120], [0, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const opacity = frame < 108 ? fadeIn : fadeIn * fadeOut;
  let translateY: number;
  if (frame < 30) translateY = slideY;
  else if (frame < 108) translateY = floatY;
  else translateY = exitY;
  const rotate = frame < 30 ? rotation : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8F6F2" }}>
      <Img
        src={staticFile("images/comparison.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: Dashboard Reports (6.5-8.5s / 0-120 frames local)
// Uses: dashboard.png - Reports dashboard
// ============================================
export const DashboardImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30: Slide up + fade in + scale 0.95 → 1.0
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const slideY = interpolate(frame, [0, 30], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  const entranceScale = interpolate(frame, [0, 30], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // 108-120: Zoom to 1.15 + fade out
  const exitScale = interpolate(frame, [108, 120], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const opacity = frame < 108 ? fadeIn : fadeIn * fadeOut;
  const translateY = frame < 30 ? slideY : 0;
  const scale = frame < 30 ? entranceScale : (frame >= 108 ? exitScale : 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDF8F5" }}>
      <Img
        src={staticFile("images/dashboard.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Feature Grid (8.5-10s / 0-90 frames local)
// Uses: features.png - Four feature cards
// ============================================
export const FeaturesImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30: Zoom in + fade in + rotate -3deg → 0
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const entranceScale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  const rotation = interpolate(frame, [0, 30], [-3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-72: Breathing scale 1.0 → 1.01 → 1.0
  const breathe = frame >= 30 && frame < 72 ? 1 + 0.01 * Math.sin((frame - 30) * 0.1) : 1;

  // 72-90: Final zoom to 1.03
  const finalScale = interpolate(frame, [72, 90], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeSine,
  });

  const brightness = interpolate(frame, [72, 81, 90], [1, 1.03, 1.01], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let scale: number;
  if (frame < 30) scale = entranceScale;
  else if (frame < 72) scale = breathe;
  else scale = finalScale;

  const rotate = frame < 30 ? rotation : 0;
  const filter = frame >= 72 ? `brightness(${brightness})` : "brightness(1)";

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <Img
        src={staticFile("images/features.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: fadeIn,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          filter,
        }}
      />
    </AbsoluteFill>
  );
};
