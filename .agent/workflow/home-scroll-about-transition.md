# Home Scroll About Transition

## Purpose

- Trigger a fast upward white sweep when the user scrolls down on the homepage.
- Reuse the stagger timing language from `StaggeredMenu` instead of introducing a disconnected motion style.
- Open a dedicated About page with a GIF background and softly revealed introduction copy.

## Implementation Notes

- Scroll transition logic lives in [src/hooks/useScrollPageTransition.ts](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/hooks/useScrollPageTransition.ts).
- The homepage injects three full-screen transition layers in [src/components/HomePage.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/HomePage.tsx).
- The About route is [src/pages/about.astro](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/pages/about.astro), backed by [src/components/AboutPage.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/AboutPage.tsx).
- Intro copy on the About page fades upward with GSAP after mount.

## Maintenance

- Keep the transition layer count and stagger timing aligned with the menu animation language if `StaggeredMenu` is updated later.
- If the About background asset changes, update the Cloudinary URL in `AboutPage.tsx`.
