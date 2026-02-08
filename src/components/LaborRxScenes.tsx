import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig, Img, staticFile } from "remotion";

// ============================================
// DESIGN TOKENS - EXACT match from screenshots
// ============================================
const colors = {
  // Background gradient (cream/beige from screenshots)
  bgTop: "#F8F5F0",
  bgBottom: "#EDE5D8",
  // Text colors (exact from screenshots)
  textPrimary: "#5C5147",
  textSecondary: "#7A7269",
  // Logo colors (exact coral/orange from logo screenshot)
  logoCoralLight: "#F5A08A",
  logoCoral: "#E8705A",
  logoCoralDark: "#D85A45",
  logoText: "#1A1A1A",
  // Accent colors (exact from comparison screenshot)
  accentGreen: "#43A047",
  accentRed: "#E53935",
  // Card backgrounds (exact from comparison screenshot)
  cardGray: "#E8E4DF",
  cardTan: "#E5D9C3",
  cardWhite: "#FFFFFF",
};

// Font - Serif font matching screenshots (slab-serif style)
const fontSerif = "'Rockwell', 'Courier New', Georgia, serif";
const fontSans = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Easing functions for smooth, trendy animations
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);
const easeOutBounce = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);

const FPS = 60;

// ============================================
// GRADIENT BACKGROUND - Exact from screenshots
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
// LABORRX LOGO ICON - Exact from screenshot
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    {/* Horizontal ellipse (lighter coral) */}
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
    {/* Vertical ellipse (main coral) */}
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
    {/* Center intersection (darker) */}
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
// SCENE 1: LOGO INTRO (0-3 seconds)
// Exact match to logo screenshot
// ============================================
export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in logo with scale animation (0.8 -> 1.0)
  const logoOpacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const logoScale = interpolate(frame, [0, 45], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle glow pulse
  const glowOpacity = interpolate(frame, [30, 60], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Gentle breathing during hold
  const breathing = frame > 60 ? 1 + 0.02 * Math.sin(((frame - 60) / 60) * Math.PI) : 1;

  // Exit fade
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 150 ? exitOpacity : logoOpacity;

  return (
    <AbsoluteFill>
      <GradientBackground />

      {/* Subtle glow behind logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.logoCoral}30 0%, transparent 70%)`,
          opacity: glowOpacity * finalOpacity,
          filter: "blur(30px)",
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
          gap: 20,
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
// SCENE 2: HERO - "Get your shifts together"
// Exact match to hero screenshot
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

  // Headline animation - fade + slide up
  const headlineOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const headlineY = interpolate(frame, [15, 60], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subheadline
  const subOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Phone mockup with spring
  const phoneSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  // Left cards spring
  const leftCardsSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // Right cards spring
  const rightCardsSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // Decorative shapes
  const shapesOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Floating animation during hold
  const float = frame > 120 ? 4 * Math.sin(((frame - 120) / 120) * Math.PI * 2) : 0;

  // Exit
  const exitOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 270 ? exitOpacity : sceneOpacity;

  return (
    <AbsoluteFill style={{ opacity: finalOpacity }}>
      <GradientBackground />

      {/* Decorative background shapes - peach/coral circles */}
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

      {/* Main content - centered */}
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
        {/* Headline - exact from screenshot */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textSecondary,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.15,
            opacity: headlineOpacity,
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

      {/* Phone and UI cards section */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - phoneSpring) * 80 + float}px)`,
          opacity: phoneSpring,
        }}
      >
        {/* Left UI Card - RN list */}
        <div
          style={{
            position: "absolute",
            left: -220,
            top: -10,
            transform: `translateX(${(1 - leftCardsSpring) * -60}px)`,
            opacity: leftCardsSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              width: 190,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary, marginBottom: 10 }}>RN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E8E8E8" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Annette Black</span>
              <span style={{ fontSize: 10, color: colors.accentGreen, marginLeft: "auto", fontWeight: 500 }}>On time</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E8E8E8" }} />
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Kathryn Murphy</span>
              <span style={{ fontSize: 10, color: colors.accentRed, marginLeft: "auto", fontWeight: 500 }}>Late arrival</span>
            </div>
          </div>
        </div>

        {/* Left badge - Shift Pickup */}
        <div
          style={{
            position: "absolute",
            left: -200,
            top: 140,
            transform: `scale(${leftCardsSpring})`,
            opacity: leftCardsSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 20,
              padding: "8px 14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#E8E8E8" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: colors.logoCoral, background: `${colors.logoCoral}15`, padding: "2px 6px", borderRadius: 4 }}>RN</span>
            <span style={{ fontSize: 11, color: colors.textPrimary }}>Robert Murphy</span>
            <span style={{ fontSize: 10, color: colors.logoCoral, fontWeight: 500 }}>Shift Pickup</span>
          </div>
        </div>

        {/* Approved badge */}
        <div
          style={{
            position: "absolute",
            left: -160,
            top: 200,
            transform: `scale(${leftCardsSpring})`,
            opacity: leftCardsSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 20,
              padding: "8px 14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#E8E8E8" }} />
            <span style={{ fontSize: 11, color: colors.textPrimary }}>Darrell Steward</span>
            <span style={{ fontSize: 10, color: colors.accentGreen, fontWeight: 500 }}>Approved</span>
          </div>
        </div>

        {/* Phone device */}
        <div
          style={{
            width: 240,
            height: 480,
            backgroundColor: "#1a1a1a",
            borderRadius: 36,
            padding: 6,
            boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FDF8F3",
              borderRadius: 32,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 60 }}>👩‍⚕️</div>
          </div>
        </div>

        {/* Right UI Card - Date/Time picker */}
        <div
          style={{
            position: "absolute",
            right: -200,
            top: 0,
            transform: `translateX(${(1 - rightCardsSpring) * 60}px)`,
            opacity: rightCardsSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              width: 150,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>📅</span>
              <span style={{ fontSize: 12, color: colors.textPrimary }}>Oct 18, 2023</span>
              <span style={{ marginLeft: "auto", color: colors.textSecondary }}>⌄</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>☀️</span>
              <span style={{ fontSize: 12, color: colors.textPrimary }}>7AM-3PM</span>
              <span style={{ marginLeft: "auto", color: colors.textSecondary }}>⌄</span>
            </div>
          </div>
        </div>

        {/* Right UI Card - Unit info */}
        <div
          style={{
            position: "absolute",
            right: -210,
            top: 120,
            transform: `translateX(${(1 - rightCardsSpring) * 60}px)`,
            opacity: rightCardsSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.cardWhite,
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              width: 170,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>Unit 3</span>
              <span style={{ marginLeft: 6, fontSize: 11, color: colors.logoCoral }}>✦</span>
            </div>
            <div style={{ fontSize: 10, color: colors.textSecondary, marginBottom: 10, textAlign: "center" }}>
              <span style={{ color: colors.accentGreen, fontWeight: 500 }}>RN 1/1</span>
              <span style={{ marginLeft: 10, color: colors.logoCoral, fontWeight: 500 }}>LPN 1/1</span>
            </div>
            <div style={{ fontSize: 10, color: colors.textSecondary, marginBottom: 6 }}>Nurses</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E8E8E8" }} />
              <span style={{ fontSize: 11, color: colors.textPrimary }}>Cody Fisher</span>
              <span style={{ fontSize: 9, color: colors.cardWhite, background: colors.accentGreen, padding: "1px 5px", borderRadius: 3, marginLeft: "auto" }}>RN</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E8E8E8" }} />
              <span style={{ fontSize: 11, color: colors.textPrimary }}>Ethan Davis</span>
              <span style={{ fontSize: 9, color: colors.cardWhite, background: colors.logoCoral, padding: "1px 5px", borderRadius: 3, marginLeft: "auto" }}>LPN</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: TEXT WITH ROTATING WORD
// "Scheduling staff drains energy and time.
// LaborRX offers a professional... / cost-efficient... / smooth... platform"
// ============================================
export const RotatingTextScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // First two lines fade in
  const line1Opacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const line1Y = interpolate(frame, [20, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Third line "LaborRX offers a" appears
  const line2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Rotating words: professional, cost-efficient, smooth
  // Each word shows for ~120 frames (2 seconds)
  const words = ["professional", "cost-efficient", "smooth"];
  const wordStartFrame = 100;
  const wordDuration = 120; // 2 seconds per word

  const getWordState = (wordIndex: number) => {
    const wordStart = wordStartFrame + wordIndex * wordDuration;
    const wordEnd = wordStart + wordDuration;

    // Fade in
    const fadeIn = interpolate(frame, [wordStart, wordStart + 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });

    // Fade out (not for last word until "platform" appears)
    const fadeOut = wordIndex < words.length - 1
      ? interpolate(frame, [wordEnd - 30, wordEnd], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeInSmooth,
        })
      : 1;

    const slideY = interpolate(frame, [wordStart, wordStart + 30], [15, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });

    return {
      opacity: Math.min(fadeIn, fadeOut),
      y: slideY,
    };
  };

  // "platform" appears after last rotating word
  const platformStartFrame = wordStartFrame + (words.length - 1) * wordDuration + 60;
  const platformOpacity = interpolate(frame, [platformStartFrame, platformStartFrame + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Last word fades out when platform appears
  const lastWordFadeOut = interpolate(frame, [platformStartFrame - 30, platformStartFrame + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [540, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const finalOpacity = frame >= 540 ? exitOpacity : sceneOpacity;

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
        {/* First two lines - static */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 400,
              fontFamily: fontSerif,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            Scheduling staff drains<br />energy and time.
          </h1>
        </div>

        {/* Third line with rotating word */}
        <div
          style={{
            marginTop: 20,
            opacity: line2Opacity,
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 400,
              fontFamily: fontSerif,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            LaborRX offers a{" "}
            <span style={{ position: "relative", display: "inline-block", minWidth: 380 }}>
              {/* Rotating words */}
              {words.map((word, i) => {
                const state = getWordState(i);
                const isLast = i === words.length - 1;
                const actualOpacity = isLast && frame >= platformStartFrame - 30
                  ? state.opacity * lastWordFadeOut
                  : state.opacity;

                return (
                  <span
                    key={i}
                    style={{
                      position: i === 0 ? "relative" : "absolute",
                      left: i === 0 ? 0 : 0,
                      opacity: actualOpacity,
                      transform: `translateY(${state.y}px)`,
                      color: colors.textSecondary,
                    }}
                  >
                    {word}
                    {!isLast || frame < platformStartFrame - 30 ? "..." : ""}
                  </span>
                );
              })}

              {/* "smooth platform" final state */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  opacity: platformOpacity,
                  color: colors.textSecondary,
                }}
              >
                smooth platform.
              </span>
            </span>
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: COMPARISON - Cards appear one by one
// "Your SNF. You choose the outcome."
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

  // Headline animation
  const headlineOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const headlineY = interpolate(frame, [15, 45], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // First card (Reactive) - slides in from left
  const card1Spring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });

  // First card list items cascade
  const getCard1ItemOpacity = (itemIndex: number) => {
    const itemFrame = 80 + itemIndex * 15;
    return interpolate(frame, [itemFrame, itemFrame + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });
  };

  // Second card (Proactive) - slides in from right, AFTER first card
  const card2Spring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });

  // Second card list items cascade
  const getCard2ItemOpacity = (itemIndex: number) => {
    const itemFrame = 210 + itemIndex * 15;
    return interpolate(frame, [itemFrame, itemFrame + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });
  };

  // Floating animation
  const float1 = frame > 150 ? 3 * Math.sin(((frame - 150) / 150) * Math.PI * 2) : 0;
  const float2 = frame > 280 ? -3 * Math.sin(((frame - 280) / 150) * Math.PI * 2) : 0;

  // Exit
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
          justifyContent: "flex-start",
          height: "100%",
          paddingTop: 60,
        }}
      >
        {/* Headline - exact from screenshot */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: fontSerif,
            color: colors.textPrimary,
            textAlign: "center",
            margin: "0 0 40px 0",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Your SNF. You choose the outcome.
        </h1>

        {/* Cards container */}
        <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
          {/* Reactive Card (Left) - appears first */}
          <div
            style={{
              width: 380,
              backgroundColor: colors.cardGray,
              borderRadius: 20,
              padding: 30,
              transform: `translateX(${(1 - card1Spring) * -100}px) translateY(${float1}px)`,
              opacity: card1Spring,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 18, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Minus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  fontFamily: fontSerif,
                  color: colors.accentRed,
                  marginTop: 6,
                }}
              >
                Reactive
              </div>
              <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 10, fontFamily: fontSans }}>
                Scrambling to fill shifts leaves you:
              </div>
            </div>
            {reactiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                  padding: "12px 16px",
                  backgroundColor: colors.cardWhite,
                  borderRadius: 24,
                  transform: `rotate(-2deg)`,
                  opacity: getCard1ItemOpacity(i),
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: colors.accentRed,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </span>
                <span style={{ color: colors.textPrimary, fontStyle: "italic", fontSize: 13, fontFamily: fontSans }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Proactive Card (Right) - appears second */}
          <div
            style={{
              width: 380,
              backgroundColor: colors.cardTan,
              borderRadius: 20,
              padding: 30,
              transform: `translateX(${(1 - card2Spring) * 100}px) translateY(${float2}px)`,
              opacity: card2Spring,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 18, color: colors.textPrimary, fontFamily: fontSans }}>
                Your SNF Plus LaborRX =
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  fontFamily: fontSerif,
                  color: colors.accentGreen,
                  marginTop: 6,
                }}
              >
                Proactive
              </div>
              <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 10, fontFamily: fontSans }}>
                Analyzing your staff needs in real-time means:
              </div>
            </div>
            {proactiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                  padding: "12px 16px",
                  backgroundColor: colors.cardWhite,
                  borderRadius: 24,
                  opacity: getCard2ItemOpacity(i),
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: colors.accentGreen,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: colors.textPrimary, fontSize: 13, fontFamily: fontSans }}>
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
// SCENE 5: THANK YOU
// Exact match to screenshot
// ============================================
export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Text fade in with scale
  const textOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  const textScale = interpolate(frame, [20, 60], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Subtle breathing
  const breathing = frame > 60 ? 1 + 0.01 * Math.sin(((frame - 60) / 90) * Math.PI) : 1;

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
        {/* Thank you text - exact from screenshot */}
        <h1
          style={{
            fontSize: 90,
            fontWeight: 400,
            fontFamily: fontSerif,
            color: colors.textPrimary,
            margin: 0,
            opacity: textOpacity,
            transform: `scale(${textScale * breathing})`,
          }}
        >
          Thank you.
        </h1>
      </div>
    </AbsoluteFill>
  );
};
