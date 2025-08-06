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

export default function BlogCard({
  title,
  image,
  writer,
}: {
  title: string;
  image: string;
  writer: string;
}) {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0 rounded-md">
      {/* 1. Letakkan gambar di luar CardHeader agar lebarnya penuh */}
      <Image
        width={400}
        height={150}
        className="w-full object-cover" // object-cover agar gambar tidak gepeng
        src={"https://picsum.photos/300/150"} // Ganti dengan path gambar Anda
        alt="Pentingnya Peran Keluarga dalam Mencegah Stunting"
      />

      {/* 2. Gunakan CardHeader untuk membungkus judul dan deskripsi */}
      <CardHeader className="">
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {writer}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
