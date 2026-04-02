import {
  navigate,
  TRANSITION_AFTER_SWAP,
  TRANSITION_PAGE_LOAD,
} from "astro:transitions/client";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { StaggeredMenu } from "./StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com/Epolis573" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const ROUTE_TRANSITION_KEY = "route-transition-pending";

interface GlobalStaggeredMenuProps {
  loadingAnimations?: string[];
}

export default function GlobalStaggeredMenu({
  loadingAnimations = [],
}: GlobalStaggeredMenuProps) {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const [activeLoadingGif, setActiveLoadingGif] = useState<string | null>(null);
  const [showLoadingGif, setShowLoadingGif] = useState(false);
  const overlayId = "route-transition-overlay";
  const overlayLayerSelector = ".global-wipe-layer";

  const pickRandomLoadingGif = useCallback(() => {
    if (!loadingAnimations.length) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * loadingAnimations.length);
    return loadingAnimations[randomIndex] ?? null;
  }, [loadingAnimations]);

  useLayoutEffect(() => {
    const container = document.getElementById(overlayId);
    if (!container) return;

    const wipeEls = Array.from(
      container.querySelectorAll(overlayLayerSelector),
    ) as HTMLElement[];

    if (!wipeEls.length) return;

    gsap.set(wipeEls, { xPercent: 100 });
  }, []);

  const playReveal = useCallback(() => {
    const container = document.getElementById(overlayId);
    if (!container) return;

    const wipeEls = Array.from(
      container.querySelectorAll(overlayLayerSelector),
    ) as HTMLElement[];

    if (!wipeEls.length) return;

    gsap.killTweensOf(wipeEls);
    gsap.set(wipeEls, { xPercent: 0 });
    setShowLoadingGif(false);

    gsap.to(wipeEls, {
      xPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
      stagger: { each: 0.07, from: "end" },
      onComplete: () => {
        gsap.set(wipeEls, { xPercent: 100 });
        setActiveLoadingGif(null);
      },
    });
  }, []);

  useEffect(() => {
    const syncPathname = () => {
      setPathname(window.location.pathname);
    };

    const handleAfterSwap = () => {
      syncPathname();
      if (window.sessionStorage.getItem(ROUTE_TRANSITION_KEY) === "1") {
        window.sessionStorage.removeItem(ROUTE_TRANSITION_KEY);
        playReveal();
      }
    };

    document.addEventListener(TRANSITION_AFTER_SWAP, handleAfterSwap);
    document.addEventListener(TRANSITION_PAGE_LOAD, syncPathname);
    window.addEventListener("popstate", syncPathname);
    syncPathname();

    return () => {
      document.removeEventListener(TRANSITION_AFTER_SWAP, handleAfterSwap);
      document.removeEventListener(TRANSITION_PAGE_LOAD, syncPathname);
      window.removeEventListener("popstate", syncPathname);
    };
  }, [playReveal]);

  const showLogo = pathname !== "/about";

  const handleItemClick = useCallback((href: string) => {
    if (href === window.location.pathname) return;

    const container = document.getElementById(overlayId);
    if (!container) {
      navigate(href);
      return;
    }

    const wipeEls = Array.from(
      container.querySelectorAll(overlayLayerSelector),
    ) as HTMLElement[];

    if (!wipeEls.length) {
      navigate(href);
      return;
    }

    gsap.killTweensOf(wipeEls);
    gsap.set(wipeEls, { xPercent: 100 });

    gsap.to(wipeEls, {
      xPercent: 0,
      duration: 0.5,
      ease: "power4.out",
      stagger: { each: 0.07, from: "start" },
      onComplete: () => {
        setActiveLoadingGif(pickRandomLoadingGif());
        setShowLoadingGif(true);
        window.sessionStorage.setItem(ROUTE_TRANSITION_KEY, "1");
        navigate(href);
      },
    });
  }, [pickRandomLoadingGif]);

  return (
    <>
      <div
        id={overlayId}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: showLoadingGif ? 1 : 0,
            transition: "opacity 180ms ease-out",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "min(40vw, 18rem)",
              minWidth: "12rem",
              aspectRatio: "1 / 1",
              borderRadius: "1.5rem",
              background: activeLoadingGif
                ? `center / cover no-repeat url(${activeLoadingGif})`
                : "rgba(255, 255, 255, 0.14)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.22)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />
        </div>

        <div
          className="global-wipe-layer"
          style={{
            position: "absolute",
            inset: 0,
            background: "#629BB5",
            willChange: "transform",
            zIndex: 0,
          }}
        />
        <div
          className="global-wipe-layer"
          style={{
            position: "absolute",
            inset: 0,
            background: "#B9D8E1",
            willChange: "transform",
            zIndex: 1,
          }}
        />
        <div
          className="global-wipe-layer"
          style={{
            position: "absolute",
            inset: 0,
            background: "#ffffff",
            willChange: "transform",
            zIndex: 1,
          }}
        />
      </div>

      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#629BB5", "#B9D8E1"]}
        accentColor="#00b3ff"
        isFixed={true}
        showLogo={showLogo}
        closeOnClickAway
        logoUrl=""
        onItemClick={handleItemClick}
      />
    </>
  );
}
