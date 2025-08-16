import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ArticleCard({
  image,
  category,
  title,
  author,
}: {
  image: string;
  category: string;
  title: string;
  author: string;
}) {
  return (
    <Card className="flex flex-col sm:flex-row sm:gap-4 items-center gap-0 w-full sm:w-3/4 border-0 outline-0 px-4 sm:px-0 shadow-lg sm:shadow-none">
      <CardHeader className=" rounded-2xl w-full sm:w-1/2 p-0 sm:mb-0 mb-3">
        <Image
          width={900}
          height={420}
          src={image}
          alt={title}
          className="rounded-3xl"
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-between p-0 flex-1 gap-2">
        <Badge className="px-4 py-1 font-semibold text-md bg-primary">
          Nutrisi
        </Badge>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{author}</p>
      </CardContent>
    </Card>
  );
}
