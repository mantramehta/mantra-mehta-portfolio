import { Link } from "react-router-dom";
import { Container, Eyebrow, Icon } from "../components/ui";
import { useTitle } from "../components/Case";

export default function NotFound() {
  useTitle("Page not found | Mantra Mehta");
  return (
    <Container className="py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-semibold">This page doesn’t exist.</h1>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 text-accent hover:underline">
        <Icon.ArrowLeft width={16} height={16} /> Back home
      </Link>
    </Container>
  );
}
