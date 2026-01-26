import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface DashboardProps {
  title: string;
  variant: "overview" | "analytics" | "metrics";
}

export const Dashboard: React.FC<DashboardProps> = ({ title, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in/out animations
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [160, 190], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = fadeIn * fadeOut;

  // Dashboard container animation
  const dashboardScale = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 80,
      mass: 1,
    },
  });

  // Title animation
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Staggered card animations
  const getCardAnimation = (delay: number) => {
    const cardScale = spring({
      frame: frame - delay,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });
    const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { scale: cardScale, opacity: cardOpacity };
  };

  // Animated chart values
  const chartProgress = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line chart animation
  const lineProgress = interpolate(frame, [50, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter animation for stats
  const counterProgress = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const renderOverviewDashboard = () => (
    <div style={{ display: "flex", gap: 30, width: "100%" }}>
      {/* Left side - Main chart */}
      <div
        style={{
          flex: 2,
          ...getCardStyle(getCardAnimation(20)),
        }}
      >
        <div style={cardHeaderStyle}>
          <span style={cardTitleStyle}>Revenue Overview</span>
          <span style={cardBadgeStyle}>+24.5%</span>
        </div>
        <div style={{ padding: "20px 30px 30px", height: 280 }}>
          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: "100%" }}>
            {[65, 45, 80, 55, 90, 70, 95].map((height, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${height * chartProgress}%`,
                    background: `linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)`,
                    borderRadius: 8,
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                    transition: "height 0.3s ease",
                  }}
                />
                <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Stats cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Stat card 1 */}
        <div style={{ ...getCardStyle(getCardAnimation(30)), padding: 25 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 500 }}>Total Users</p>
              <h3 style={{ margin: "8px 0 0", fontSize: 36, fontWeight: 700, color: "#1e293b" }}>
                {Math.round(24847 * counterProgress).toLocaleString()}
              </h3>
            </div>
            <div style={iconContainerStyle("#3b82f6")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>+12.5%</span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>from last month</span>
          </div>
        </div>

        {/* Stat card 2 */}
        <div style={{ ...getCardStyle(getCardAnimation(40)), padding: 25 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 500 }}>Revenue</p>
              <h3 style={{ margin: "8px 0 0", fontSize: 36, fontWeight: 700, color: "#1e293b" }}>
                ${Math.round(89420 * counterProgress).toLocaleString()}
              </h3>
            </div>
            <div style={iconContainerStyle("#0ea5e9")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>+8.2%</span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>from last month</span>
          </div>
        </div>

        {/* Stat card 3 */}
        <div style={{ ...getCardStyle(getCardAnimation(50)), padding: 25 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 500 }}>Active Sessions</p>
              <h3 style={{ margin: "8px 0 0", fontSize: 36, fontWeight: 700, color: "#1e293b" }}>
                {Math.round(1284 * counterProgress).toLocaleString()}
              </h3>
            </div>
            <div style={iconContainerStyle("#8b5cf6")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>+18.7%</span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>from last hour</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => {
    const linePoints = [
      { x: 0, y: 70 },
      { x: 80, y: 50 },
      { x: 160, y: 65 },
      { x: 240, y: 35 },
      { x: 320, y: 45 },
      { x: 400, y: 25 },
      { x: 480, y: 40 },
      { x: 560, y: 15 },
    ];
    const pathData = linePoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y * lineProgress + (1 - lineProgress) * 70}`)
      .join(" ");

    return (
      <div style={{ display: "flex", gap: 30, width: "100%" }}>
        {/* Main analytics chart */}
        <div style={{ flex: 2, ...getCardStyle(getCardAnimation(20)) }}>
          <div style={cardHeaderStyle}>
            <span style={cardTitleStyle}>Performance Analytics</span>
            <div style={{ display: "flex", gap: 20 }}>
              <span style={{ fontSize: 14, color: "#3b82f6", fontWeight: 600 }}>Daily</span>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>Weekly</span>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>Monthly</span>
            </div>
          </div>
          <div style={{ padding: "20px 30px 30px", height: 280 }}>
            <svg width="100%" height="100%" viewBox="0 0 560 100" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#e2e8f0" strokeWidth="1" />
              ))}
              {/* Area fill */}
              <path
                d={`${pathData} L 560 100 L 0 100 Z`}
                fill="url(#blueGradient)"
                opacity="0.2"
              />
              {/* Line */}
              <path d={pathData} stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Data points */}
              {linePoints.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y * lineProgress + (1 - lineProgress) * 70}
                  r="6"
                  fill="white"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              ))}
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Side metrics */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Donut chart card */}
          <div style={{ ...getCardStyle(getCardAnimation(30)), padding: 25, flex: 1 }}>
            <p style={{ margin: "0 0 15px", fontSize: 14, color: "#64748b", fontWeight: 500 }}>Traffic Sources</p>
            <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray={`${150 * chartProgress} 251.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="12"
                  strokeDasharray={`${80 * chartProgress} 251.2`}
                  strokeDashoffset={-150 * chartProgress}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "#3b82f6" }} />
                  <span style={{ fontSize: 13, color: "#64748b" }}>Direct (60%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "#0ea5e9" }} />
                  <span style={{ fontSize: 13, color: "#64748b" }}>Organic (32%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "#e2e8f0" }} />
                  <span style={{ fontSize: 13, color: "#64748b" }}>Other (8%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion rate */}
          <div style={{ ...getCardStyle(getCardAnimation(45)), padding: 25 }}>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 500 }}>Conversion Rate</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
              <h3 style={{ margin: 0, fontSize: 42, fontWeight: 700, color: "#1e293b" }}>
                {(3.24 * counterProgress).toFixed(2)}%
              </h3>
              <span style={{ color: "#10b981", fontSize: 16, fontWeight: 600 }}>+0.8%</span>
            </div>
            <div style={{ marginTop: 15, height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${32.4 * chartProgress}%`,
                  background: "linear-gradient(90deg, #3b82f6, #0ea5e9)",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMetricsDashboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 25, width: "100%" }}>
      {/* Top row - Key metrics */}
      <div style={{ display: "flex", gap: 25 }}>
        {[
          { label: "Page Views", value: 142580, change: "+15.3%", icon: "eye", color: "#3b82f6" },
          { label: "Bounce Rate", value: "32.4%", change: "-2.1%", icon: "trending", color: "#10b981" },
          { label: "Avg. Duration", value: "4:32", change: "+0:45", icon: "clock", color: "#0ea5e9" },
          { label: "New Signups", value: 847, change: "+28.9%", icon: "user", color: "#8b5cf6" },
        ].map((metric, i) => (
          <div key={i} style={{ flex: 1, ...getCardStyle(getCardAnimation(20 + i * 10)), padding: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b", fontWeight: 500 }}>{metric.label}</p>
                <h3 style={{ margin: "10px 0 0", fontSize: 32, fontWeight: 700, color: "#1e293b" }}>
                  {typeof metric.value === "number"
                    ? Math.round(metric.value * counterProgress).toLocaleString()
                    : metric.value}
                </h3>
              </div>
              <div style={iconContainerStyle(metric.color)}>
                {metric.icon === "eye" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                {metric.icon === "trending" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                )}
                {metric.icon === "clock" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )}
                {metric.icon === "user" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                )}
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <span style={{ color: metric.change.startsWith("+") ? "#10b981" : "#ef4444", fontSize: 14, fontWeight: 600 }}>
                {metric.change}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 6 }}>vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row - Progress metrics */}
      <div style={{ display: "flex", gap: 25 }}>
        <div style={{ flex: 1, ...getCardStyle(getCardAnimation(60)), padding: 30 }}>
          <div style={cardHeaderStyle}>
            <span style={cardTitleStyle}>Goal Progress</span>
            <span style={{ fontSize: 14, color: "#64748b" }}>Q4 2024</span>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 25 }}>
            {[
              { label: "Revenue", current: 78, target: 100, color: "#3b82f6" },
              { label: "Users", current: 92, target: 100, color: "#0ea5e9" },
              { label: "Retention", current: 85, target: 100, color: "#10b981" },
            ].map((goal, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>{goal.label}</span>
                  <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 600 }}>
                    {Math.round(goal.current * chartProgress)}%
                  </span>
                </div>
                <div style={{ height: 10, background: "#e2e8f0", borderRadius: 5, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${goal.current * chartProgress}%`,
                      background: goal.color,
                      borderRadius: 5,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, ...getCardStyle(getCardAnimation(70)), padding: 30 }}>
          <div style={cardHeaderStyle}>
            <span style={cardTitleStyle}>Recent Activity</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: 20 }}>
            {[
              { action: "New user registered", time: "2 min ago", icon: "#3b82f6" },
              { action: "Payment received", time: "15 min ago", icon: "#10b981" },
              { action: "Report generated", time: "1 hour ago", icon: "#0ea5e9" },
            ].map((activity, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: activity.icon,
                    boxShadow: `0 0 10px ${activity.icon}40`,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 500 }}>{activity.action}</span>
                </div>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Shared styles
  const getCardStyle = (anim: { scale: number; opacity: number }): React.CSSProperties => ({
    background: "white",
    borderRadius: 20,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
    transform: `scale(${anim.scale})`,
    opacity: anim.opacity,
    overflow: "hidden",
  });

  const cardHeaderStyle: React.CSSProperties = {
    padding: "20px 30px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    color: "#1e293b",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const cardBadgeStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: "#10b981",
    background: "#d1fae5",
    padding: "4px 12px",
    borderRadius: 20,
  };

  const iconContainerStyle = (color: string): React.CSSProperties => ({
    width: 48,
    height: 48,
    borderRadius: 12,
    background: color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: `0 4px 15px ${color}40`,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        padding: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1600,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          transform: `scale(${dashboardScale})`,
        }}
      >
        {/* Section title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleY) * 30}px)`,
            marginBottom: 10,
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#1e293b",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "#64748b",
              margin: "10px 0 0",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {variant === "overview" && "Real-time insights at your fingertips"}
            {variant === "analytics" && "Deep dive into your performance metrics"}
            {variant === "metrics" && "Track what matters most to your business"}
          </p>
        </div>

        {/* Dashboard content based on variant */}
        {variant === "overview" && renderOverviewDashboard()}
        {variant === "analytics" && renderAnalyticsDashboard()}
        {variant === "metrics" && renderMetricsDashboard()}
      </div>
    </AbsoluteFill>
  );
};
