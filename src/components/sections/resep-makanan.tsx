import Image from "next/image";
import { Button } from "../ui/button";

export default function ResepMakanan() {
  return (
    <section
      id="resep-makanan"
      className="relative overflow-x-clip h-screen bg-primary mb-32"
    >
      <div className="cloud-top">
        <img
          src="/assets/images/common/cloud.svg"
          alt="cloud"
          className="w-full rotate-180 absolute -top-24 left-0"
        />
      </div>

      <div className="container mx-auto px-24 h-full">
        <div className="flex items-center h-full justify-between">
          <div className="left-content w-3/4 max-w-5xl max-2xl:w-5/6 space-y-4">
            <h1 className="text-6xl max-2xl:text-5xl font-semibold">
              Bersama Kita Cegah Stunting dan Wujudkan Anak Sehat dengan MPASI
              Bergizi!
            </h1>
            <p className="text-lg font-medium text-foreground/70 tracking-wide max-2xl:w-3/4 w-full">
              Kami hanya menggunakan bahan terbaik untuk memastikan anak Anda
              mendapatkan MPASI yang bergizi. Bersama kita cegah stunting dan
              wujudkan anak sehat dengan gizi yang tepat!
            </p>
            <Button
              size={"lg"}
              variant={"outline"}
              className="bg-background text-foreground border-foreground rounded-3xl text-md font-semibold mt-6"
            >
              Resep Makanan
            </Button>
          </div>
          <div className="right-content ">
            <div className="bg-transparent relative before:content[''] before:absolute before:-top-8 before:-right-8 before:w-full before:h-full before:bg-secondary before:rounded-lg  max-w-sm">
              <Image
                width={500}
                height={500}
                alt="resep-makanan-image"
                src={"/assets/images/resep-makanan/right_picture.png"}
                className="w-full h-80 object-cover rounded-lg relative"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cloud-bottom absolute -bottom-24 left-0 w-full">
        <img
          src="/assets/images/common/cloud.svg"
          alt="cloud"
          className="w-full"
        />
      </div>
    </section>
  );
}
