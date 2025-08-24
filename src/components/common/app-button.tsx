import { Button } from "../ui/button";

export default function AppButton({ text }: { text: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button size={"lg"} variant={"outline"}>
        {text}
      </Button>
    </div>
  );
}
