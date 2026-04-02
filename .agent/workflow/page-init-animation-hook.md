# Page Init Animation Hook

## Purpose

- Reuse the About page's wipe-and-stagger entry motion across future routes.
- Allow page content to enter from `bottom`, `top`, `left`, or `right` without rewriting GSAP setup in each component.
- Keep route-specific layout tweaks, like hiding the global menu title on About, configurable without forking the menu.

## Implementation Notes

- Shared page-enter animation logic lives in [src/hooks/usePageInitAnimation.ts](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/hooks/usePageInitAnimation.ts).
- The hook expects `pageRef` and `contentRef`, with an optional `overlayRef`, then animates `[data-page-init-item]` and `[data-page-init-divider]` by default.
- [src/components/AboutPage.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/AboutPage.tsx) is the reference implementation using `direction: "bottom"`.
- [src/components/StaggeredMenu.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/StaggeredMenu.tsx) now supports `showLogo` so route-level wrappers can hide the top-left title while keeping the menu toggle visible.
- Route-cover wipe layers are now owned by [src/layouts/Layout.astro](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/layouts/Layout.astro), and [src/components/GlobalStaggeredMenu.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/GlobalStaggeredMenu.tsx) only triggers them before navigation.

## Maintenance

- New pages should prefer the shared hook over copying GSAP timelines inline.
- If the wipe timing changes, update the hook so all pages keep the same motion language.
- If more route-specific menu presentation rules appear, keep them centralized in `GlobalStaggeredMenu.tsx`.
