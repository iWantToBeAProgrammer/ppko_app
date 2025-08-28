import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ResepMakanan() {
  return (
    <section
      id="resep-makanan"
      className="relative overflow-x-clip h-screen bg-primary mb-32 max-md:h-auto max-md:min-h-screen max-md:py-12"
    >
      <div className="cloud-top">
        <Image
          width={1080}
          height={200}
          src="/assets/images/common/cloud.svg"
          alt="cloud"
          className="w-full rotate-180 absolute -top-24 left-0 max-md:-top-6"
        />
      </div>

      <div className="container mx-auto px-24 h-full max-md:px-6 max-md:h-auto">
        <div className="flex items-center h-full justify-between max-md:flex-col max-md:justify-start max-md:space-y-8 max-md:text-center max-md:pt-8">
          <div className="left-content w-3/4 max-w-5xl max-2xl:w-5/6 space-y-4 max-md:w-full max-md:space-y-6">
            <h1 className="text-6xl max-2xl:text-5xl font-semibold max-md:text-2xl max-md:leading-tight max-md:font-bold">
              Bersama Kita Cegah Stunting dan Wujudkan Anak Sehat dengan MPASI
              Bergizi!
            </h1>
            <p className="text-lg font-medium text-foreground/70 tracking-wide max-2xl:w-3/4 w-full max-md:text-sm max-md:w-full max-md:leading-relaxed">
              Kami hanya menggunakan bahan terbaik untuk memastikan anak Anda
              mendapatkan MPASI yang bergizi. Bersama kita cegah stunting dan
              wujudkan anak sehat dengan gizi yang tepat!
            </p>
            <Link href={"/resep-makanan"}>
              <Button
                size={"lg"}
                variant={"outline"}
                className="bg-background cursor-pointer text-foreground border-foreground rounded-3xl text-md font-semibold mt-6 max-md:mx-auto max-md:block max-md:w-fit max-md:px-8 max-md:py-3 max-md:text-sm"
              >
                Resep Makanan
              </Button>
            </Link>
          </div>
          <div className="right-content max-md:w-full max-md:flex max-md:justify-center max-md:mt-4">
            <div className="bg-transparent relative before:content[''] before:absolute before:-top-8 before:-right-8 before:w-full before:h-full before:bg-secondary before:rounded-lg max-w-sm max-md:before:-top-4 max-md:before:-right-4 max-md:max-w-[320px] max-md:w-full">
              <Image
                width={500}
                height={500}
                alt="resep-makanan-image"
                src={"/assets/images/resep-makanan/right_picture.webp"}
                className="w-full h-80 object-cover rounded-lg relative max-md:h-64 max-md:w-full aspect-square"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cloud-bottom absolute -bottom-24 left-0 w-full max-md:-bottom-6">
        <Image
          width={960}
          height={200}
          src="/assets/images/common/cloud.svg"
          alt="cloud"
          className="w-full"
        />
      </div>
    </section>
  );
}
