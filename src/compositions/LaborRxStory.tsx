import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ============================================
// SCENE 1: Logo Intro (0s - 1.5s) | Frames 0-90
// ============================================
const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Don't render outside scene range
  if (frame < 0 || frame >= 90) return null;

  let opacity = 1;
  let scale = 1;

  if (frame < 18) {
    // Frame 0-18: Fade in
    opacity = interpolate(frame, [0, 18], [0, 1]);
    scale = 1.0;
  } else if (frame < 72) {
    // Frame 18-72: Hold with subtle pulse
    opacity = 1.0;
    scale = 1.0 + Math.sin((frame - 18) * 0.08) * 0.015;
  } else {
    // Frame 72-90: Zoom fade out
    opacity = interpolate(frame, [72, 90], [1, 0]);
    scale = interpolate(frame, [72, 90], [1.0, 1.25]);
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F1E8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: "Get your shifts together" (1.5s - 3s) | Frames 90-180
// ============================================
const GetYourShiftsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 90 || frame >= 180) return null;

  const localFrame = frame - 90;

  // Line 1 animation
  const line1Opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = spring({
    frame: localFrame,
    fps,
    from: -20,
    to: 0,
    config: { damping: 20, stiffness: 100 },
  });

  // Line 2 animation (0.1s delay = 6 frames)
  const line2Opacity = interpolate(localFrame, [6, 24], [0, 1], { extrapolateRight: "clamp" });
  const line2Y = spring({
    frame: Math.max(0, localFrame - 6),
    fps,
    from: -20,
    to: 0,
    config: { damping: 20, stiffness: 100 },
  });

  // Exit animation
  let exitOpacity = 1;
  let exitY = 0;
  if (localFrame > 78) {
    exitOpacity = interpolate(localFrame, [78, 90], [1, 0], { extrapolateRight: "clamp" });
    exitY = interpolate(localFrame, [78, 90], [0, -15], { extrapolateRight: "clamp" });
  }

  // Subtle float during hold
  const floatY = localFrame > 18 && localFrame < 78 ? Math.sin((localFrame - 18) * 0.05) * 1 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        opacity: exitOpacity,
        transform: `translateY(${exitY + floatY}px)`,
      }}
    >
      <div
        style={{
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          fontSize: "80px",
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: "center",
          color: "#4A4A4A",
        }}
      >
        Get your
      </div>
      <div
        style={{
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
          fontSize: "80px",
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: "center",
          color: "#4A4A4A",
        }}
      >
        shifts together
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Hero Image with Phone (3s - 5s) | Frames 180-300
// ============================================
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 180 || frame >= 300) return null;

  const localFrame = frame - 180;

  let opacity = 1;
  let scale = 1;
  let translateY = 0;

  if (localFrame < 30) {
    // Entrance
    opacity = interpolate(localFrame, [0, 30], [0, 1]);
    scale = spring({
      frame: localFrame,
      fps,
      from: 0.92,
      to: 1.0,
      config: { damping: 18, stiffness: 100 },
    });
    translateY = spring({
      frame: localFrame,
      fps,
      from: 50,
      to: 0,
      config: { damping: 20, stiffness: 90 },
    });
  } else if (localFrame < 108) {
    // Hold with gentle float
    opacity = 1.0;
    translateY = Math.sin((localFrame - 30) * 0.05) * 3;
    scale = 1.0 + Math.sin((localFrame - 30) * 0.04) * 0.004;
  } else {
    // Exit fade
    opacity = interpolate(localFrame, [108, 120], [1, 0], { extrapolateRight: "clamp" });
    scale = interpolate(localFrame, [108, 120], [1.0, 0.96], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("hero.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENES 4a-4c: Morphing Text (5s - 9.5s) | Frames 300-570
// "Scheduling staff drains energy and time."
// "LaborRx offers a [smooth/& professional/cost-efficient]."
// ============================================
const MorphingTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 300 || frame >= 570) return null;

  const localFrame = frame - 300;

  // Overall scene entrance (frames 0-18 local)
  const sceneOpacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // Line 1 entrance
  const line1Y = spring({
    frame: localFrame,
    fps,
    from: -25,
    to: 0,
    config: { damping: 20, stiffness: 100 },
  });

  // Line 2 base entrance (0.1s delay)
  const line2Y = spring({
    frame: Math.max(0, localFrame - 6),
    fps,
    from: -25,
    to: 0,
    config: { damping: 20, stiffness: 100 },
  });

  // Word morphing logic
  // Scene 4a: "smooth" visible (frames 0-90 local, i.e., 300-390 global)
  // Scene 4b: "& professional" visible (frames 90-180 local, i.e., 390-480 global)
  // Scene 4c: "cost-efficient" visible (frames 180-270 local, i.e., 480-570 global)

  // "smooth" opacity
  let smoothOpacity = 0;
  let smoothY = 0;
  let smoothScale = 1;
  if (localFrame < 90) {
    if (localFrame < 78) {
      smoothOpacity = interpolate(localFrame, [6, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    } else {
      // Fade out
      smoothOpacity = interpolate(localFrame, [78, 90], [1, 0], { extrapolateRight: "clamp" });
      smoothY = interpolate(localFrame, [78, 90], [0, -10], { extrapolateRight: "clamp" });
      smoothScale = interpolate(localFrame, [78, 90], [1.0, 0.95], { extrapolateRight: "clamp" });
    }
  }

  // "& professional" opacity
  let professionalOpacity = 0;
  let professionalY = 0;
  let professionalScale = 1;
  if (localFrame >= 78 && localFrame < 180) {
    if (localFrame < 102) {
      // Fade in
      professionalOpacity = interpolate(localFrame, [90, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      professionalY = spring({
        frame: Math.max(0, localFrame - 90),
        fps,
        from: 10,
        to: 0,
        config: { damping: 18, stiffness: 120 },
      });
      professionalScale = spring({
        frame: Math.max(0, localFrame - 90),
        fps,
        from: 0.95,
        to: 1.0,
        config: { damping: 16, stiffness: 110 },
      });
    } else if (localFrame < 168) {
      professionalOpacity = 1;
    } else {
      // Fade out
      professionalOpacity = interpolate(localFrame, [168, 180], [1, 0], { extrapolateRight: "clamp" });
      professionalY = interpolate(localFrame, [168, 180], [0, -10], { extrapolateRight: "clamp" });
      professionalScale = interpolate(localFrame, [168, 180], [1.0, 0.95], { extrapolateRight: "clamp" });
    }
  }

  // "cost-efficient" opacity
  let costEfficientOpacity = 0;
  let costEfficientY = 0;
  let costEfficientScale = 1;
  if (localFrame >= 168) {
    if (localFrame < 192) {
      // Fade in
      costEfficientOpacity = interpolate(localFrame, [180, 198], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      costEfficientY = spring({
        frame: Math.max(0, localFrame - 180),
        fps,
        from: 10,
        to: 0,
        config: { damping: 18, stiffness: 120 },
      });
      costEfficientScale = spring({
        frame: Math.max(0, localFrame - 180),
        fps,
        from: 0.95,
        to: 1.0,
        config: { damping: 16, stiffness: 110 },
      });
    } else if (localFrame < 258) {
      costEfficientOpacity = 1;
    } else {
      // Full exit - fade out everything
      costEfficientOpacity = interpolate(localFrame, [258, 270], [1, 0], { extrapolateRight: "clamp" });
    }
  }

  // Full scene exit
  let exitOpacity = 1;
  let exitScale = 1;
  if (localFrame >= 258) {
    exitOpacity = interpolate(localFrame, [258, 270], [1, 0], { extrapolateRight: "clamp" });
    exitScale = interpolate(localFrame, [258, 270], [1.0, 1.05], { extrapolateRight: "clamp" });
  }

  // Subtle scale pulse during holds
  const pulseFactor = 1.0 + Math.sin(localFrame * 0.03) * 0.008;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F1E8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        opacity: sceneOpacity * exitOpacity,
        transform: `scale(${exitScale * pulseFactor})`,
      }}
    >
      <div
        style={{
          transform: `translateY(${line1Y}px)`,
          fontSize: "64px",
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.4,
          textAlign: "center",
          color: "#5A5A5A",
          marginBottom: "20px",
        }}
      >
        Scheduling staff drains energy and time.
      </div>
      <div
        style={{
          transform: `translateY(${line2Y}px)`,
          fontSize: "64px",
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.4,
          textAlign: "center",
          color: "#5A5A5A",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <span>LaborRx offers a </span>
        <span style={{ position: "relative", display: "inline-block", minWidth: "450px", textAlign: "left" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              opacity: smoothOpacity,
              transform: `translateY(${smoothY}px) scale(${smoothScale})`,
            }}
          >
            smooth.
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              opacity: professionalOpacity,
              transform: `translateY(${professionalY}px) scale(${professionalScale})`,
            }}
          >
            & professional.
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              opacity: costEfficientOpacity,
              transform: `translateY(${costEfficientY}px) scale(${costEfficientScale})`,
            }}
          >
            cost-efficient.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: "Your SNF. You choose the outcome." (9.5s - 10.5s) | Frames 570-630
// ============================================
const YourSNFScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 570 || frame >= 630) return null;

  const localFrame = frame - 570;

  let opacity = 1;
  let scale = 1;
  let translateY = 0;

  if (localFrame < 18) {
    // Fade in
    opacity = interpolate(localFrame, [0, 18], [0, 1]);
    scale = spring({
      frame: localFrame,
      fps,
      from: 0.95,
      to: 1.0,
      config: { damping: 16, stiffness: 110 },
    });
  } else if (localFrame < 48) {
    // Hold with drift
    opacity = 1;
    translateY = Math.sin((localFrame - 18) * 0.06) * 2;
  } else {
    // Fade out
    opacity = interpolate(localFrame, [48, 60], [1, 0], { extrapolateRight: "clamp" });
    translateY = interpolate(localFrame, [48, 60], [0, -20], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: "72px",
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          textAlign: "center",
          color: "#5A5A5A",
          fontStyle: "italic",
        }}
      >
        Your SNF. You choose the outcome.
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: Comparison Cards (10.5s - 12s) | Frames 630-720
// ============================================
const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 630 || frame >= 720) return null;

  const localFrame = frame - 630;

  let opacity = 1;
  let translateY = 0;
  let scale = 1;

  if (localFrame < 18) {
    // Headline fade in
    opacity = interpolate(localFrame, [0, 18], [0, 1]);
  } else if (localFrame < 36) {
    // Cards entrance with stagger effect
    opacity = 1;
    scale = spring({
      frame: localFrame - 18,
      fps,
      from: 0.95,
      to: 1.0,
      config: { damping: 16, stiffness: 100 },
    });
  } else if (localFrame < 78) {
    // Hold with gentle float
    opacity = 1;
    translateY = Math.sin((localFrame - 36) * 0.05) * 2;
  } else {
    // Exit
    opacity = interpolate(localFrame, [78, 90], [1, 0], { extrapolateRight: "clamp" });
    translateY = interpolate(localFrame, [78, 90], [0, -80], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("comparison.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 7: Reports Dashboard (12s - 13.5s) | Frames 720-810
// ============================================
const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 720 || frame >= 810) return null;

  const localFrame = frame - 720;

  let opacity = 1;
  let scale = 1;
  let translateY = 0;

  if (localFrame < 30) {
    // Dashboard build-up
    opacity = interpolate(localFrame, [0, 30], [0, 1]);
    scale = spring({
      frame: localFrame,
      fps,
      from: 0.88,
      to: 1.0,
      config: { damping: 22, stiffness: 95 },
    });
    translateY = spring({
      frame: localFrame,
      fps,
      from: 60,
      to: 0,
      config: { damping: 24, stiffness: 85 },
    });
  } else if (localFrame < 78) {
    // Hold with micro scale
    opacity = 1;
    scale = 1.0 + Math.sin((localFrame - 30) * 0.03) * 0.002;
  } else {
    // Zoom-in exit
    opacity = interpolate(localFrame, [78, 90], [1, 0], { extrapolateRight: "clamp" });
    scale = interpolate(localFrame, [78, 90], [1.0, 1.2], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("dashboard.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 8: "Thank you." (13.5s - 15s) | Frames 810-900
// ============================================
const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 810 || frame >= 900) return null;

  const localFrame = frame - 810;

  let opacity = 1;
  let scale = 1;

  if (localFrame < 18) {
    // Fade in
    opacity = interpolate(localFrame, [0, 18], [0, 1]);
    scale = spring({
      frame: localFrame,
      fps,
      from: 0.9,
      to: 1.0,
      config: { damping: 14, stiffness: 100, mass: 0.8 },
    });
  } else if (localFrame < 78) {
    // Hold with gentle pulse
    opacity = 1;
    scale = 1.0 + Math.sin((localFrame - 18) * 0.05) * 0.01;
  } else {
    // Final hold
    opacity = 1;
    scale = interpolate(localFrame, [78, 90], [1.0, 1.005], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F1E8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("thankyou.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const LaborRxStory: React.FC = () => {
  const frame = useCurrentFrame();

  // Background color transitions
  const getBackgroundColor = () => {
    if (frame < 90) return "#F5F1E8"; // Beige (logo)
    if (frame < 180) return "#FFFFFF"; // White (get your shifts)
    if (frame < 300) return "#FFFFFF"; // White (hero)
    if (frame < 570) return "#F5F1E8"; // Beige (morphing text)
    if (frame < 630) return "#FFFFFF"; // White (your SNF)
    if (frame < 720) return "#FFFFFF"; // White (comparison)
    if (frame < 810) return "#FFFFFF"; // White (dashboard)
    return "#F5F1E8"; // Beige (thank you)
  };

  return (
    <AbsoluteFill style={{ backgroundColor: getBackgroundColor() }}>
      <LogoScene />
      <GetYourShiftsScene />
      <HeroScene />
      <MorphingTextScene />
      <YourSNFScene />
      <ComparisonScene />
      <DashboardScene />
      <ThankYouScene />
    </AbsoluteFill>
  );
};
