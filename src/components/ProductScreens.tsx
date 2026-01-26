import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { PhoneMockup, FloatingCard } from "./PhoneMockup";
import { COLORS } from "./Background";

// Mock Dashboard Screen Content
const DashboardScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Stagger animation for dashboard elements
  const getElementOpacity = (delay: number) =>
    interpolate(frame - delay, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAFA",
        padding: "50px 20px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: getElementOpacity(10),
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            marginBottom: 4,
          }}
        >
          Serenity Springs Hospital
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.text,
          }}
        >
          Reports
        </div>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          opacity: getElementOpacity(20),
        }}
      >
        <StatCard label="Total Call-offs" value="342" change="-12%" isNegative />
        <StatCard label="Auto-Approval" value="78.5%" change="+5.2%" />
      </div>

      {/* Second Stats Row */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          opacity: getElementOpacity(30),
        }}
      >
        <StatCard label="Shifts Replaced" value="321" change="-18%" isNegative />
        <StatCard label="Unfilled" value="8" change="+33%" isPositive={false} />
      </div>

      {/* Breakdown Section */}
      <div
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 12,
          padding: 16,
          opacity: getElementOpacity(40),
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 12,
          }}
        >
          Approved Call-offs Breakdown
        </div>
        <BreakdownRow label="Auto-Approved" value="342" color={COLORS.success} />
        <BreakdownRow label="Manual Approved" value="62" color={COLORS.primary} />
        <BreakdownRow label="Denied Call-offs" value="10" color={COLORS.error} />
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  label: string;
  value: string;
  change: string;
  isNegative?: boolean;
  isPositive?: boolean;
}> = ({ label, value, change, isNegative = false, isPositive = true }) => (
  <div
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: 12,
    }}
  >
    <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.text }}>{value}</div>
    <div
      style={{
        fontSize: 11,
        color: isNegative ? COLORS.error : COLORS.success,
        marginTop: 4,
      }}
    >
      {change} vs last week
    </div>
  </div>
);

const BreakdownRow: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #f0f0f0",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span style={{ fontSize: 13, color: COLORS.text }}>{label}</span>
    </div>
    <span style={{ fontSize: 16, fontWeight: 600, color }}>{value}</span>
  </div>
);

export const ProductScreens: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in the whole scene
  const sceneOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [170, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: sceneOpacity * fadeOut,
      }}
    >
      {/* Phone in center-right */}
      <div
        style={{
          position: "absolute",
          right: 280,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <PhoneMockup slideFrom="right" delay={5}>
          <DashboardScreen />
        </PhoneMockup>
      </div>

      {/* Floating Cards on left side */}
      <FloatingCard delay={25} x={120} y={180} width={260}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 18 }}>RN</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
              Annette Black
            </div>
            <div style={{ fontSize: 12, color: COLORS.success }}>On time</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={35} x={80} y={300} width={240}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#E8E8E8",
            }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
              Kathryn Murphy
            </div>
            <div style={{ fontSize: 12, color: COLORS.primary }}>Late arrival</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={45} x={140} y={440} width={200}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>
            1 shift pickup
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.success }}>
            Robert Murphy
          </div>
        </div>
      </FloatingCard>

      {/* Floating cards on right */}
      <FloatingCard delay={55} x={1480} y={220} width={220}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📅</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>
              Oct 18, 2023
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>7AM-3PM</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={65} x={1500} y={380} width={200}>
        <div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>Unit 3</div>
          <div style={{ display: "flex", gap: 4 }}>
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                backgroundColor: COLORS.primary,
                color: "white",
                borderRadius: 4,
              }}
            >
              RN 1/1
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                backgroundColor: COLORS.success,
                color: "white",
                borderRadius: 4,
              }}
            >
              LPN 1/1
            </span>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard delay={75} x={1440} y={520} width={240}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>⭐</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.text }}>
            Google Rating 4.7
          </span>
        </div>
      </FloatingCard>
    </AbsoluteFill>
  );
};
