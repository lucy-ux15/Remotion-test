import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// ============================================
// EASING FUNCTIONS (as specified)
// ============================================
const easeOutSmooth = Easing.bezier(0.16, 1, 0.3, 1);    // Fade-ins
const easeOutBounce = Easing.bezier(0.34, 1.56, 0.64, 1); // Bouncy entrances
const easeInSmooth = Easing.bezier(0.7, 0, 0.84, 0);      // Exits
const easeSine = Easing.bezier(0.45, 0, 0.55, 1);         // Floats/pulses

// FPS constant for timing calculations
const FPS = 60;

// ============================================
// LaborRx Logo Icon (exact match - coral/salmon X-shape)
// ============================================
const LaborRxIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    {/* Horizontal ellipse */}
    <div
      style={{
        position: "absolute",
        width: size * 0.95,
        height: size * 0.55,
        left: size * 0.025,
        top: size * 0.225,
        borderRadius: "50%",
        background: "#E8705A",
      }}
    />
    {/* Vertical ellipse with overlap effect */}
    <div
      style={{
        position: "absolute",
        width: size * 0.55,
        height: size * 0.95,
        left: size * 0.225,
        top: size * 0.025,
        borderRadius: "50%",
        background: "#E8705A",
        opacity: 0.85,
      }}
    />
    {/* Center intersection darker */}
    <div
      style={{
        position: "absolute",
        width: size * 0.42,
        height: size * 0.42,
        left: size * 0.29,
        top: size * 0.29,
        borderRadius: "50%",
        background: "#D85A45",
        opacity: 0.7,
      }}
    />
  </div>
);

