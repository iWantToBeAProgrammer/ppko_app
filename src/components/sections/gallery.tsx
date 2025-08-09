import Image from "next/image";

export default function Gallery() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="gallery-image-wrapper grid grid-flow-row grid-cols-6 grid-rows-2 gap-2">
        <Image
          width={800}
          height={300}
          src={"/assets/images/gallery/landscape.jpg"}
          alt="test gambar"
          className="col-span-3 object-cover object-center row-span-2 h-96"
        />

        <div className="image-title-wrapper p-12 bg-primary flex flex-col gap-4 col-span-3 row-span-2 h-96 justify-center">
          <h4 className="text-[#FF7728] tracking-wider text-sm uppercase font-semibold">
            Galeri
          </h4>
          <h1 className="text-4xl font-semibold">
            Mencegah Stunting di Desa Gumawang
          </h1>

          <p className="text-lg">
            “Kegiatan pencegahan stunting di Desa Gumawang bertujuan untuk
            meningkatkan kesadaran masyarakat tentang pentingnya gizi seimbang
            bagi tumbuh kembang anak.
          </p>
        </div>

        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/landscape.jpg"}
          alt="test gambar"
          className="col-span-2 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/landscape.jpg"}
          alt="test gambar"
          className="col-span-1 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/landscape.jpg"}
          alt="test gambar"
          className="col-span-2 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/landscape.jpg"}
          alt="test gambar"
          className="col-span-1 object-cover object-center h-48"
        />
      </div>
    </div>
  );
}
