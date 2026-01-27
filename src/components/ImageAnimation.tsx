import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

// ============================================
// EASING FUNCTIONS (as specified)
// ============================================
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);
const easeOutBounce = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);
const easeSine = Easing.bezier(0.45, 0, 0.55, 1);

// Image paths from public folder
const IMAGES = {
  logo: staticFile("images/logo.png"),
  hero: staticFile("images/hero-phone.png"),
  comparison: staticFile("images/comparison-cards.png"),
  dashboard: staticFile("images/dashboard-reports.png"),
  features: staticFile("images/feature-grid.png"),
};

// ============================================
// SCENE 1: Logo Intro (0s - 2s / Frames 0-120)
// Full screen logo image with fade, pulse, and zoom-out
// ============================================
export const LogoImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-18 frames: Fade in from 0 to 1 + scale from 0.95 to 1.0
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // 102-120 frames: Scale up to 1.3 + fade out
  const fadeOut = interpolate(frame, [102, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Combined opacity
  const opacity = frame < 102 ? fadeIn : fadeIn * fadeOut;

  // 18-102 frames: Subtle pulse 1.0 → 1.02 → 1.0 using sine wave
  const pulsePhase = ((frame - 18) / 120) * Math.PI * 2;
  const pulse = frame >= 18 && frame < 102
    ? 1 + 0.02 * Math.sin(pulsePhase)
    : 1;

  // Scale: 0.95 → 1.0 for entrance, then pulse, then 1.0 → 1.3 for exit
  const entranceScale = interpolate(frame, [0, 18], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const exitScale = interpolate(frame, [102, 120], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  let scale: number;
  if (frame < 18) {
    scale = entranceScale;
  } else if (frame < 102) {
    scale = pulse;
  } else {
    scale = exitScale;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#E8E4DD", // Beige background matching logo image
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={IMAGES.logo}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: Hero Screen (2s - 4.5s / Frames 0-150 local)
// Full screen hero image with slide up, float, and exit
// ============================================
export const HeroImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30 frames: Fade in + slide up from Y:50px + scale 0.95 → 1.0
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

  const entranceScale = interpolate(frame, [0, 30], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // 30-138 frames: Hold with continuous float ±3px
  const floatY = frame >= 30 && frame < 138
    ? Math.sin((frame - 30) * 0.05) * 3
    : 0;

  // 138-150 frames: Scale down to 0.95 + fade out
  const fadeOut = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const exitScale = interpolate(frame, [138, 150], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  // Combined values
  const opacity = frame < 138 ? fadeIn : fadeIn * fadeOut;
  const translateY = frame < 30 ? slideY : floatY;
  const scale = frame < 30 ? entranceScale : (frame >= 138 ? exitScale : 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDF8F5", // Warm background
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={IMAGES.hero}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Comparison Cards (4.5s - 6.5s / Frames 0-120 local)
// Full screen comparison with entrance, float, and slide-up exit
// ============================================
export const ComparisonImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30 frames: Fade in + slide up from Y:40px + scale 0.9 → 1.0 + rotate 2deg → 0deg
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

  const entranceScale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  const rotation = interpolate(frame, [0, 30], [2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-108 frames: Hold with float ±2px
  const floatY = frame >= 30 && frame < 108
    ? Math.sin((frame - 30) * 0.04) * 2
    : 0;

  // 108-120 frames: Slide up Y: 0 → -100px + fade out
  const exitY = interpolate(frame, [108, 120], [0, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  // Combined values
  const opacity = frame < 108 ? fadeIn : fadeIn * fadeOut;
  let translateY: number;
  if (frame < 30) {
    translateY = slideY;
  } else if (frame < 108) {
    translateY = floatY;
  } else {
    translateY = exitY;
  }
  const scale = frame < 30 ? entranceScale : 1;
  const rotate = frame < 30 ? rotation : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F8F6F2", // Light warm background
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={IMAGES.comparison}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: Dashboard Reports (6.5s - 8.5s / Frames 0-120 local)
// Full screen dashboard with slide up, shimmer, and zoom-in exit
// ============================================
export const DashboardImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30 frames: Fade in + slide up from Y:60px + scale 0.92 → 1.0
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

  const entranceScale = interpolate(frame, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-108 frames: Hold with subtle shimmer (opacity 1.0 to 0.98)
  const shimmer = frame >= 30 && frame < 108
    ? 1 - 0.02 * Math.sin((frame - 30) * 0.08)
    : 1;

  // 108-120 frames: Scale up to 1.1 (zoom in) + fade out
  const exitScale = interpolate(frame, [108, 120], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  // Combined values
  let opacity: number;
  if (frame < 30) {
    opacity = fadeIn;
  } else if (frame < 108) {
    opacity = shimmer;
  } else {
    opacity = fadeOut;
  }

  const translateY = frame < 30 ? slideY : 0;
  const scale = frame < 30 ? entranceScale : (frame >= 108 ? exitScale : 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDF8F5", // Warm cream background
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={IMAGES.dashboard}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Feature Grid Finale (8.5s - 10s / Frames 0-90 local)
// Full screen feature grid with dramatic entrance and final glow
// ============================================
export const FeaturesImageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-30 frames: Fade in + scale 0.85 → 1.0 + rotate -3deg → 0deg
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const entranceScale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  const rotation = interpolate(frame, [0, 30], [-3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // 30-72 frames: Hold with breathing (scale 1.0 → 1.005) + float ±2px
  const breathe = frame >= 30 && frame < 72
    ? 1 + 0.005 * Math.sin((frame - 30) * 0.1)
    : 1;

  const floatY = frame >= 30 && frame < 72
    ? Math.sin((frame - 30) * 0.08) * 2
    : 0;

  // 72-90 frames: Final scale to 1.02 + brightness glow
  const finalScale = interpolate(frame, [72, 90], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeSine,
  });

  const brightness = interpolate(frame, [72, 81, 90], [1, 1.05, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Combined values
  const opacity = fadeIn; // No fade out - hold on final frame
  let scale: number;
  let translateY: number;
  let rotate: number;

  if (frame < 30) {
    scale = entranceScale;
    translateY = 0;
    rotate = rotation;
  } else if (frame < 72) {
    scale = breathe;
    translateY = floatY;
    rotate = 0;
  } else {
    scale = finalScale;
    translateY = 0;
    rotate = 0;
  }

  const filter = frame >= 72 ? `brightness(${brightness})` : "brightness(1)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF", // White background
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={IMAGES.features}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity,
          transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
          filter,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// TRANSITION OVERLAY COMPONENT
// Subtle white flash between scenes
// ============================================
export const TransitionFlash: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame - 2, startFrame, startFrame + 2],
    [0, 0.15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
