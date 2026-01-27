import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";

// ============================================
// DESIGN TOKENS - Extracted from screenshots
// ============================================
const colors = {
  // Background gradient
  bgTop: "#F8F5F0",
  bgBottom: "#F0E8DE",
  // Text colors
  textPrimary: "#5C5147", // Dark brown/charcoal from screenshots
  textSecondary: "#7A7269",
  // Logo colors
  logoCoral: "#E8705A",
  logoCoralLight: "#F5A08A",
  logoCoralDark: "#D85A45",
  logoText: "#1A1A1A",
  // Accent colors
  accentGreen: "#43A047",
  accentRed: "#E53935",
  // Card backgrounds
  cardGray: "#E8E8E3",
  cardTan: "#E5DBC8",
  cardWhite: "#FFFFFF",
};

// Font family - serif to match screenshots
const fontSerif = "Georgia, 'Times New Roman', serif";
const fontSans = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ============================================
// EASING FUNCTIONS
// ============================================
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);
const easeOutBounce = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);
const easeInOutSmooth = Easing.bezier(0.45, 0, 0.55, 1);

const FPS = 60;

// ============================================
// BACKGROUND GRADIENT COMPONENT
// ============================================
const GradientBackground: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(180deg, ${colors.bgTop} 0%, ${colors.bgBottom} 100%)`,
      opacity,
    }}
  />
);

// ============================================
// LaborRx Logo Icon (exact match to screenshot)
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    {/* Horizontal ellipse (lighter) */}
    <div
      style={{
        position: "absolute",
        width: size * 0.95,
        height: size * 0.55,
        left: size * 0.025,
        top: size * 0.225,
        borderRadius: "50%",
        background: colors.logoCoralLight,
      }}
    />
    {/* Vertical ellipse (main coral) */}
    <div
      style={{
        position: "absolute",
        width: size * 0.55,
        height: size * 0.95,
        left: size * 0.225,
        top: size * 0.025,
        borderRadius: "50%",
        background: colors.logoCoral,
      }}
    />
    {/* Center intersection (darker) */}
    <div
      style={{
        position: "absolute",
        width: size * 0.42,
        height: size * 0.42,
        left: size * 0.29,
        top: size * 0.29,
        borderRadius: "50%",
        background: colors.logoCoralDark,
      }}
    />
  </div>
);

// ============================================
// SCENE 1: Logo Intro (0-3 seconds = 180 frames)
// ============================================
export const LogoIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline:
  // 0-0.5s (0-30 frames): Fade in from black to gradient
  // 0.3-1.0s (18-60 frames): Logo fades in with scale 80% -> 100%
  // 0.5-1.2s (30-72 frames): Subtle glow pulse appears
  // 1.0-2.5s (60-150 frames): Hold with gentle breathing
  // 2.5-3.0s (150-180 frames): Fade out to transition

  // Background transition from black to gradient
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Logo fade in and scale
  const logoOpacity = interpolate(frame, [18, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const logoScale = interpolate(frame, [18, 60], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Glow effect opacity
  const glowOpacity = interpolate(frame, [30, 72], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle breathing during hold (60-150 frames)
  const breathingScale = frame >= 60 && frame < 150
    ? 1 + 0.015 * Math.sin(((frame - 60) / 90) * Math.PI * 2)
    : 1;

  // Exit fade (150-180 frames)
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 150 ? exitOpacity : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <GradientBackground opacity={bgOpacity} />

      {/* Glow effect behind logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.logoCoral}40 0%, transparent 70%)`,
          opacity: glowOpacity * finalOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* Logo container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale * breathingScale})`,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: logoOpacity * finalOpacity,
        }}
      >
        <LaborRxIcon size={100} />
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: fontSans,
            color: colors.logoText,
            letterSpacing: "-2px",
          }}
        >
          LaborRx
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: Hero Screen (3-8 seconds = 300 frames)
// ============================================
export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline:
  // 0-0.5s (0-30): Scene fades in
  // 0.3-0.8s (18-48): Headline "Get your shifts together" fades + slides up
  // 0.8-1.2s (48-72): Headline slides to final position
  // 1.0-1.5s (60-90): Subheadline appears
  // 1.2-2.0s (72-120): UI elements pop in with spring animations
  // 2.0-4.5s (120-270): Hold with micro-animations
  // 4.5-5.0s (270-300): Fade out

  // Scene entrance
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Headline animation
  const headlineOpacity = interpolate(frame, [18, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const headlineY = interpolate(frame, [18, 72], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subheadline
  const subOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const subY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Phone mockup with spring
  const phoneProgress = spring({
    frame: frame - 72,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });

  const phoneOpacity = interpolate(frame, [72, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left UI cards
  const leftCardProgress = spring({
    frame: frame - 84,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Right UI cards
  const rightCardProgress = spring({
    frame: frame - 96,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Floating animation during hold
  const floatY = frame >= 120 && frame < 270
    ? 5 * Math.sin(((frame - 120) / 180) * Math.PI * 2)
    : 0;

  // Exit fade
  const exitOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 270 ? exitOpacity : sceneOpacity;

  return (
    <AbsoluteFill style={{ opacity: finalOpacity }}>
      <GradientBackground />

      {/* Decorative background shapes */}
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.logoCoralLight}30, ${colors.logoCoral}20)`,
          opacity: phoneProgress,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 150,
          bottom: 150,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.logoCoral}20, transparent)`,
          opacity: phoneProgress,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          paddingTop: 120,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 84,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textSecondary,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.1,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Get your<br />shifts together
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 20,
            fontFamily: fontSans,
            color: colors.textSecondary,
            textAlign: "center",
            maxWidth: 500,
            margin: "30px 0 0 0",
            lineHeight: 1.5,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Our AI staffing platform helps SNF administrators<br />reduce costs and improve patient care.
        </p>
      </div>

      {/* Phone mockup */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - phoneProgress) * 100 + floatY}px)`,
          opacity: phoneOpacity,
        }}
      >
        {/* Left UI Card - RN list */}
        <div
          style={{
            position: "absolute",
            left: -200,
            top: 20,
            transform: `translateX(${(1 - leftCardProgress) * -50}px)`,
            opacity: leftCardProgress,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              width: 180,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary, marginBottom: 12 }}>RN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Annette Black</span>
              <span style={{ fontSize: 11, color: colors.accentGreen, marginLeft: "auto" }}>On time</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Kathryn Murphy</span>
              <span style={{ fontSize: 11, color: colors.accentRed, marginLeft: "auto" }}>Late arrival</span>
            </div>
          </div>
        </div>

        {/* Left badge - Shift Pickup */}
        <div
          style={{
            position: "absolute",
            left: -180,
            top: 180,
            transform: `scale(${leftCardProgress})`,
            opacity: leftCardProgress,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 24,
              padding: "10px 16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#E0E0E0" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.logoCoral }}>RN</span>
            <span style={{ fontSize: 12, color: colors.textPrimary }}>Robert Murphy</span>
            <span style={{ fontSize: 11, color: colors.logoCoral }}>Shift Pickup</span>
          </div>
        </div>

        {/* Phone device */}
        <div
          style={{
            width: 260,
            height: 520,
            backgroundColor: "#1a1a1a",
            borderRadius: 40,
            padding: 8,
            boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FDF8F5",
              borderRadius: 34,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 120,
                height: 160,
                backgroundColor: "#D4A574",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 40 }}>👩‍⚕️</span>
            </div>
          </div>
        </div>

        {/* Right UI Card - Date picker */}
        <div
          style={{
            position: "absolute",
            right: -200,
            top: 30,
            transform: `translateX(${(1 - rightCardProgress) * 50}px)`,
            opacity: rightCardProgress,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              width: 160,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>📅</span>
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Oct 18, 2023</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>☀️</span>
              <span style={{ fontSize: 13, color: colors.textPrimary }}>7AM-3PM</span>
            </div>
          </div>
        </div>

        {/* Right UI Card - Unit info */}
        <div
          style={{
            position: "absolute",
            right: -200,
            top: 150,
            transform: `translateX(${(1 - rightCardProgress) * 50}px)`,
            opacity: rightCardProgress,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              width: 180,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Unit 3</span>
              <span style={{ marginLeft: 8, fontSize: 12, color: colors.logoCoral }}>✦</span>
            </div>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 12 }}>
              <span style={{ color: colors.accentGreen }}>RN 1/1</span>
              <span style={{ marginLeft: 12, color: colors.logoCoral }}>LPN 1/1</span>
            </div>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 6 }}>Nurses</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Cody Fisher</span>
              <span style={{ fontSize: 10, color: colors.accentGreen, marginLeft: "auto" }}>RN</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Ethan Davis</span>
              <span style={{ fontSize: 10, color: colors.logoCoral, marginLeft: "auto" }}>LPN</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Feature Highlights - Rotating Text (8-18 seconds = 600 frames)
