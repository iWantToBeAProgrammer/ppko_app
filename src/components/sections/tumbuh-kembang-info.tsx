import Image from "next/image";

export default function TumbuhKembangInfo() {
  return (
    <section
      id="tumbuh-kembang-info"
      className="mt-32 h-screen w-full bg-gradient-to-b from-background to-secondary"
    >
      <div className="container mx-auto  h-full overflow-x-hidden py-16">
        <div className="relative h-full px-6 flex justify-center">
          <img
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-top"
            className="absolute top-0 left-0 w-24 h-22"
          />

          <div className="content-wrapper flex items-start justify-between  ">
            <div className="content-left relative w-1/2 h-3/4  flex items-center justify-center top-25">
                <Image width={400} height={400} src={"/assets/images/tumbuh-kembang/gambar-3.png"} alt="tumbuh-kembang" className="absolute top-3 right-5 rounded-lg"/>
                <Image width={400} height={400} src={"/assets/images/tumbuh-kembang/gambar-2.png"} alt="tumbuh-kembang" className="absolute rounded-lg"/>
                <Image width={380} height={380} src={"/assets/images/tumbuh-kembang/gambar-1.svg"} alt="tumbuh-kembang" className="absolute left-12 bottom-14 rounded-lg"/>
            </div>
            <div className="content-right  self-center w-1/2 pl-12">
                <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                    Kenapa Pilih MPASI Bergizi Untuk Anak Anda?
                </h1>
                
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                    Kami menyediakan informasi dan resep MPASI untuk membantu 
                    anak Anda tumbuh sehat. Dengan menu yang tepat, kita 
                    bersama-sama mencegah stunting dan mendukung 
                    perkembangan anak yang optimal.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ">
                            <img src="/assets/images/tumbuh-kembang/Shield Done.svg" className="w-30 h-30" alt="Shield Done" />
                        </div>
                        <span className="text-slate-700 text-xl">Menu MPASI Sehat</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ">
                            <img src="/assets/images/tumbuh-kembang/Shield Done.svg" className="w-30 h-30" alt="Shield Done" />
                        </div>
                        <span className="text-slate-700 text-xl">Pencegahan Stunting</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ">
                            <img src="/assets/images/tumbuh-kembang/Shield Done.svg" className="w-30 h-30" alt="Shield Done" />
                        </div>
                        <span className="text-slate-700 text-xl">Edukasi Stunting dan Gizi Seimbang</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center ">
                            <img src="/assets/images/tumbuh-kembang/Shield Done.svg" className="w-30 h-30" alt="Shield Done" />
                        </div>
                        <span className="text-slate-700 text-xl">Dapatkan Panduan Gizi Anak dengan Mudah</span>
                    </div>
                </div>
            </div>

          </div>
          <img
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-bottom"
            className="absolute bottom-0 right-0 w-22 h-22"
          />
        </div>
      </div>
      <h1>Tumbuh Kembang info</h1>
    </section>
  );
}