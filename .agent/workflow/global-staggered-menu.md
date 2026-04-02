# Global Staggered Menu

## Purpose

- Keep `StaggeredMenu` visible across all routes instead of mounting it only on the homepage.
- Preserve the existing wipe-up navigation feel when menu links change pages.
- Let future Astro pages inherit the menu automatically through the shared layout.

## Implementation Notes

- Shared menu mounting lives in [src/layouts/Layout.astro](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/layouts/Layout.astro).
- Global menu behavior and route wipe overlay live in [src/components/GlobalStaggeredMenu.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/GlobalStaggeredMenu.tsx).
- Homepage-specific menu and leave-transition markup were removed from [src/components/HomePage.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/HomePage.tsx).

## Maintenance

- New pages should use `Layout.astro` so the menu stays present without extra wiring.
- Keep the menu items and wipe timing centralized in `GlobalStaggeredMenu.tsx` unless page-specific navigation behavior is intentionally introduced.
