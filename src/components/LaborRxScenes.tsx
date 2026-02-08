import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";

// ============================================
// DESIGN TOKENS - EXACT match from screenshots
// ============================================
const colors = {
  bgTop: "#F8F5F0",
  bgBottom: "#EDE5D8",
  textPrimary: "#5C5147",
  textSecondary: "#7A7269",
  logoCoralLight: "#F5A08A",
  logoCoral: "#E8705A",
  logoCoralDark: "#D85A45",
  logoText: "#1A1A1A",
  accentGreen: "#43A047",
  accentRed: "#E53935",
  cardGray: "#E8E4DF",
  cardTan: "#E5D9C3",
  cardWhite: "#FFFFFF",
};

const fontSerif = "'Rockwell', 'Courier New', Georgia, serif";
const fontSans = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Easing
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);
const easeInOutSmooth = Easing.bezier(0.45, 0, 0.55, 1);

const FPS = 60;

// ============================================
// GRADIENT BACKGROUND
// ============================================
const GradientBackground: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(180deg, ${colors.bgTop} 0%, ${colors.bgBottom} 100%)`,
    }}
  />
);

// ============================================
// LABORRX LOGO ICON
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    <div
      style={{
        position: "absolute",
        width: size * 0.95,
        height: size * 0.5,
        left: size * 0.025,
        top: size * 0.25,
        borderRadius: "50%",
        background: colors.logoCoralLight,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.5,
        height: size * 0.95,
        left: size * 0.25,
        top: size * 0.025,
        borderRadius: "50%",
        background: colors.logoCoral,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.38,
        height: size * 0.38,
        left: size * 0.31,
        top: size * 0.31,
        borderRadius: "50%",
        background: colors.logoCoralDark,
      }}
    />
  </div>
);

// ============================================
// SCENE 1: LOGO INTRO (0-3 seconds = 180 frames)
// ============================================
export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale from 80% to 100% with smooth easing
  const logoScale = interpolate(frame, [0, 50], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Fade in
  const logoOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Glow effect
  const glowOpacity = interpolate(frame, [30, 70], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle breathing during hold (50-150)
  const breathing = frame > 50 && frame < 150
    ? 1 + 0.015 * Math.sin(((frame - 50) / 50) * Math.PI)
    : 1;

  // Fade out transition (150-180)
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 150 ? logoOpacity * exitOpacity : logoOpacity;

  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.logoCoral}35 0%, transparent 70%)`,
          opacity: glowOpacity * finalOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* Logo centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale * breathing})`,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: finalOpacity,
        }}
      >
        <LaborRxIcon size={100} />
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: fontSans,
            color: colors.logoText,
            letterSpacing: "-1px",
          }}
        >
          LaborRx
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: HERO (3-10 seconds = 420 frames)
// ============================================
export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Headline spring animation (bouncy)
  const headlineSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 200, mass: 1 },
  });

  const headlineY = interpolate(headlineSpring, [0, 1], [60, 0]);

  // Subtext fade
  const subOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Phone mockup spring (center)
  const phoneSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 150, mass: 1 },
  });

  // Left cards spring (staggered)
  const leftCard1Spring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  const leftCard2Spring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  const leftCard3Spring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  // Right cards spring (staggered)
  const rightCard1Spring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  const rightCard2Spring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  // Decorative shapes
  const shapesOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating animation during hold
  const float = frame > 120 ? 5 * Math.sin(((frame - 120) / 100) * Math.PI * 2) : 0;

  // Exit fade
  const exitOpacity = interpolate(frame, [390, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 390 ? sceneOpacity * exitOpacity : sceneOpacity;

  return (
    <AbsoluteFill style={{ opacity: finalOpacity }}>
      <GradientBackground />

      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.logoCoralLight}50, ${colors.logoCoral}30)`,
          opacity: shapesOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 200,
          bottom: 120,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.logoCoral}25, transparent)`,
          opacity: shapesOpacity,
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
          paddingTop: 100,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textSecondary,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.15,
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Get your<br />shifts together
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 18,
            fontFamily: fontSans,
            color: colors.textSecondary,
            textAlign: "center",
            maxWidth: 450,
            margin: "28px 0 0 0",
            lineHeight: 1.5,
            opacity: subOpacity,
          }}
        >
          Our AI staffing platform helps SNF administrators<br />reduce costs and improve patient care.
        </p>
      </div>

      {/* Phone and UI cards */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - phoneSpring) * 100 + float}px) scale(${0.9 + phoneSpring * 0.1})`,
          opacity: phoneSpring,
        }}
      >
        {/* Left Card 1 - RN list */}
        <div
          style={{
            position: "absolute",
            left: -230,
            top: -20,
            transform: `translateX(${(1 - leftCard1Spring) * -80}px) scale(${0.95 + leftCard1Spring * 0.05})`,
            opacity: leftCard1Spring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              width: 200,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary, marginBottom: 12 }}>RN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Annette Black</span>
              <span style={{ fontSize: 11, color: colors.accentGreen, marginLeft: "auto", fontWeight: 600 }}>On time</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Kathryn Murphy</span>
              <span style={{ fontSize: 11, color: colors.accentRed, marginLeft: "auto", fontWeight: 600 }}>Late arrival</span>
            </div>
          </div>
        </div>

        {/* Left Card 2 - Shift Pickup */}
        <div
          style={{
            position: "absolute",
            left: -210,
            top: 130,
            transform: `scale(${0.9 + leftCard2Spring * 0.1})`,
            opacity: leftCard2Spring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 24,
              padding: "10px 16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E0E0E0" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: colors.logoCoral, background: `${colors.logoCoral}15`, padding: "3px 8px", borderRadius: 4 }}>RN</span>
            <span style={{ fontSize: 12, color: colors.textPrimary }}>Robert Murphy</span>
            <span style={{ fontSize: 11, color: colors.logoCoral, fontWeight: 600 }}>Shift Pickup</span>
          </div>
        </div>

        {/* Left Card 3 - Approved */}
        <div
          style={{
            position: "absolute",
            left: -170,
            top: 195,
            transform: `scale(${0.9 + leftCard3Spring * 0.1})`,
            opacity: leftCard3Spring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 24,
              padding: "10px 16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E0E0E0" }} />
            <span style={{ fontSize: 12, color: colors.textPrimary }}>Darrell Steward</span>
            <span style={{ fontSize: 11, color: colors.accentGreen, fontWeight: 600 }}>Approved</span>
          </div>
        </div>

        {/* Phone */}
        <div
          style={{
            width: 250,
            height: 500,
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
              backgroundColor: "#FDF8F3",
              borderRadius: 34,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 80 }}>👩‍⚕️</div>
          </div>
        </div>

        {/* Right Card 1 - Date picker */}
        <div
          style={{
            position: "absolute",
            right: -210,
            top: -10,
            transform: `translateX(${(1 - rightCard1Spring) * 80}px) scale(${0.95 + rightCard1Spring * 0.05})`,
            opacity: rightCard1Spring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              width: 160,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>📅</span>
              <span style={{ fontSize: 13, color: colors.textPrimary }}>Oct 18, 2023</span>
              <span style={{ marginLeft: "auto", color: colors.textSecondary }}>⌄</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>☀️</span>
              <span style={{ fontSize: 13, color: colors.textPrimary }}>7AM-3PM</span>
              <span style={{ marginLeft: "auto", color: colors.textSecondary }}>⌄</span>
            </div>
          </div>
        </div>

        {/* Right Card 2 - Unit info */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: 120,
            transform: `translateX(${(1 - rightCard2Spring) * 80}px) scale(${0.95 + rightCard2Spring * 0.05})`,
            opacity: rightCard2Spring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              width: 180,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Unit 3</span>
              <span style={{ marginLeft: 8, fontSize: 12, color: colors.logoCoral }}>✦</span>
            </div>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 12, textAlign: "center" }}>
              <span style={{ color: colors.accentGreen, fontWeight: 600 }}>RN 1/1</span>
              <span style={{ marginLeft: 12, color: colors.logoCoral, fontWeight: 600 }}>LPN 1/1</span>
            </div>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 8 }}>Nurses</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Cody Fisher</span>
              <span style={{ fontSize: 10, color: colors.cardWhite, background: colors.accentGreen, padding: "2px 6px", borderRadius: 4, marginLeft: "auto" }}>RN</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E0E0E0" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Ethan Davis</span>
              <span style={{ fontSize: 10, color: colors.cardWhite, background: colors.logoCoral, padding: "2px 6px", borderRadius: 4, marginLeft: "auto" }}>LPN</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: TEXT MORPHING (10-20 seconds = 600 frames)
