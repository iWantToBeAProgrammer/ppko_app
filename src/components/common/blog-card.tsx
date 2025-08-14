import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function BlogCard({
  title,
  image,
  description,
  link,
  category,
}: {
  title: string;
  image: string;
  description: string;
  link: string;
  category: string;
}) {
  return (
    <>
    <Card className="w-full max-w-sm overflow-hidden pt-0 rounded-md shadow-none border-0 outline-0 h-96">
      {/* 1. Letakkan gambar di luar CardHeader agar lebarnya penuh */}
      <Image
        width={400}
        height={150}
        className="w-full object-cover object-center rounded-4xl" 
        src={'/assets/images/article/article.png'} // Ganti dengan path gambar Anda
        alt="Pentingnya Peran Keluarga dalam Mencegah Stunting"
      />

      
      <CardHeader className="mx-0">
        <Badge className="mx-0">{category}</Badge>
        <CardTitle className="">
          {title}
        </CardTitle>
        <CardDescription className="text-md">
          {description}
        </CardDescription>
        <Link className="text-md hover:underline tracking-wider" href={link}>
          {link}
        </Link>
      </CardHeader>

    </Card>

    </>

  );
}
