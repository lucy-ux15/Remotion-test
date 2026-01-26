# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Remotion video project that generates a 30-second product demo video (1920x1080 at 30fps).

## Commands

- `npm run start` - Opens Remotion Studio for live preview and development
- `npm run build` or `npm run render` - Renders the video to `out/video.mp4`
- `npm run upgrade` - Upgrades Remotion packages to latest version

## Architecture

**Entry Point:** `src/index.ts` registers the Remotion root with `registerRoot()`.

**Composition Definition:** `src/Root.tsx` defines the `ProductDemo` composition with video settings (fps, duration, dimensions) and default props.

**Main Composition:** `src/compositions/ProductDemo.tsx` orchestrates the video timeline using `<Sequence>` components:
- Logo intro (0-5s)
- Three feature highlights (5-24s, ~6s each)
- Call to action (24-30s)

**Components:** `src/components/` contains animated React components:
- `Background.tsx` - Animated gradient with floating orbs
- `Logo.tsx` - Company logo with spring animations
- `FeatureHighlight.tsx` - Feature cards with staggered animations
- `CallToAction.tsx` - CTA button with particle effects

## Remotion Patterns Used

- **Timing:** Use `<Sequence from={frameNumber} durationInFrames={frames}>` to place components on the timeline
- **Animation:** Use `useCurrentFrame()` with `interpolate()` for linear animations or `spring()` for physics-based motion
- **Layout:** `<AbsoluteFill>` provides a full-frame container for components
- **Config:** Props are typed with interfaces (e.g., `ProductDemoProps`, `Feature`) for customization
