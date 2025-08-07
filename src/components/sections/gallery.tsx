import Image from "next/image";

export default function Gallery() {
  return (
    <div className="w-full max-w-sm mt-32">
      <Image width={200} height={200} src={"https://picsum.photos/200/300"} alt="test gambar"/>
    </div>
  );
}
