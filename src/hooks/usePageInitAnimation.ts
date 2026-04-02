import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";

export type PageInitDirection = "top" | "right" | "bottom" | "left";

interface UsePageInitAnimationProps {
  pageRef: RefObject<HTMLElement | null>;
  overlayRef?: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  direction?: PageInitDirection;
  itemSelector?: string;
  dividerSelector?: string;
  delay?: number;
}

const directionOffsetMap: Record<
  PageInitDirection,
  { x: number; y: number; skewX: number; skewY: number }
> = {
  bottom: { x: 0, y: 60, skewX: 0, skewY: 2 },
  top: { x: 0, y: -60, skewX: 0, skewY: -2 },
  left: { x: -60, y: 0, skewX: -3, skewY: 0 },
  right: { x: 60, y: 0, skewX: 3, skewY: 0 },
};

export function usePageInitAnimation({
  pageRef,
  overlayRef,
  contentRef,
  direction = "bottom",
  itemSelector = "[data-page-init-item]",
  dividerSelector = "[data-page-init-divider]",
  delay = 0.22,
}: UsePageInitAnimationProps) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = contentRef.current;
      const overlayContainer = overlayRef?.current;
      if (!container) return;

      const slideEls = container.querySelectorAll(itemSelector);
      const dividerEl = container.querySelector(dividerSelector);
      const wipeEls = overlayContainer
        ? (Array.from(
            overlayContainer.querySelectorAll(".wipe-layer"),
          ) as HTMLElement[])
        : [];

      const offset = directionOffsetMap[direction];

      if (slideEls.length) {
        gsap.set(slideEls, {
          x: offset.x,
          y: offset.y,
          opacity: 0,
          skewX: offset.skewX,
          skewY: offset.skewY,
        });
      }

      if (dividerEl) {
        gsap.set(dividerEl, { scaleX: 0, transformOrigin: "left center" });
      }

      if (wipeEls.length) {
        gsap.set(wipeEls, { yPercent: 0 });
      }

      const master = gsap.timeline({ delay });

      if (wipeEls.length) {
        master.to(wipeEls, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: { each: 0.08, from: "end" },
        });
      }

      if (slideEls.length) {
        master.to(
          slideEls,
          {
            x: 0,
            y: 0,
            opacity: 1,
            skewX: 0,
            skewY: 0,
            duration: 1,
            ease: "power4.out",
            stagger: { each: 0.1, from: "start" },
          },
          wipeEls.length ? "-=0.4" : 0.05,
        );
      }

      if (dividerEl) {
        master.to(
          dividerEl,
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          wipeEls.length ? "-=0.9" : 0.2,
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [
    contentRef,
    delay,
    direction,
    dividerSelector,
    itemSelector,
    overlayRef,
    pageRef,
  ]);
}

export default usePageInitAnimation;
