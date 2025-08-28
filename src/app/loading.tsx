import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <Loader2 size={64} className="animate-spin stroke-primary"/>
    </div>
  );
}