// ============================================
// SCENE 1: Logo Intro (0s - 2s = frames 0-120)
// ============================================
export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline at 60fps:
  // 0.0-0.3s (0-18 frames): Logo fades in 0% to 100%
  // 0.3-1.7s (18-102 frames): Logo holds with subtle pulse 1.0 → 1.02 → 1.0
  // 1.7-2.0s (102-120 frames): Logo scales up 1.0 to 1.3, fades out

  // Fade in: 0-18 frames
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Fade out: 102-120 frames
  const fadeOut = interpolate(frame, [102, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Combined opacity
  const opacity = frame < 102 ? fadeIn : fadeIn * fadeOut;

  // Subtle pulse during hold (18-102 frames) - 2 second loop = 120 frames
  const pulsePhase = ((frame - 18) / 120) * Math.PI * 2;
  const pulse = frame >= 18 && frame < 102
    ? 1 + 0.02 * Math.sin(pulsePhase)
    : 1;

  // Scale up on exit: 102-120 frames
  const exitScale = interpolate(frame, [102, 120], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const scale = frame < 102 ? pulse : exitScale;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <LaborRxIcon size={110} />
        <h1
          style={{
            fontSize: 82,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "#FFFFFF",
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

// ============================================
// SCENE 2: Hero Screen with Phone (2s - 4.5s = frames 0-150 local)
// ============================================
export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline at 60fps (local frame within scene):
  // 2.0-2.5s (0-30): Content fade-in sequence
  //   - 2.0s (0): Headline starts fading in
  //   - 2.15s (9): Subheadline fades in
  //   - 2.3s (18): Button + Phone + UI cards start
  // 2.5-4.3s (30-138): Hold with micro-animations
  // 4.3-4.5s (138-150): Exit - scale 1.0 to 0.95, fade out

  // Background white
  const bgColor = "#FFFFFF";

  // Word-by-word headline animation with stagger
  const words = ["Get", "your", "shifts", "together"];
  const getWordAnim = (index: number) => {
    const startFrame = index * 3; // 0.05s stagger = 3 frames
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutSmooth,
      }),
      y: interpolate(frame, [startFrame, startFrame + 12], [-10, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutSmooth,
      }),
    };
  };

  // Subheadline: starts at 2.15s = frame 9
  const subOpacity = interpolate(frame, [9, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const subY = interpolate(frame, [9, 21], [-10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Button: starts at 2.3s = frame 18
  const buttonOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const buttonScale = interpolate(frame, [18, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Phone: 2.3s = frame 18, Y: +200px → 0, rotate 2deg → 0deg
  const phoneOpacity = interpolate(frame, [18, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneY = interpolate(frame, [18, 48], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });
  const phoneRotation = interpolate(frame, [18, 48], [2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Left UI cards: 2.4s = frame 24
  const leftCardX = interpolate(frame, [24, 42], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });
  const leftCardOpacity = interpolate(frame, [24, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right UI cards: 2.5s = frame 30
  const rightCardX = interpolate(frame, [30, 48], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });
  const rightCardOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hold state micro-animations (30-138 frames)
  // Phone gentle Y float ±3px, 3s loop = 180 frames
  const phoneFloat = frame >= 30 && frame < 138
    ? 3 * Math.sin(((frame - 30) / 180) * Math.PI * 2)
    : 0;

  // UI cards micro-scale pulse
  const cardPulse = frame >= 30 && frame < 138
    ? 1 + 0.02 * Math.sin(((frame - 30) / 120) * Math.PI * 2)
    : 1;

  // Exit animation: 138-150 frames
  const exitScale = interpolate(frame, [138, 150], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });
  const exitOpacity = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const sceneScale = frame >= 138 ? exitScale : 1;
  const sceneOpacity = frame >= 138 ? exitOpacity : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${sceneScale})`,
        opacity: sceneOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Headline - centered, top 15% */}
        <div
          style={{
            position: "absolute",
            top: -380,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {words.map((word, i) => {
              const anim = getWordAnim(i);
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 64,
                    fontWeight: 300,
                    color: "#8B8B8B",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 18,
              color: "#666",
              maxWidth: 500,
              margin: "20px auto 0",
              lineHeight: 1.5,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
            }}
          >
            Our AI staffing platform helps SNF administrators reduce costs and improve patient care.
          </p>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 24,
              opacity: buttonOpacity,
              transform: `scale(${buttonScale})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#E86A4F",
                borderRadius: 30,
              }}
            >
              <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
                Book your Free Demo
              </span>
            </div>
          </div>
        </div>

        {/* Phone mockup - centered */}
        <div
          style={{
            position: "relative",
            marginTop: 80,
            opacity: phoneOpacity,
            transform: `translateY(${phoneY + phoneFloat}px) rotate(${phoneRotation}deg)`,
          }}
        >
          {/* Left UI Card - RN Staff */}
          <div
            style={{
              position: "absolute",
              left: -180,
              top: 60,
              opacity: leftCardOpacity,
              transform: `translateX(${leftCardX}px) scale(${cardPulse})`,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                width: 140,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#E86A4F", marginBottom: 8 }}>RN</div>
              <div style={{ fontSize: 12, color: "#666" }}>Sarah M.</div>
              <div style={{ fontSize: 12, color: "#666" }}>Michael R.</div>
            </div>
          </div>

          {/* Left badge - shift pickup */}
          <div
            style={{
              position: "absolute",
              left: -160,
              top: 200,
              opacity: interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `scale(${interpolate(frame, [30, 42], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOutBounce })})`,
            }}
          >
            <div
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: 20,
                padding: "8px 16px",
                color: "white",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              1 shift pickup
            </div>
          </div>

          {/* Phone device */}
          <div
            style={{
              width: 280,
              height: 560,
              backgroundColor: "#1a1a1a",
              borderRadius: 40,
              padding: 8,
              boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
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
                paddingTop: 40,
              }}
            >
              <LaborRxIcon size={36} />
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2D2D2D", marginTop: 8 }}>
                LaborRx
              </div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                Healthcare Staffing
              </div>
            </div>
          </div>

          {/* Right UI Card - Date picker */}
          <div
            style={{
              position: "absolute",
              right: -180,
              top: 40,
              opacity: rightCardOpacity,
              transform: `translateX(${rightCardX}px) scale(${cardPulse})`,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                width: 150,
              }}
            >
              <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Next Shift</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2D2D2D" }}>Today, 3:00 PM</div>
              <div style={{ fontSize: 12, color: "#E86A4F", marginTop: 4 }}>ICU - Floor 3</div>
            </div>
          </div>

          {/* Right badge - Google rating */}
          <div
            style={{
              position: "absolute",
              right: -150,
              top: 180,
              opacity: interpolate(frame, [36, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: "8px 14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14 }}>⭐</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2D2D2D" }}>4.7</span>
              <span style={{ fontSize: 11, color: "#888" }}>Google</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Comparison Screen (4.5s - 6.5s = frames 0-120 local)
// ============================================
export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline at 60fps:
  // 4.5-5.0s (0-30): Cards entrance
  //   - 4.5s (0): Headline appears
  //   - 4.7s (12): Left card entrance
  //   - 4.85s (21): Right card entrance
  // 5.0-5.3s (30-48): List items cascade
  // 5.3-6.3s (48-108): Hold with micro-animations
  // 6.3-6.5s (108-120): Exit - move up Y: 0 to -100px, fade out

  // Headline: 0-18 frames
  const headlineOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const headlineY = interpolate(frame, [0, 18], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Left card: 12-36 frames, X: -150px → 0, rotation: -5deg → 0deg
  const leftCardOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftCardX = interpolate(frame, [12, 36], [-150, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });
  const leftCardRotation = interpolate(frame, [12, 36], [-5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // Right card: 21-45 frames, X: +150px → 0, rotation: 5deg → 0deg
  const rightCardOpacity = interpolate(frame, [21, 39], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightCardX = interpolate(frame, [21, 45], [150, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });
  const rightCardRotation = interpolate(frame, [21, 45], [5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutBounce,
  });

  // List items cascade: 30-48 frames, 0.08s stagger = ~5 frames
  const getLeftItemAnim = (index: number) => {
    const startFrame = 30 + index * 5;
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      scale: interpolate(frame, [startFrame, startFrame + 10], [0.9, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutSmooth,
      }),
    };
  };

  const getRightItemAnim = (index: number) => {
    const startFrame = 36 + index * 5; // Starts 0.1s after left = 6 frames
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      scale: interpolate(frame, [startFrame, startFrame + 10], [0.9, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutSmooth,
      }),
    };
  };

  // Hold micro-animations: cards gentle Y float ±2px, opposite directions, 2.5s = 150 frames
  const leftFloat = frame >= 48 && frame < 108
    ? 2 * Math.sin(((frame - 48) / 150) * Math.PI * 2)
    : 0;
  const rightFloat = frame >= 48 && frame < 108
    ? -2 * Math.sin(((frame - 48) / 150) * Math.PI * 2)
    : 0;

  // Exit: 108-120 frames, Y: 0 → -100px, fade out
  const exitY = interpolate(frame, [108, 120], [0, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });
  const exitOpacity = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const sceneY = frame >= 108 ? exitY : 0;
  const sceneOpacity = frame >= 108 ? exitOpacity : 1;

  const reactiveItems = [
    "paying premium agency prices",
    "straining already tight budgets",
    "falling behind with compliance",
    "compromising quality of care",
  ];

  const proactiveItems = [
    "The right staff",
    "Are in the right place",
    "At the right time",
    "For the right budget",
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${sceneY}px)`,
        opacity: sceneOpacity,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Headline */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 500,
            fontStyle: "italic",
            color: "#2D2D2D",
            textAlign: "center",
            marginBottom: 50,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily: "Georgia, serif",
          }}
        >
          Your SNF. You choose the outcome.
        </h1>

        {/* Cards container - centered */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          {/* Reactive Card (Left - beige) */}
          <div
            style={{
              width: 460,
              backgroundColor: "#F5F5F0",
              borderRadius: 24,
              padding: 36,
              opacity: leftCardOpacity,
              transform: `translateX(${leftCardX}px) translateY(${leftFloat}px) rotate(${leftCardRotation}deg)`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 20, color: "#2D2D2D" }}>Your SNF Minus LaborRX =</div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#E53935",
                  fontStyle: "italic",
                  marginTop: 8,
                }}
              >
                Reactive
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 12 }}>
                Scrambling to fill shifts leaves you:
              </div>
            </div>
            {reactiveItems.map((item, i) => {
              const anim = getLeftItemAnim(i);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    padding: "14px 18px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    opacity: anim.opacity,
                    transform: `scale(${anim.scale})`,
                  }}
                >
                  <span style={{ color: "#E53935", fontSize: 16, fontWeight: 700 }}>✕</span>
                  <span style={{ color: "#2D2D2D", fontStyle: "italic", fontSize: 14 }}>{item}</span>
                </div>
              );
            })}
          </div>

          {/* Proactive Card (Right - gold/cream) */}
          <div
            style={{
              width: 460,
              backgroundColor: "#F5EFE0",
              borderRadius: 24,
              padding: 36,
              opacity: rightCardOpacity,
              transform: `translateX(${rightCardX}px) translateY(${rightFloat}px) rotate(${rightCardRotation}deg)`,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 20, color: "#2D2D2D" }}>Your SNF Plus LaborRX =</div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#4CAF50",
                  fontStyle: "italic",
                  marginTop: 8,
                }}
              >
                Proactive
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 12 }}>
                Analyzing your staff needs in real-time means:
              </div>
            </div>
            {proactiveItems.map((item, i) => {
              const anim = getRightItemAnim(i);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    padding: "14px 18px",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 12,
                    opacity: anim.opacity,
                    transform: `scale(${anim.scale})`,
                  }}
                >
                  <span style={{ color: "#4CAF50", fontSize: 16, fontWeight: 700 }}>✓</span>
                  <span style={{ color: "#2D2D2D", fontSize: 14 }}>{item}</span>
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
// SCENE 4: Reports Dashboard (6.5s - 8.5s = frames 0-120 local)
// ============================================
export const ReportsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline at 60fps:
  // 6.5-7.2s (0-42): Dashboard build-up
  //   - 6.5s (0): Header section appears
  //   - 6.7s (12): Top metrics cards cascade (left to right)
  //   - 7.0s (30): Left breakdown section
  //   - 7.2s (42): Right breakdown section with progress bars
  // 7.2-8.3s (42-108): Hold with subtle animations
  // 8.3-8.5s (108-120): Exit - scale 1.0 → 1.1, fade out (zoom in effect)

  // Header: 0-18 frames
  const headerOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const headerY = interpolate(frame, [0, 18], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Metrics cards cascade: 12-42 frames, 0.1s stagger = 6 frames
  const getMetricAnim = (index: number) => {
    const startFrame = 12 + index * 6;
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      y: interpolate(frame, [startFrame, startFrame + 12], [-30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutBounce,
      }),
    };
  };

  // Left breakdown: 30-48 frames
  const leftBreakdownOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const leftBreakdownScale = interpolate(frame, [30, 42], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Right breakdown: 42-60 frames
  const rightBreakdownOpacity = interpolate(frame, [42, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });

  // Progress bars: 42-78 frames (0.6s duration)
  const getProgressWidth = (index: number, maxWidth: number) => {
    const startFrame = 42 + index * 6;
    return interpolate(frame, [startFrame, startFrame + 36], [0, maxWidth], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutSmooth,
    });
  };

  // Number shimmer effect during hold
  const shimmer = frame >= 42 && frame < 108
    ? 0.95 + 0.05 * Math.sin(((frame - 42) / 60) * Math.PI * 2)
    : 1;

  // Exit: 108-120 frames, scale 1.0 → 1.1, fade out
  const exitScale = interpolate(frame, [108, 120], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });
  const exitOpacity = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInSmooth,
  });

  const sceneScale = frame >= 108 ? exitScale : 1;
  const sceneOpacity = frame >= 108 ? exitOpacity : 1;

  const stats = [
    { label: "Total Call-offs", value: "342", change: "-12%", isNegative: true },
    { label: "Auto-Approval Rate", value: "78.5%", change: "+5.2%", isNegative: false },
    { label: "Shifts Replaced", value: "321", change: "-18%", isNegative: true },
    { label: "Unfilled Shifts", value: "8", change: "+33%", isNegative: false },
  ];

  const progressBars = [
    { label: "User Browse", value: "138", percent: 43 },
    { label: "Admin Assigned", value: "122", percent: 38 },
    { label: "Auto-Filled", value: "61", percent: 19 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${sceneScale})`,
        opacity: sceneOpacity,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
            <LaborRxIcon size={32} />
            <span style={{ fontSize: 18, fontWeight: 600, color: "#2D2D2D" }}>Sunrise Health Center</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#2D2D2D", margin: 0 }}>Reports</h2>
        </div>

        {/* Dashboard container */}
        <div
          style={{
            width: 1000,
            backgroundColor: "#F9F9F9",
            borderRadius: 24,
            padding: 32,
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            {stats.map((stat, i) => {
              const anim = getMetricAnim(i);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 20,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px)`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: "#2D2D2D", opacity: shimmer }}>
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: stat.isNegative ? "#E53935" : "#4CAF50",
                      marginTop: 8,
                      fontWeight: 500,
                    }}
                  >
                    {stat.change} vs last week
                  </div>
                </div>
              );
            })}
          </div>

          {/* Breakdown sections */}
          <div style={{ display: "flex", gap: 20 }}>
            {/* Left: Approved Call-offs Breakdown */}
            <div
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                opacity: leftBreakdownOpacity,
                transform: `scale(${leftBreakdownScale})`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600, color: "#2D2D2D", marginBottom: 20 }}>
                Approved Call-offs Breakdown
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#4CAF50", opacity: shimmer }}>342</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Auto-Approved</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#2196F3", opacity: shimmer }}>62</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Manual Approved</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#E53935", opacity: shimmer }}>10</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Denied</div>
                </div>
              </div>
            </div>

            {/* Right: How Shifts Were Replaced */}
            <div
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                opacity: rightBreakdownOpacity,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600, color: "#2D2D2D", marginBottom: 20 }}>
                How Shifts Were Replaced
              </div>
              {progressBars.map((bar, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#666" }}>{bar.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2D2D2D" }}>{bar.value}</span>
                  </div>
                  <div style={{ height: 8, backgroundColor: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${getProgressWidth(i, bar.percent)}%`,
                        height: "100%",
                        backgroundColor: i === 0 ? "#4CAF50" : i === 1 ? "#2196F3" : "#E86A4F",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Four Feature Cards Finale (8.5s - 10s = frames 0-90 local)
// ============================================
export const FeatureCardsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline at 60fps:
  // 8.5-9.3s (0-48): Cards entrance sequence
  //   - 8.5s (0): Background fades from white to beige
  //   - 8.7s (12): TOP-LEFT card appears
  //   - 8.8s (18): TOP-RIGHT card appears
  //   - 8.9s (24): BOTTOM-LEFT card appears
  //   - 9.0s (30): BOTTOM-RIGHT card appears
  // 9.0-9.3s (30-48): Card content reveals (bullets cascade)
  // 9.3-9.7s (48-72): Hold with micro-interactions
  // 9.7-10.0s (72-90): Final polish - scale 1.0 → 1.02, brightness flash

  // Background fade: 0-12 frames
  const bgProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutSmooth,
  });
  const bgColor = `rgb(${255 - bgProgress * 10}, ${255 - bgProgress * 7}, ${255 - bgProgress * 15})`;

  // Card entrance animations
  const getCardAnim = (index: number) => {
    const delays = [12, 18, 24, 30]; // 0.1s stagger = 6 frames
    const rotations = [-3, 3, -2, 2];
    const startFrame = delays[index];

    return {
      opacity: interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      scale: interpolate(frame, [startFrame, startFrame + 18], [0.8, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutBounce,
      }),
      y: interpolate(frame, [startFrame, startFrame + 18], [-30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutBounce,
      }),
      rotation: interpolate(frame, [startFrame, startFrame + 18], [rotations[index], 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutBounce,
      }),
    };
  };

  // Bullet cascade: 30-48 frames, 0.06s stagger = ~4 frames
  const getBulletAnim = (cardIndex: number, bulletIndex: number) => {
    const cardDelay = 30 + cardIndex * 3;
    const startFrame = cardDelay + bulletIndex * 4;
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      x: interpolate(frame, [startFrame, startFrame + 10], [-10, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOutSmooth,
      }),
    };
  };

  // Hold micro-animations: 48-72 frames
  // Top row: Y float ±2px, 2.5s = 150 frames
  // Bottom row: opposite phase
  const getCardFloat = (index: number) => {
    if (frame < 48 || frame > 72) return 0;
    const phase = index < 2 ? 0 : Math.PI;
    return 2 * Math.sin(((frame - 48) / 150) * Math.PI * 2 + phase);
  };

  // Breathing: 1.0 → 1.005 → 1.0, 3s = 180 frames per card
  const getCardBreath = (index: number) => {
    if (frame < 48) return 1;
    const offset = index * 45; // Offset phase for each card
    return 1 + 0.005 * Math.sin(((frame - 48 + offset) / 180) * Math.PI * 2);
  };

  // Final polish: 72-90 frames, scale 1.0 → 1.02
  const finalScale = interpolate(frame, [72, 84], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeSine,
  });

  // Brightness flash
  const brightness = interpolate(frame, [72, 78, 84], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    {
      icon: "💰",
      title: "Reduce Labor Costs",
      color: "#E8F5E9",
      items: [
        "Compare costs between per diem and agency options",
        "Adjust staffing based on acuity and census",
        "Prevent overtime through our tracking system",
        "Monitor labor costs on our user-friendly dashboard",
      ],
    },
    {
      icon: "⏰",
      title: "Maximize Administrative Time",
      color: "#E3F2FD",
      items: [
        "Automate your shift posting and time tracking",
        "Communicate efficiently with staff through mobile app",
        "View all labor spending on our centralized dashboard",
      ],
    },
    {
      icon: "📋",
      title: "Increase Staffing Efficiency",
      color: "#FFF8E1",
      items: [
        "Predict upcoming shifts",
        "Automate your shift posting",
        "Choose from your internal per diem pools",
        "Distribute shifts easily and quickly",
      ],
    },
    {
      icon: "😊",
      title: "Increase Staff Satisfaction",
      color: "#FCE4EC",
      items: [
        "Provide mobile app for shift preference selection",
        "Get rid of mandatory overtime",
        "Create predictable shift schedules",
        "Reduce last-minute schedule changes",
      ],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${frame >= 72 ? finalScale : 1})`,
        filter: `brightness(${brightness})`,
      }}
    >
      {/* 2x2 Grid - centered */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: 1000,
        }}
      >
        {features.map((feature, i) => {
          const anim = getCardAnim(i);
          const float = getCardFloat(i);
          const breath = getCardBreath(i);

          return (
            <div
              key={i}
              style={{
                backgroundColor: feature.color,
                borderRadius: 20,
                padding: 28,
                opacity: anim.opacity,
                transform: `translateY(${anim.y + float}px) scale(${anim.scale * breath}) rotate(${anim.rotation}deg)`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#2D2D2D",
                  marginBottom: 16,
                  margin: 0,
                  marginTop: 0,
                  lineHeight: 1.2,
                }}
              >
                {feature.title}
              </h3>
              <div style={{ marginTop: 16 }}>
                {feature.items.map((item, j) => {
                  const bulletAnim = getBulletAnim(i, j);
                  return (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        marginBottom: 10,
                        opacity: bulletAnim.opacity,
                        transform: `translateX(${bulletAnim.x}px)`,
                      }}
                    >
                      <span style={{ color: "#4CAF50", fontSize: 14, marginTop: 2, fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: 14, color: "#444", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
