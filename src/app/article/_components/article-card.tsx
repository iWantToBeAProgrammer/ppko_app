import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <Card className="flex flex-col sm:flex-row sm:gap-4 items-center gap-0 w-full  border-0 outline-0 px-4 sm:px-0 shadow-lg sm:shadow-none">
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
        <Link href={link}>
          <CardTitle className="text-xl hover:underline">{title}</CardTitle>
        </Link>
        <p className="text-muted-foreground">{"Dibuat oleh: Admin"}</p>
      </CardContent>
    </Card>
  );
}
