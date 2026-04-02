# Transition Loading GIFs

## Purpose

- Replace the flat blank wait state between route cover and route reveal with a random loading animation.
- Reuse Cloudinary as the source of truth for transition media via the `loading-animation` folder.
- Keep the loading visual inside the persisted transition overlay so it survives route swaps cleanly.

## Implementation Notes

- Cloudinary folder fetching is centralized in [src/lib/cloudinary.ts](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/lib/cloudinary.ts).
- [src/layouts/Layout.astro](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/layouts/Layout.astro) fetches `loading-animation` assets server-side and passes them into the persisted [src/components/GlobalStaggeredMenu.tsx](/Users/anhnh/Desktop/pj/astropj/astro-testpj/src/components/GlobalStaggeredMenu.tsx) island.
- The global transition overlay chooses a random GIF per navigation and shows it only during the loading wait state between cover-complete and reveal-start.

## Maintenance

- Keep `loading-animation` as the Cloudinary folder name unless the layout fetch is updated to match.
- If transition media becomes too heavy, adjust the Cloudinary transformation in `Layout.astro` instead of adding local client-side resizing logic.
