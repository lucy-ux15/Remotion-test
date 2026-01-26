import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const PhoneMockupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slide-in with spring animation (low damping for bounce)
  const phoneY = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 1,
    },
  });

  // Staggered UI element animations
  const uiElements = [
    { delay: 12, label: "RN", name: "Annette Black", status: "On time", statusColor: "#10B981" },
    { delay: 18, label: "RN", name: "Kathryn Murphy", status: "Late arrival", statusColor: "#EF4444" },
    { delay: 24, label: "RN", name: "Robert Murphy", status: "Shift Pickup", statusColor: "#F59E0B" },
  ];

  // Card appearing on right side
  const cardOpacity = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardY = spring({
    frame: frame - 18,
    fps,
    config: {
      damping: 15,
      stiffness: 90,
      mass: 0.8,
    },
  });

  // Title animation
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 18,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 400,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Get your
        </h1>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 400,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          <span style={{ fontWeight: 500 }}>shifts</span> together
        </h1>
      </div>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          marginTop: 100,
        }}
      >
        {/* Left side - Staff cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: cardOpacity,
            transform: `translateY(${(1 - cardY) * 20}px)`,
          }}
        >
          {uiElements.map((item, index) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const itemY = interpolate(frame, [item.delay, item.delay + 10], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "white",
                  padding: "16px 24px",
                  borderRadius: 16,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                  opacity: itemOpacity,
                  transform: `translateY(${itemY}px)`,
                  minWidth: 280,
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E8E0D8 0%, #D4C8BC 100%)",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      background: "#F3F0ED",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "system-ui, sans-serif",
                      color: "#666",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "system-ui, sans-serif",
                      color: "#1a1a1a",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    color: item.statusColor,
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Phone mockup */}
        <div
          style={{
            transform: `translateY(${(1 - phoneY) * 300}px)`,
          }}
        >
          <div
            style={{
              width: 320,
              height: 640,
              background: "#1a1a1a",
              borderRadius: 48,
              padding: 12,
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Phone screen */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #FDF8F4 0%, #F9F5F1 100%)",
                borderRadius: 38,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Phone notch */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 100,
                  height: 28,
                  background: "#1a1a1a",
                  borderRadius: 20,
                }}
              />

              {/* Phone content - nurse image placeholder */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  height: "75%",
                  background: "linear-gradient(180deg, transparent 0%, rgba(232, 90, 79, 0.1) 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                {/* Silhouette of nurses */}
                <div
                  style={{
                    width: "80%",
                    height: "90%",
                    background: "linear-gradient(180deg, #D4C8BC 0%, #B8A99A 100%)",
                    borderRadius: "100px 100px 0 0",
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: cardOpacity,
            transform: `translateY(${(1 - cardY) * 20}px)`,
          }}
        >
          {/* Date picker card */}
          <div
            style={{
              background: "white",
              padding: "16px 24px",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: 15, fontFamily: "system-ui", color: "#1a1a1a" }}>
              Oct 18, 2023
            </span>
          </div>

          {/* Time picker card */}
          <div
            style={{
              background: "white",
              padding: "16px 24px",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: 15, fontFamily: "system-ui", color: "#1a1a1a" }}>
              7AM-3PM
            </span>
          </div>

          {/* Unit card */}
          <div
            style={{
              background: "white",
              padding: "20px 24px",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 600, fontFamily: "system-ui", color: "#1a1a1a" }}>
                Unit 3
              </span>
              <span style={{ color: "#10B981" }}>✦</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 13, fontFamily: "system-ui", color: "#E85A4F" }}>
                RN 1/1
              </span>
              <span style={{ fontSize: 13, fontFamily: "system-ui", color: "#F59E0B" }}>
                LPN 1/1
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
