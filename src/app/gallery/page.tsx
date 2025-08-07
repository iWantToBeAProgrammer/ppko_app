import Image from "next/image";

export default function Gallery() {
  return (
    <div className="pt-5 w-full relative">
      <div className="w-full mx-auto h-96 rounded-[75%] -translate-y-50 bg-white z-10 absolute -top-18 -left-100 -right-100"></div>
      <div className="image-wrapper w-full h-96 grid grid-flow-row grid-cols-4 gap-1 perspective-distant container mx-auto">
        {/* <Image width={900} height={300} src={"/assets/images/gallery/landscape.jpg"} alt="landscape-picture" className="object-cover w-full h-full"/> */}

        <div
          className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -y-2 "
          style={{
            backgroundSize: "400% 100%",
            backgroundPosition: "0% 0%",
          }}
        ></div>

        <div
          className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat"
          style={{
            backgroundSize: "400% 100%",
            backgroundPosition: "33.3333% 0%",
          }}
        ></div>

        <div
          className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat"
          style={{
            backgroundSize: "400% 100%",
            backgroundPosition: "66.6666% 0%",
          }}
        ></div>

        <div
          className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -y-2 "
          style={{
            backgroundSize: "400% 100%",
            backgroundPosition: "100% 0%",
          }}
        ></div>
      </div>
      <div className="w-full mx-auto h-96 rounded-[75%] bg-black translate-y-38 absolute -bottom-28 z-10 -left-100 -right-100"></div>
    </div>
  );
}
