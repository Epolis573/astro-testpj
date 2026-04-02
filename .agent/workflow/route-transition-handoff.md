# Route Transition Handoff

## Purpose

- Keep the current page visible until the wipe fully covers it during menu navigation.
- Let the next route start already covered, then reveal upward without flashing to a blank white page first.
- Separate cross-route wipe ownership from page-local content entrance animation.

## Implementation Notes

- [src/layouts/Layout.astro](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/layouts/Layout.astro) enables Astro client routing with `ClientRouter`, fetches transition media, and persists the global menu island across navigations.
- [src/components/GlobalStaggeredMenu.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/GlobalStaggeredMenu.tsx) owns the full-screen wipe overlay, animates it to cover the current page, shows transition media during route wait time, and reveals the next page after Astro's `after-swap` event.
- Page components like [src/components/AboutPage.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/AboutPage.tsx) only animate their own content and no longer own the full-screen wipe handoff.

## Maintenance

- Keep the overlay colors and timing aligned between the menu-triggered cover animation and the layout-level reveal animation.
- If another navigation source needs the same handoff, reuse the same session-storage flag and layout overlay instead of adding a second full-screen transition system.
