import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const FeatureCardsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 100,
    },
  });

  // Feature cards data
  const cards = [
    {
      icon: "💰",
      title: "Reduce Labor Costs",
      color: "#E8F5E9",
      items: [
        "Compare costs between per diem and agency options",
        "Adjust staffing based on acuity and census",
        "Prevent overtime through our tracking system",
        "Monitor labor costs on our user-friendly dashboard",
        "Forecast future staffing needs so you don't overstaff",
      ],
    },
    {
      icon: "⏱",
      title: "Maximize Administrative Time",
      color: "#FFF8E1",
      items: [
        "Automate your shift posting, time/attendance tracking, and PBJ reporting",
        "Communicate efficiently with staff through mobile app",
        "View all labor spending on our centralized dashboard",
      ],
    },
    {
      icon: "📋",
      title: "Increase Staffing Efficiency",
      color: "#E3F2FD",
      items: [
        "Predict upcoming shifts",
        "Manage cancellations with ease",
        "Automate your shift posting",
        "Instantly allocate staff to shifts",
        "Distribute shifts easily and quickly",
      ],
    },
    {
      icon: "😊",
      title: "Increase Staff Satisfaction",
      color: "#FCE4EC",
      items: [
        "Provide mobile app for shift preference selection",
        "Get rid off mandatory overtime",
        "Create predictable shift schedules",
        "Reduce last-minute schedule changes",
      ],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "60px 80px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 20}px)`,
          marginBottom: 50,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 500,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
          }}
        >
          With LaborRX your skilled nursing facility
        </h1>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 500,
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            color: "#1a1a1a",
            margin: 0,
            textAlign: "center",
          }}
        >
          will take a turn for the better
        </h1>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "flex",
          gap: 24,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {cards.map((card, cardIndex) => {
          // Staggered card animation
          const cardDelay = 8 + cardIndex * 5;
          const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const cardY = spring({
            frame: frame - cardDelay,
            fps,
            config: {
              damping: 14,
              stiffness: 80,
              mass: 0.8,
            },
          });

          const cardScale = spring({
            frame: frame - cardDelay,
            fps,
            config: {
              damping: 16,
              stiffness: 100,
              mass: 0.6,
            },
          });

          return (
            <div
              key={cardIndex}
              style={{
                flex: 1,
                maxWidth: 400,
                background: card.color,
                borderRadius: 24,
                padding: "32px 28px",
                opacity: cardOpacity,
                transform: `translateY(${(1 - cardY) * 40}px) scale(${0.95 + cardScale * 0.05})`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  fontSize: 24,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "#1a1a1a",
                  margin: 0,
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                {card.title}
              </h3>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {card.items.slice(0, 4).map((item, itemIndex) => {
                  const itemDelay = cardDelay + 8 + itemIndex * 2;
                  const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 6], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  const itemX = interpolate(frame, [itemDelay, itemDelay + 6], [10, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });

                  return (
                    <div
                      key={itemIndex}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        opacity: itemOpacity,
                        transform: `translateX(${itemX}px)`,
                      }}
                    >
                      <span style={{ color: "#10B981", fontSize: 14, marginTop: 2 }}>✓</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontFamily: "system-ui, sans-serif",
                          color: "#444",
                          lineHeight: 1.4,
                        }}
                      >
                        {item}
                      </span>
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
