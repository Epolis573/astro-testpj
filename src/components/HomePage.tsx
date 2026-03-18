import GridMotion from "./GridMotion";
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

interface HomePageProps {
  items: string[];
}

export default function HomePage({ items }: HomePageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* Full-screen GridMotion background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <GridMotion items={items} gradientColor="rgba(0,0,0,0.6)" />
      </div>

      {/* StaggeredMenu overlay — top-right corner */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
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
          isFixed={false}
          closeOnClickAway
          logoUrl=""
        />
      </div>
    </div>
  );
}
