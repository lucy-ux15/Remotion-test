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

// Helper for staggered spring animations
const useStaggeredSpring = (
  frame: number,
  fps: number,
  delay: number,
  config = { damping: 15, stiffness: 200 }
) => {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
  });
};

// ---- Sub-components for UI cards ----

// Avatar circle
const Avatar: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 32,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
    }}
  />
);

// Status badge
const Badge: React.FC<{ text: string; color: string; bg?: string }> = ({
  text,
  color,
  bg,
}) => (
  <span
    style={{
      fontFamily: interFamily,
      fontSize: 12,
      fontWeight: 600,
      color,
      background: bg || `${color}18`,
      padding: "3px 10px",
      borderRadius: 4,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// Small blue dot indicator
const BlueDot: React.FC = () => (
  <div
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#4a90d9",
      flexShrink: 0,
    }}
  />
);

// Role badge (RN, LPN)
const RoleBadge: React.FC<{ role: string; color: string }> = ({
  role,
  color,
}) => (
  <span
    style={{
      fontFamily: interFamily,
      fontSize: 11,
      fontWeight: 600,
      color: "white",
      background: color,
      padding: "2px 8px",
      borderRadius: 4,
    }}
  >
    {role}
  </span>
);

// ---- RN Status Card (top-left) ----
const RNStatusCard: React.FC = () => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: "14px 18px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: 290,
    }}
  >
    <div
      style={{
        fontFamily: interFamily,
        fontSize: 14,
        fontWeight: 700,
        color: "#1a1a1a",
        marginBottom: 12,
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: 8,
      }}
    >
      RN
    </div>
    {/* Row 1 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <Avatar color="#c4a882" />
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Annette Black
      </span>
      <BlueDot />
      <Badge text="On time" color="#28a745" />
    </div>
    {/* Row 2 */}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Avatar color="#7b9ec4" />
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Kathryn Murphy
      </span>
      <BlueDot />
      <Badge text="Late arrival" color="#e67e22" />
    </div>
  </div>
);

// ---- Shift Pickup Card (bottom-left) ----
const ShiftPickupCard: React.FC = () => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: "14px 18px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: 290,
    }}
  >
    {/* Row 1 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <Avatar color="#8e7cc3" />
      <span
        style={{ fontFamily: interFamily, fontSize: 11, fontWeight: 600, color: "#28a745", marginRight: 4 }}
      >
        RN
      </span>
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Robert Murphy
      </span>
      <Badge text="Shift Pickup" color="#28a745" />
    </div>
    {/* Row 2 - indented */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        paddingLeft: 20,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderLeft: "2px solid #ddd",
          borderBottom: "2px solid #ddd",
          borderRadius: "0 0 0 6px",
          marginRight: 4,
        }}
      />
      <Avatar color="#a0c4a0" />
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Darrell Steward
      </span>
      <Badge text="Approved" color="#28a745" />
    </div>
  </div>
);

// ---- Calendar Card (top-right) ----
const CalendarCard: React.FC = () => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: "14px 18px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: 200,
    }}
  >
    {/* Date row */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <span style={{ fontSize: 16 }}>📅</span>
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 14,
          fontWeight: 500,
          color: "#333",
          flex: 1,
        }}
      >
        Oct 18, 2023
      </span>
      <span style={{ color: "#aaa", fontSize: 12 }}>▾</span>
    </div>
    {/* Time row */}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 16 }}>☀️</span>
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 14,
          fontWeight: 500,
          color: "#333",
          flex: 1,
        }}
      >
        7AM-3PM
      </span>
      <span style={{ color: "#aaa", fontSize: 12 }}>▾</span>
    </div>
  </div>
);

// ---- Unit Card (bottom-right) ----
const UnitCard: React.FC = () => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: "14px 18px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: 220,
      border: "1.5px solid #e0daf0",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginBottom: 4,
      }}
    >
      <span style={{ color: "#8b7ec8", fontSize: 14 }}>◆</span>
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 14,
          fontWeight: 700,
          color: "#333",
        }}
      >
        Unit 3
      </span>
    </div>
    {/* RN/LPN counts */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 14,
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 12,
          color: "#28a745",
          fontWeight: 600,
        }}
      >
        RN 1 / 1
      </span>
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 12,
          color: "#4a90d9",
          fontWeight: 600,
        }}
      >
        LPN 1 / 1
      </span>
    </div>
    {/* Nurses label */}
    <div
      style={{
        fontFamily: interFamily,
        fontSize: 11,
        color: "#999",
        marginBottom: 8,
      }}
    >
      Nurses
    </div>
    {/* Nurse rows */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
      }}
    >
      <Avatar color="#5a8ec4" size={26} />
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Cody Fisher
      </span>
      <RoleBadge role="RN" color="#28a745" />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Avatar color="#7b6cb0" size={26} />
      <span
        style={{ fontFamily: interFamily, fontSize: 13, color: "#333", flex: 1 }}
      >
        Ethan Davis
      </span>
      <RoleBadge role="LPN" color="#8b7ec8" />
    </div>
  </div>
);

