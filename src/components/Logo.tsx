import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface LogoProps {
  companyName: string;
  tagline: string;
}

export const Logo: React.FC<LogoProps> = ({ companyName, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const logoRotation = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 1,
    },
  });

  // Company name animation (starts after logo)
  const nameOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameY = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Tagline animation (starts after company name)
  const taglineOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Fade out at the end
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Logo Icon - Modern blue gradient */}
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 36,
            background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #0ea5e9 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${logoScale}) rotate(${(1 - logoRotation) * -180}deg)`,
            boxShadow: "0 30px 80px rgba(37, 99, 235, 0.35), 0 15px 40px rgba(59, 130, 246, 0.25)",
          }}
        >
          {/* Dashboard-style logo */}
          <svg width="75" height="75" viewBox="0 0 75 75" fill="none">
            {/* Outer dashboard frame */}
            <rect x="10" y="10" width="55" height="55" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
            {/* Grid lines */}
            <line x1="10" y1="30" x2="65" y2="30" stroke="white" strokeWidth="1.5" opacity="0.6" />
            <line x1="35" y1="30" x2="35" y2="65" stroke="white" strokeWidth="1.5" opacity="0.6" />
            {/* Chart bars */}
            <rect x="17" y="42" width="8" height="16" rx="2" fill="white" opacity="0.9" />
            <rect x="27" y="36" width="8" height="22" rx="2" fill="white" />
            {/* Metrics circle */}
            <circle cx="50" cy="47.5" r="12" stroke="white" strokeWidth="2" fill="none" />
            <path d="M50 35.5 L50 47.5 L58 47.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            {/* Top metrics dots */}
            <circle cx="20" cy="20" r="4" fill="white" opacity="0.9" />
            <rect x="28" y="17" width="25" height="6" rx="3" fill="white" opacity="0.7" />
          </svg>
        </div>

        {/* Company Name - Blue text */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${(1 - nameY) * 30}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 86,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1e40af",
              margin: 0,
              letterSpacing: "-2px",
              textShadow: "0 4px 30px rgba(37, 99, 235, 0.2)",
            }}
          >
            {companyName}
          </h1>
        </div>

        {/* Tagline - Subtle blue */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineY) * 20}px)`,
          }}
        >
          <p
            style={{
              fontSize: 34,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#64748b",
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
