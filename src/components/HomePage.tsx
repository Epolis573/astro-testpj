import GridMotion from "./GridMotion";

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
    </div>
  );
}