// ============================================
export const FeatureHighlightsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-0.5s (0-30): Scene fades in
  // 0.5-4.0s (30-240): First text "Scheduling staff drains energy and time."
  // 3.5-4.5s (210-270): Cross-fade transition
  // 4.0-7.0s (240-420): Second text with rotating words "LaborRX offers a smooth / cost-efficient / professional platform"
  // 7.0-9.5s (420-570): Feature callouts appear
  // 9.5-10.0s (570-600): Fade out

  // Scene entrance
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // First text block (0-270 frames)
  const firstTextOpacity = interpolate(frame, [30, 60, 210, 270], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Second text block with rotating words (240-570 frames)
  const secondTextOpacity = interpolate(frame, [240, 300, 540, 600], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rotating words: smooth, cost-efficient, professional
  // Each word shows for ~120 frames (2 seconds), with 30 frame crossfade
  const words = ["smooth", "cost-efficient", "professional"];
  const wordDuration = 100; // frames per word
  const fadeDuration = 30;

  const getWordOpacity = (wordIndex: number) => {
    const wordStart = 300 + wordIndex * wordDuration;
    const wordEnd = wordStart + wordDuration;

    // Fade in
    const fadeIn = interpolate(frame, [wordStart, wordStart + fadeDuration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });

    // Fade out (except last word)
    const fadeOut = wordIndex < words.length - 1
      ? interpolate(frame, [wordEnd - fadeDuration, wordEnd], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeInSmooth,
        })
      : 1;

    return Math.min(fadeIn, fadeOut);
  };

  // Exit fade
  const exitOpacity = interpolate(frame, [570, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 570 ? exitOpacity : sceneOpacity;

  return (
    <AbsoluteFill style={{ opacity: finalOpacity }}>
      <GradientBackground />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        {/* First text block */}
        <div
          style={{
            position: "absolute",
            opacity: firstTextOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 400,
              fontFamily: fontSerif,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Scheduling staff drains<br />
            energy and time.<br />
            <span style={{ fontStyle: "italic" }}>LaborRX offers a smooth.</span>
          </h1>
        </div>

        {/* Second text block with rotating words */}
        <div
          style={{
            position: "absolute",
            opacity: secondTextOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 400,
              fontFamily: fontSerif,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            LaborRX offers a
          </h1>
          <div style={{ position: "relative", height: 90, marginTop: 10 }}>
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 72,
                  fontWeight: 600,
                  fontFamily: fontSerif,
                  fontStyle: "italic",
                  color: colors.logoCoral,
                  opacity: getWordOpacity(i),
                  whiteSpace: "nowrap",
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 400,
              fontFamily: fontSerif,
              color: colors.textSecondary,
              margin: "10px 0 0 0",
              lineHeight: 1.3,
            }}
          >
            platform.
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: Comparison Screen (18-25 seconds = 420 frames)
// ============================================
export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline:
  // 0-0.5s (0-30): Scene fades in
  // 0.3-0.8s (18-48): Headline appears
  // 0.5-1.0s (30-60): Left card slides in from left
  // 0.7-1.2s (42-72): Right card slides in from right
  // 1.0-1.8s (60-108): List items cascade in
  // 1.8-6.5s (108-390): Hold with micro-animations
  // 6.5-7.0s (390-420): Fade out

  // Scene entrance
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Headline
  const headlineOpacity = interpolate(frame, [18, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const headlineY = interpolate(frame, [18, 48], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Left card with spring
  const leftCardProgress = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 1,
    },
  });

  // Right card with spring
  const rightCardProgress = spring({
    frame: frame - 42,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 1,
    },
  });

  // List item animations
  const getItemOpacity = (cardIndex: number, itemIndex: number) => {
    const baseFrame = cardIndex === 0 ? 60 : 72;
    const itemFrame = baseFrame + itemIndex * 10;
    return interpolate(frame, [itemFrame, itemFrame + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });
  };

  const getItemY = (cardIndex: number, itemIndex: number) => {
    const baseFrame = cardIndex === 0 ? 60 : 72;
    const itemFrame = baseFrame + itemIndex * 10;
    return interpolate(frame, [itemFrame, itemFrame + 18], [15, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });
  };

  // Floating animation during hold
  const leftFloat = frame >= 108 && frame < 390
    ? 3 * Math.sin(((frame - 108) / 180) * Math.PI * 2)
    : 0;

  const rightFloat = frame >= 108 && frame < 390
    ? -3 * Math.sin(((frame - 108) / 180) * Math.PI * 2)
    : 0;

  // Exit fade
  const exitOpacity = interpolate(frame, [390, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 390 ? exitOpacity : sceneOpacity;

  const reactiveItems = [
    "paying premium agency prices",
    "straining already tight budgets",
    "falling behind with compliance regulations",
    "compromising quality of care",
  ];

  const proactiveItems = [
    "The right staff",
    "Are in the right place",
    "At the right time",
    "For the right budget",
  ];

  return (
    <AbsoluteFill style={{ opacity: finalOpacity }}>
      <GradientBackground />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: fontSerif,
            color: colors.textPrimary,
            textAlign: "center",
            margin: "0 0 50px 0",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Your SNF. You choose the outcome.
        </h1>

        {/* Cards container */}
        <div style={{ display: "flex", gap: 40 }}>
          {/* Reactive Card (Left) */}
          <div
            style={{
              width: 420,
              backgroundColor: colors.cardGray,
              borderRadius: 24,
              padding: 36,
              transform: `translateX(${(1 - leftCardProgress) * -150}px) translateY(${leftFloat}px)`,
              opacity: leftCardProgress,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 20, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Minus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontFamily: fontSerif,
                  color: colors.accentRed,
                  marginTop: 8,
                }}
              >
                Reactive
              </div>
              <div style={{ fontSize: 14, color: colors.textSecondary, marginTop: 12, fontFamily: fontSans }}>
                Scrambling to fill shifts leaves you:
              </div>
            </div>
            {reactiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                  padding: "14px 18px",
                  backgroundColor: colors.cardWhite,
                  borderRadius: 30,
                  transform: `rotate(-2deg) translateY(${getItemY(0, i)}px)`,
                  opacity: getItemOpacity(0, i),
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: colors.accentRed,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✕
                </span>
                <span style={{ color: colors.textPrimary, fontStyle: "italic", fontSize: 14, fontFamily: fontSans }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Proactive Card (Right) */}
          <div
            style={{
              width: 420,
              backgroundColor: colors.cardTan,
              borderRadius: 24,
              padding: 36,
              transform: `translateX(${(1 - rightCardProgress) * 150}px) translateY(${rightFloat}px)`,
              opacity: rightCardProgress,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 20, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Plus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontFamily: fontSerif,
                  color: colors.accentGreen,
                  marginTop: 8,
                }}
              >
                Proactive
              </div>
              <div style={{ fontSize: 14, color: colors.textSecondary, marginTop: 12, fontFamily: fontSans }}>
                Analyzing your staff needs in real-time means:
              </div>
            </div>
            {proactiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                  padding: "14px 18px",
                  backgroundColor: colors.cardWhite,
                  borderRadius: 30,
                  transform: `translateY(${getItemY(1, i)}px)`,
                  opacity: getItemOpacity(1, i),
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: colors.accentGreen,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: colors.textPrimary, fontSize: 14, fontFamily: fontSans }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Thank You / Call-to-Action (25-30 seconds = 300 frames)
// ============================================
export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline:
  // 0-0.5s (0-30): Scene fades in
  // 0.3-1.0s (18-60): "Thank you." text fades in with scale
  // 1.0-1.5s (60-90): Logo fades in below
  // 1.5-4.5s (90-270): Hold with subtle breathing
  // 4.5-5.0s (270-300): Final hold (no fade - video ends)

  // Scene entrance
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Thank you text
  const textOpacity = interpolate(frame, [18, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const textScale = interpolate(frame, [18, 60], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Logo
  const logoOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const logoY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle breathing during hold
  const breathingScale = frame >= 90
    ? 1 + 0.01 * Math.sin(((frame - 90) / 120) * Math.PI * 2)
    : 1;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <GradientBackground />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Thank you text */}
        <h1
          style={{
            fontSize: 96,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textPrimary,
            margin: 0,
            opacity: textOpacity,
            transform: `scale(${textScale * breathingScale})`,
          }}
        >
          Thank you.
        </h1>

        {/* Logo */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: logoOpacity,
            transform: `translateY(${logoY}px) scale(${breathingScale})`,
          }}
        >
          <LaborRxIcon size={48} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              fontFamily: fontSans,
              color: colors.logoText,
              letterSpacing: "-1px",
            }}
          >
            LaborRx
          </span>
        </div>

        {/* Website URL */}
        <p
          style={{
            marginTop: 24,
            fontSize: 18,
            fontFamily: fontSans,
            color: colors.textSecondary,
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          www.laborrx.com
        </p>
      </div>
    </AbsoluteFill>
  );
};
