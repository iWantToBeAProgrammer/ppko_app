import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CircleArrowRight } from "lucide-react";

type AppCardProps = {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  link: string;
};

export default function AppCard({
  icon,
  title,
  description,
  link,
}: AppCardProps) {
  return (
    <Card className="w-full border border-primary relative h-80 hover:bg-primary hover:-translate-y-1 shadow-lg transition-[colors, transform] duration-300 hover:*:*:first:bg-[#FFD5E1] hover:*:*:first:text-black">
      <CardContent className="text-center flex flex-col items-center justify-between py-4 h-full ">
        <div className="flex justify-center items-center bg-secondary text-white w-16 h-16 rounded-full mb-4">
          {React.createElement(icon, {size: 24})}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-foreground/70 mt-2">{description}</p>
        <a
          href={link}
          className="text-foreground underline mt-4 hover:text-foreground/80"
        >
          Pelajari Lebih Lanjut
          <span>
            <CircleArrowRight size={16} className="inline ml-1" />
          </span>
        </a>
      </CardContent>
    </Card>
  );
}
