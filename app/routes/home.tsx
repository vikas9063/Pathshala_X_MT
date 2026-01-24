import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pathshala X" },
    { name: "description", content: "Advanced Patshala X App" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      <Button>Click Me </Button>
    </div>
  );
}
