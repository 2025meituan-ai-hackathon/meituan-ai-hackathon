import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>首页</h1>
      <p>欢迎使用 TanStack Router</p>
      <Button>Click me</Button>
      <Calendar
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
    </div>
  );
}
