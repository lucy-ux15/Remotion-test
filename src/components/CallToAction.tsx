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

  // Floating elements animation
  const floatingElements = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    const radius = 300 + Math.sin(frame * 0.08 + i) * 30;
    const x = Math.cos(angle + frame * 0.008) * radius;
    const y = Math.sin(angle + frame * 0.008) * radius;
    const elementOpacity = interpolate(frame, [20 + i * 5, 40 + i * 5], [0, 0.4], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, y, opacity: elementOpacity, size: 10 + (i % 3) * 4 };
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Animated floating elements */}
      {floatingElements.map((element, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: element.size,
            height: element.size,
            borderRadius: "50%",
            background: i % 2 === 0
              ? "linear-gradient(135deg, #E8705B, #D69382)"
              : "linear-gradient(135deg, #4A9B7F, #6BB89D)",
            transform: `translate(${element.x}px, ${element.y}px)`,
            opacity: element.opacity,
            boxShadow: "0 0 15px rgba(232, 112, 91, 0.3)",
          }}
        />
      ))}

      {/* Soft glowing ring */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(232, 112, 91, 0.15)",
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
          border: "1px solid rgba(74, 155, 127, 0.1)",
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
              color: "#1A1A1A",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            Ready to Transform Your Staffing?
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
              borderRadius: 50,
              background: "linear-gradient(135deg, #E8705B 0%, #D65B47 100%)",
              boxShadow: `
                0 20px 60px rgba(232, 112, 91, 0.35),
                0 8px 20px rgba(0, 0, 0, 0.1),
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
              fontSize: 24,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#6A6A6A",
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
          {["For Facilities", "For Nurses", "Real-Time Analytics"].map((text, i) => (
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
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#4A9B7F",
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: "#5A5A5A",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Google rating badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
            opacity: subtextOpacity,
            padding: "12px 24px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: 30,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#4A4A4A",
            }}
          >
            Rating 4.7
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= 4 ? "#FBBC05" : "#E0E0E0"}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
