import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Baby } from "lucide-react";
import Image from "next/image";

export default function RecipeCard({
  title,
  category,
  description,
  image,
}: {
  title: string;
  category: string;
  description: string;
  image: string;
}) {
  return (
    <Card className="pt-0 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1.5 hover:bg-primary transition-[shadow, transform] duration-200 ease-in">
      <CardHeader className="px-0">
        <Image src={image} width={720} height={400} alt={title} className="rounded-t-lg object-center object-cover aspect-square"/>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardTitle>{title}</CardTitle>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Baby /> {category}
        </span>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
