import Image from "next/image";

export default function Gallery() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center my-64 sm:my-0 px-2">
      <div className="gallery-image-wrapper grid grid-flow-row grid-cols-3 sm:grid-cols-6 gap-2">
        <Image
          width={800}
          height={300}
          src={"/assets/images/gallery/galeri-1.webp"}
          alt="test gambar"
          className="col-span-3 object-cover object-center sm:row-span-2 h-96"
        />

        <div className="image-title-wrapper p-12 bg-primary flex flex-col gap-4 col-span-3 sm:row-span-2 h-96 justify-center">
          <h4 className="text-[#FF7728] tracking-wider text-sm uppercase font-semibold">
            Galeri
          </h4>
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Mencegah Stunting di Desa Gumawang
          </h1>

          <p className="text-md sm:text-lg">
            “Kegiatan pencegahan stunting di Desa Gumawang bertujuan untuk
            meningkatkan kesadaran masyarakat tentang pentingnya gizi seimbang
            bagi tumbuh kembang anak.
          </p>
        </div>

        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/galeri-2.webp"}
          alt="test gambar"
          className="col-span-2 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/galeri-3.webp"}
          alt="test gambar"
          className="col-span-1 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/galeri-4.webp"}
          alt="test gambar"
          className="col-span-2 object-cover object-center h-48"
        />
        <Image
          width={700}
          height={300}
          src={"/assets/images/gallery/galeri-5.webp"}
          alt="test gambar"
          className="col-span-1 object-cover object-center h-48"
        />
      </div>
    </div>
  );
}
