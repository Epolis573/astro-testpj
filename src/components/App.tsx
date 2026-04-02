import HomePage from "./HomePage";

interface AppProps {
  items: string[];
}

export default function App({ items }: AppProps) {
  return <HomePage items={items} />;
}
