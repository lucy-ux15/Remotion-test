import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface CallToActionProps {
  ctaText: string;
  ctaSubtext: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({ ctaText, ctaSubtext }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 80,
      mass: 0.8,
    },
  });

  const titleY = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Button animation
  const buttonScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 8,
      stiffness: 100,
      mass: 0.6,
    },
  });

  // Button pulse effect
  const pulseScale = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [1, 1.03]
  );

  // Subtext animation
  const subtextOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtextY = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Decorative elements
  const decorOpacity = interpolate(frame, [30, 50], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particles animation - Blue themed
  const particles = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 300 + Math.sin(frame * 0.1 + i) * 25;
    const x = Math.cos(angle + frame * 0.012) * radius;
    const y = Math.sin(angle + frame * 0.012) * radius;
    const particleOpacity = interpolate(frame, [15 + i * 4, 35 + i * 4], [0, 0.6], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, y, opacity: particleOpacity, size: 8 + (i % 3) * 3 };
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Animated particles - Blue themed */}
      {particles.map((particle, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `linear-gradient(135deg, #3b82f6, #0ea5e9)`,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            opacity: particle.opacity,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
          }}
        />
      ))}

      {/* Glowing rings - Blue themed */}
      <div
        style={{
          position: "absolute",
          width: 550,
          height: 550,
          borderRadius: "50%",
          border: "2px solid rgba(59, 130, 246, 0.15)",
          opacity: decorOpacity,
          transform: `scale(${0.8 + Math.sin(frame * 0.05) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          border: "1px solid rgba(14, 165, 233, 0.12)",
          opacity: decorOpacity,
          transform: `scale(${0.9 + Math.cos(frame * 0.04) * 0.08})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          border: "3px solid rgba(37, 99, 235, 0.08)",
          opacity: decorOpacity,
          transform: `scale(${0.7 + Math.sin(frame * 0.06) * 0.12})`,
        }}
      />

      {/* CTA Card */}
      <div
        style={{
          background: "white",
          borderRadius: 32,
          padding: "60px 80px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.12), 0 10px 30px rgba(59, 130, 246, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
        }}
      >
        {/* Main CTA Title */}
        <div
          style={{
            transform: `translateY(${(1 - titleY) * 40}px) scale(${titleScale})`,
          }}
        >
          <h2
            style={{
              fontSize: 52,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1e293b",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            Ready to Get Started?
          </h2>
        </div>

        {/* CTA Button - Blue gradient */}
        <div
          style={{
            transform: `scale(${buttonScale * pulseScale})`,
          }}
        >
          <div
            style={{
              padding: "22px 60px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #0ea5e9 100%)",
              boxShadow: `
                0 20px 50px rgba(37, 99, 235, 0.35),
                0 8px 20px rgba(59, 130, 246, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 30,
                fontWeight: 600,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: "white",
                letterSpacing: "0.5px",
              }}
            >
              {ctaText}
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
            transform: `translateY(${(1 - subtextY) * 15}px)`,
          }}
        >
          <p
            style={{
              fontSize: 20,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#64748b",
              margin: 0,
            }}
          >
            {ctaSubtext}
          </p>
        </div>

        {/* Trust indicators */}
        <div
          style={{
            display: "flex",
            gap: 50,
            marginTop: 10,
            opacity: subtextOpacity,
          }}
        >
          {[
            { text: "10K+ Users", icon: "users" },
            { text: "99.9% Uptime", icon: "uptime" },
            { text: "24/7 Support", icon: "support" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#eff6ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon === "users" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {item.icon === "uptime" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                )}
                {item.icon === "support" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: "#475569",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
