import Image from "next/image";

export default function TumbuhKembangInfo() {
  return (
    <section
      id="tumbuh-kembang-info"
      className="mt-32 h-screen w-full bg-gradient-to-b from-background to-secondary"
    >
      <div className="container mx-auto  h-full overflow-x-hidden px-8 py-24">
        <div className="relative h-full px-6">
          <img
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-top"
            className="absolute top-0 left-0 w-12 h-12"
          />

          <div className="content-wrapper flex items-center justify-between h-full">


            <div className="content-left relative w-1/2 h-3/4  flex items-center justify-center">
                <Image width={400} height={400} src={"/assets/images/resep-makanan/right_picture.png"} alt="tumbuh-kembang" className="absolute top-12 right-12"/>
                <Image width={400} height={400} src={"/assets/images/resep-makanan/right_picture.png"} alt="tumbuh-kembang" className="absolute"/>
                <Image width={400} height={400} src={"/assets/images/resep-makanan/right_picture.png"} alt="tumbuh-kembang" className="absolute left-12 bottom-12"/>
            </div>

            <div className="content-right">
                <h1>right content</h1>
            </div>

          </div>
          <img
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-bottom"
            className="absolute bottom-0 right-0 w-12 h-12"
          />
        </div>
      </div>
      <h1>Tumbuh Kembang info</h1>
    </section>
  );
}
