import React from "react";
import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";
import { LaborRxStory } from "./compositions/LaborRxStory";

// Video settings
const FPS = 30;
const DURATION_SECONDS = 30;

// LaborRx Story settings
const LABORRX_FPS = 60;
const LABORRX_DURATION_SECONDS = 15;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          companyName: "TechFlow",
          tagline: "Streamline Your Workflow",
          features: [
            {
              title: "Lightning Fast",
              description: "Process data 10x faster with our optimized engine",
              icon: "zap",
            },
            {
              title: "Secure by Design",
              description: "Enterprise-grade security built into every layer",
              icon: "shield",
            },
            {
              title: "Smart Analytics",
              description: "AI-powered insights that drive real results",
              icon: "chart",
            },
          ],
          ctaText: "Start Free Trial",
          ctaSubtext: "No credit card required",
        }}
      />
      <Composition
        id="LaborRxStory"
        component={LaborRxStory}
        durationInFrames={LABORRX_FPS * LABORRX_DURATION_SECONDS}
        fps={LABORRX_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
