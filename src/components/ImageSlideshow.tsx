import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";

// Easing functions
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const bouncy = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

// SCENE 1: Logo (0-1.5s / 0-90 frames)
export const Scene1Logo: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 15], [0.9, 1], { extrapolateRight: "clamp", easing: easeOut });
  const pulse = frame >= 15 && frame < 75 ? 1 + 0.02 * Math.sin(((frame - 15) / 60) * Math.PI * 2) : 1;
  const exitScale = interpolate(frame, [75, 90], [1, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });
  const finalScale = frame < 75 ? scale * pulse : exitScale;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `scale(${finalScale})` }} />
    </AbsoluteFill>
  );
};

// SCENE 2: Hero Text Only (1.5-3s / 0-90 frames local)
export const Scene2HeroText: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 18, 72, 90], [0, 1, 1, 0.8], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 18, 72, 90], [30, 0, 0, -20], { extrapolateRight: "clamp", easing: easeOut });
  const scale = interpolate(frame, [0, 18], [0.95, 1], { extrapolateRight: "clamp", easing: easeOut });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/2.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateY(${translateY}px) scale(${scale})` }} />
    </AbsoluteFill>
  );
};

// SCENE 3: Hero with Phone (3-5s / 0-120 frames local)
export const Scene3HeroPhone: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30, 102, 120], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 30], [60, 0], { extrapolateRight: "clamp", easing: bouncy });
  const scale = interpolate(frame, [0, 30, 102, 120], [0.92, 1, 1, 0.95], { extrapolateRight: "clamp" });
  const rotate = interpolate(frame, [0, 30], [1, 0], { extrapolateRight: "clamp", easing: bouncy });
  const float = frame >= 30 && frame < 102 ? Math.sin((frame - 30) * 0.04) * 4 : 0;
  const breath = frame >= 30 && frame < 102 ? 1 + 0.005 * Math.sin((frame - 30) * 0.05) : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/3.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateY(${translateY + float}px) scale(${scale * breath}) rotate(${rotate}deg)` }} />
    </AbsoluteFill>
  );
};

// SCENE 4: Value Prop 1 - "smooth" (5-6.5s / 0-90 frames local)
export const Scene4ValueProp1: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 18, 72, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const translateX = interpolate(frame, [0, 18, 72, 90], [-30, 0, 0, 15], { extrapolateRight: "clamp", easing: easeOut });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/4.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateX(${translateX}px)` }} />
    </AbsoluteFill>
  );
};

// SCENE 5: Value Prop 2 - "cost-efficient" (6.5-8s / 0-90 frames local)
export const Scene5ValueProp2: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 18, 72, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const translateX = interpolate(frame, [0, 18, 72, 90], [30, 0, 0, -15], { extrapolateRight: "clamp", easing: easeOut });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/5.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateX(${translateX}px)` }} />
    </AbsoluteFill>
  );
};

// SCENE 6: Value Prop 3 - "professional" (8-9.5s / 0-90 frames local)
export const Scene6ValueProp3: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 18, 72, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 18], [0.95, 1], { extrapolateRight: "clamp", easing: easeOut });
  const translateY = interpolate(frame, [72, 90], [0, -30], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/8.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateY(${translateY}px) scale(${scale})` }} />
    </AbsoluteFill>
  );
};

// SCENE 7: Problem Card - Reactive only (9.5-10.5s / 0-60 frames local)
export const Scene7ProblemCard: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" });
  const translateX = interpolate(frame, [0, 24, 48, 60], [-80, 0, 0, -50], { extrapolateRight: "clamp", easing: bouncy });
  const rotate = interpolate(frame, [0, 24], [-4, 0], { extrapolateRight: "clamp", easing: bouncy });
  const scale = interpolate(frame, [0, 24], [0.9, 1], { extrapolateRight: "clamp", easing: bouncy });
  const float = frame >= 24 && frame < 48 ? Math.sin((frame - 24) * 0.1) * 2 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/9.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateX(${translateX}px) translateY(${float}px) rotate(${rotate}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};

// SCENE 8: Comparison Cards (10.5-12s / 0-90 frames local)
export const Scene8Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30, 72, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 30], [0.95, 1], { extrapolateRight: "clamp", easing: easeOut });
  const translateY = interpolate(frame, [72, 90], [0, -40], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });
  const float = frame >= 30 && frame < 72 ? Math.sin((frame - 30) * 0.05) * 2 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/10.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateY(${translateY + float}px) scale(${scale})` }} />
    </AbsoluteFill>
  );
};

// SCENE 9: Dashboard (12-13.5s / 0-90 frames local)
export const Scene9Dashboard: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30, 72, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 30], [80, 0], { extrapolateRight: "clamp", easing: bouncy });
  const scale = interpolate(frame, [0, 30, 72, 90], [0.9, 1, 1, 1.15], { extrapolateRight: "clamp" });
  const pulse = frame >= 30 && frame < 72 ? 1 + 0.01 * Math.sin((frame - 30) * 0.1) : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/11.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `translateY(${translateY}px) scale(${scale * pulse})` }} />
    </AbsoluteFill>
  );
};

// SCENE 10: Thank You (13.5-15s / 0-90 frames local)
export const Scene10ThankYou: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", easing: easeOut });
  const scale = interpolate(frame, [0, 30], [0.85, 1], { extrapolateRight: "clamp", easing: easeOut });
  const breath = frame >= 30 ? 1 + 0.005 * Math.sin((frame - 30) * 0.05) : 1;
  const brightness = interpolate(frame, [72, 90], [1, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img src={staticFile("images/12.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity, transform: `scale(${scale * breath})`, filter: `brightness(${brightness})` }} />
    </AbsoluteFill>
  );
};
