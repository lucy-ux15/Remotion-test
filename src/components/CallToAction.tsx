import React from "react";
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

  // Particles animation
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 280 + Math.sin(frame * 0.1 + i) * 20;
    const x = Math.cos(angle + frame * 0.01) * radius;
    const y = Math.sin(angle + frame * 0.01) * radius;
    const particleOpacity = interpolate(frame, [20 + i * 5, 40 + i * 5], [0, 0.5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, y, opacity: particleOpacity, size: 6 + (i % 3) * 2 };
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Animated particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            opacity: particle.opacity,
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
          }}
        />
      ))}

      {/* Glowing ring */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(99, 102, 241, 0.2)",
          opacity: decorOpacity,
          transform: `scale(${0.8 + Math.sin(frame * 0.05) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(168, 85, 247, 0.15)",
          opacity: decorOpacity,
          transform: `scale(${0.9 + Math.cos(frame * 0.04) * 0.08})`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Main CTA Title */}
        <div
          style={{
            transform: `translateY(${(1 - titleY) * 50}px) scale(${titleScale})`,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "white",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            Ready to Transform Your Workflow?
          </h2>
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${buttonScale * pulseScale})`,
          }}
        >
          <div
            style={{
              padding: "24px 64px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: `
                0 20px 60px rgba(99, 102, 241, 0.4),
                0 8px 20px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 32,
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
            transform: `translateY(${(1 - subtextY) * 20}px)`,
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "rgba(255, 255, 255, 0.6)",
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
            gap: 60,
            marginTop: 20,
            opacity: subtextOpacity,
          }}
        >
          {["10K+ Users", "99.9% Uptime", "24/7 Support"].map((text, i) => (
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
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