// ---- Phone Mockup ----
const PhoneMockup: React.FC = () => (
  <div
    style={{
      width: 260,
      height: 420,
      borderRadius: 36,
      background: "#1a1a1a",
      padding: 8,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      position: "relative",
    }}
  >
    {/* Notch */}
    <div
      style={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 80,
        height: 20,
        borderRadius: "0 0 12px 12px",
        background: "#1a1a1a",
        zIndex: 2,
      }}
    />
    {/* Screen with gradient placeholder for nurse image */}
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 28,
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #e8c9a0 0%, #c4956a 30%, #2b8a8a 50%, #1a6b6b 70%, #d4a574 100%)",
        position: "relative",
      }}
    >
      {/* Simulated nurse figures */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          width: 80,
          height: 220,
          background:
            "linear-gradient(180deg, #6b4a3a 0%, #2b9090 30%, #1a7575 100%)",
          borderRadius: "40px 40px 0 0",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "15%",
          width: 80,
          height: 200,
          background:
            "linear-gradient(180deg, #4a3a2a 0%, #2b9090 30%, #1a7575 100%)",
          borderRadius: "40px 40px 0 0",
          opacity: 0.6,
        }}
      />
    </div>
  </div>
);

// ---- Main Hero Screen Component ----
export const HeroScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall scene fade in
  const sceneFade = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Headline spring up
  const headlineProgress = useStaggeredSpring(frame, fps, 8, {
    damping: 14,
    stiffness: 180,
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [60, 0]);
  const headlineOpacity = interpolate(headlineProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtext fade
  const subtextOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Phone scale in
  const phoneProgress = useStaggeredSpring(frame, fps, 30, {
    damping: 16,
    stiffness: 160,
  });
  const phoneScale = interpolate(phoneProgress, [0, 1], [0.7, 1]);
  const phoneOpacity = interpolate(phoneProgress, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Left cards pop in
  const rnCardProgress = useStaggeredSpring(frame, fps, 45);
  const shiftCardProgress = useStaggeredSpring(frame, fps, 60);

  // Right cards pop in
  const calendarProgress = useStaggeredSpring(frame, fps, 52);
  const unitCardProgress = useStaggeredSpring(frame, fps, 66);

  // Background blobs drift
  const blob1X = interpolate(frame, [0, 420], [-10, 10]);
  const blob1Y = interpolate(frame, [0, 420], [5, -5]);
  const blob2X = interpolate(frame, [0, 420], [8, -8]);
  const blob2Y = interpolate(frame, [0, 420], [-5, 5]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #faf8f5 0%, #ede0cc 100%)",
        opacity: sceneFade,
      }}
    >
      {/* Decorative coral blobs */}
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,150,110,0.3) 0%, rgba(255,120,80,0.1) 50%, transparent 70%)",
          bottom: 60,
          left: 280,
          transform: `translate(${blob1X}px, ${blob1Y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(230,90,60,0.25) 0%, rgba(230,90,60,0.08) 50%, transparent 70%)",
          bottom: 20,
          left: 420,
          transform: `translate(${blob2X}px, ${blob2Y}px)`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 60,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 80,
            fontWeight: 400,
            color: "#2a2622",
            textAlign: "center",
            lineHeight: 1.15,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            marginBottom: 16,
          }}
        >
          Get your
          <br />
          shifts together
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: interFamily,
            fontSize: 20,
            color: "#6b6560",
            textAlign: "center",
            maxWidth: 600,
            opacity: subtextOpacity,
            marginBottom: 50,
            lineHeight: 1.5,
          }}
        >
          Our AI staffing platform helps SNF administrators reduce costs
          <br />
          and improve patient care.
        </div>

        {/* Cards + Phone layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            width: "100%",
            maxWidth: 1200,
            position: "relative",
          }}
        >
          {/* Left column - cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                transform: `scale(${rnCardProgress})`,
                opacity: interpolate(rnCardProgress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <RNStatusCard />
            </div>
            <div
              style={{
                transform: `scale(${shiftCardProgress})`,
                opacity: interpolate(shiftCardProgress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <ShiftPickupCard />
            </div>
          </div>

          {/* Center - Phone */}
          <div
            style={{
              transform: `scale(${phoneScale})`,
              opacity: phoneOpacity,
            }}
          >
            <PhoneMockup />
          </div>

          {/* Right column - cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                transform: `scale(${calendarProgress})`,
                opacity: interpolate(calendarProgress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <CalendarCard />
            </div>
            <div
              style={{
                transform: `scale(${unitCardProgress})`,
                opacity: interpolate(unitCardProgress, [0, 0.3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <UnitCard />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