// "Scheduling staff drains energy and time."
// "LaborRX offers a professional... / cost-efficient... / smooth platform"
// ============================================
export const RotatingTextScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // First line fade in
  const line1Opacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Second line "LaborRX offers a" fade in
  const line2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Word timing:
  // "professional" (100-280): 3 seconds hold
  // Transition (250-310): 1 second crossfade
  // "cost-efficient" (280-460): 3 seconds hold
  // Transition (430-490): 1 second crossfade
  // "smooth platform" (460-600): final state

  // Professional word
  const professionalOpacity = interpolate(frame, [100, 130, 250, 310], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutSmooth,
  });
  const professionalScale = interpolate(frame, [100, 130], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Cost-efficient word
  const costEfficientOpacity = interpolate(frame, [280, 310, 430, 490], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutSmooth,
  });
  const costEfficientScale = interpolate(frame, [280, 310], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Smooth platform (final)
  const smoothOpacity = interpolate(frame, [460, 500], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const smoothScale = interpolate(frame, [460, 500], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [570, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 570 ? sceneOpacity * exitOpacity : sceneOpacity;

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
          padding: "0 100px",
        }}
      >
        {/* First line */}
        <h1
          style={{
            fontSize: 58,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textSecondary,
            margin: 0,
            lineHeight: 1.35,
            fontStyle: "italic",
            opacity: line1Opacity,
          }}
        >
          Scheduling staff drains<br />energy and time.
        </h1>

        {/* Second line with rotating word */}
        <h1
          style={{
            fontSize: 58,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textSecondary,
            margin: "25px 0 0 0",
            lineHeight: 1.35,
            fontStyle: "italic",
            opacity: line2Opacity,
          }}
        >
          LaborRX offers a{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            {/* Professional */}
            <span
              style={{
                opacity: professionalOpacity,
                transform: `scale(${professionalScale})`,
                display: "inline-block",
              }}
            >
              professional...
            </span>

            {/* Cost-efficient */}
            <span
              style={{
                position: "absolute",
                left: 0,
                opacity: costEfficientOpacity,
                transform: `scale(${costEfficientScale})`,
                whiteSpace: "nowrap",
              }}
            >
              cost-efficient...
            </span>

            {/* Smooth platform */}
            <span
              style={{
                position: "absolute",
                left: 0,
                opacity: smoothOpacity,
                transform: `scale(${smoothScale})`,
                whiteSpace: "nowrap",
              }}
            >
              smooth platform.
            </span>
          </span>
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: COMPARISON (20-28 seconds = 480 frames)
// ============================================
export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Headline
  const headlineOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // LEFT CARD - slides in from left with spring
  const leftCardSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 150, mass: 1 },
  });

  // Left card items (staggered, 0.3s = 18 frames each)
  const getLeftItemSpring = (index: number) => {
    return spring({
      frame: frame - (70 + index * 18),
      fps,
      config: { damping: 12, stiffness: 200, mass: 0.7 },
    });
  };

  // RIGHT CARD - slides in from right (0.5s after left starts = 30 frames)
  const rightCardSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 15, stiffness: 150, mass: 1 },
  });

  // Right card items (staggered)
  const getRightItemSpring = (index: number) => {
    return spring({
      frame: frame - (110 + index * 18),
      fps,
      config: { damping: 12, stiffness: 200, mass: 0.7 },
    });
  };

  // Floating animation
  const float1 = frame > 150 ? 4 * Math.sin(((frame - 150) / 120) * Math.PI * 2) : 0;
  const float2 = frame > 180 ? -4 * Math.sin(((frame - 180) / 120) * Math.PI * 2) : 0;

  // Exit fade
  const exitOpacity = interpolate(frame, [450, 480], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 450 ? sceneOpacity * exitOpacity : sceneOpacity;

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
          justifyContent: "flex-start",
          height: "100%",
          paddingTop: 50,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: fontSerif,
            color: colors.textPrimary,
            textAlign: "center",
            margin: "0 0 35px 0",
            opacity: headlineOpacity,
          }}
        >
          Your SNF. You choose the outcome.
        </h1>

        {/* Cards */}
        <div style={{ display: "flex", gap: 35, alignItems: "flex-start" }}>
          {/* Reactive Card */}
          <div
            style={{
              width: 400,
              backgroundColor: colors.cardGray,
              borderRadius: 24,
              padding: 32,
              transform: `translateX(${(1 - leftCardSpring) * -150}px) translateY(${float1}px)`,
              opacity: leftCardSpring,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <div style={{ fontSize: 20, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Minus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
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
            {reactiveItems.map((item, i) => {
              const itemSpring = getLeftItemSpring(i);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    padding: "14px 18px",
                    backgroundColor: colors.cardWhite,
                    borderRadius: 28,
                    transform: `rotate(-2deg) scale(${0.9 + itemSpring * 0.1}) translateY(${(1 - itemSpring) * 20}px)`,
                    opacity: itemSpring,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
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
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </span>
                  <span style={{ color: colors.textPrimary, fontStyle: "italic", fontSize: 14, fontFamily: fontSans }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Proactive Card */}
          <div
            style={{
              width: 400,
              backgroundColor: colors.cardTan,
              borderRadius: 24,
              padding: 32,
              transform: `translateX(${(1 - rightCardSpring) * 150}px) translateY(${float2}px)`,
              opacity: rightCardSpring,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <div style={{ fontSize: 20, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Plus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
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
            {proactiveItems.map((item, i) => {
              const itemSpring = getRightItemSpring(i);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    padding: "14px 18px",
                    backgroundColor: colors.cardWhite,
                    borderRadius: 28,
                    transform: `scale(${0.9 + itemSpring * 0.1}) translateY(${(1 - itemSpring) * 20}px)`,
                    opacity: itemSpring,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
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
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ color: colors.textPrimary, fontSize: 14, fontFamily: fontSans }}>
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

// ============================================
// SCENE 5: THANK YOU (28-33 seconds = 300 frames)
// ============================================
export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const sceneOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Scale 95% -> 100%
  const textScale = interpolate(frame, [20, 70], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle floating (1-2px up/down, slow)
  const floatY = frame > 70 ? 2 * Math.sin(((frame - 70) / 80) * Math.PI) : 0;

  // Subtle breathing
  const breathing = frame > 70 ? 1 + 0.008 * Math.sin(((frame - 70) / 60) * Math.PI) : 1;

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
        <h1
          style={{
            fontSize: 90,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textPrimary,
            margin: 0,
            transform: `scale(${textScale * breathing}) translateY(${floatY}px)`,
          }}
        >
          Thank you.
        </h1>
      </div>
    </AbsoluteFill>
  );
};
