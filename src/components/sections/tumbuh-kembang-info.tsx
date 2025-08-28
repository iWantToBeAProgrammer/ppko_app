"use client";

import Image from "next/image";
import { useState } from "react";

export default function TumbuhKembangInfo() {
  // Array posisi tetap berdasarkan index
  const positionClasses = [
    "absolute left-4 bottom-4 group z-20 max-md:left-2 max-md:bottom-2",
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group z-10",
    "absolute right-4 top-4 group max-md:right-2 max-md:top-2",
  ];

  // Array untuk menyimpan data gambar
  const initialGambarArray = [
    {
      id: 1,
      src: "/assets/images/tumbuh-kembang/gambar-1.webp",
      alt: "Gambar Tumbuh Kembang 1",
    },
    {
      id: 2,
      src: "/assets/images/tumbuh-kembang/gambar-2.webp",
      alt: "Gambar Tumbuh Kembang 2",
    },
    {
      id: 3,
      src: "/assets/images/tumbuh-kembang/gambar-3.webp",
      alt: "Gambar Tumbuh Kembang 3",
    },
  ];

  // State untuk mengelola array gambar
  const [gambarArray, setGambarArray] = useState(initialGambarArray);

  // Fungsi untuk memindahkan gambar ke posisi pertama
  const handleClick = (clickedId: number) => {
    setGambarArray((prevArray) => {
      // Cari index gambar yang di-click
      const clickedIndex = prevArray.findIndex(
        (gambar) => gambar.id === clickedId
      );

      if (clickedIndex === 0) return prevArray; // Jika sudah di posisi pertama, tidak perlu mengubah

      // Buat array baru dengan gambar yang di-click di posisi pertama
      const newArray = [...prevArray];
      const clickedGambar = newArray.splice(clickedIndex, 1)[0];
      newArray.unshift(clickedGambar);

      return newArray;
    });
  };

  return (
    <section
      id="tumbuh-kembang-info"
      className="mt-32 h-screen  w-full bg-gradient-to-b from-white from-5% via-amber-100 via-50% to-white to-99% max-md:h-auto max-md:min-h-screen max-md:mt-16"
    >
      <div className="container mx-auto h-full overflow-hidden py-16 max-md:py-12">
        <div className="relative h-full px-6 flex justify-center max-md:px-4">
          <Image
            width={720}
            height={720}
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-top"
            className="absolute top-0 left-0 w-24 h-22 max-md:w-12 max-md:h-13"
          />

          <div className="content-wrapper flex items-center justify-center max-md:flex-col max-md:space-y-8">
            <div className="content-left w-1/2 h-[445px] p-10 hover:p-0 flex items-center justify-center transition-all duration-300 max-md:w-full max-md:h-64 max-md:p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Render gambar menggunakan array */}
                {gambarArray.map((gambar, index) => (
                  <div
                    key={gambar.id}
                    className={positionClasses[index]}
                    onClick={() => handleClick(gambar.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        width={360}
                        height={360}
                        src={gambar.src}
                        alt={gambar.alt}
                        className="rounded-lg transition-all aspect-video duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:brightness-110 max-md:w-40 max-md:h-40 object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-right self-center w-1/2 pl-12 h-[445px] max-md:w-full max-md:pl-0 max-md:h-auto max-md:-mt-4">
              <h1 className="text-[38px] font-bold text-slate-800 mb-4 leading-tight max-md:text-2xl max-md:mb-6 max-md:text-center">
                Kenapa Pilih MPASI Bergizi Untuk Anak Anda?
              </h1>

              <p className="text-slate-600 mb-8 text-lg leading-relaxed max-md:text-sm max-md:mb-6 max-md:leading-relaxed">
                Kami menyediakan informasi dan resep MPASI untuk membantu anak
                Anda tumbuh sehat. Dengan menu yang tepat, kita bersama-sama
                mencegah stunting dan mendukung perkembangan anak yang optimal.
              </p>

              <div className="space-y-6 max-md:space-y-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4 max-md:mr-2 max-md:w-6 max-md:h-6">
                    <Image
                      width={720}
                      height={720}
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6 max-md:w-4 max-md:h-4"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium max-md:text-base">
                    Menu MPASI Sehat
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4 max-md:mr-2 max-md:w-6 max-md:h-6">
                    <Image
                      width={720}
                      height={720}
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6 max-md:w-4 max-md:h-4"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium max-md:text-base">
                    Pencegahan Stunting
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4 max-md:mr-2 max-md:w-6 max-md:h-6">
                    <Image
                      width={720}
                      height={720}
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6 max-md:w-4 max-md:h-4"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium max-md:text-base">
                    Edukasi Stunting dan Gizi Seimbang
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4 max-md:mr-2 max-md:w-6 max-md:h-6">
                    <Image
                      width={720}
                      height={720}
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6 max-md:w-4 max-md:h-4"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium max-md:text-base">
                    Dapatkan Panduan Gizi Anak dengan Mudah
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Image
            width={720}
            height={720}
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-bottom"
            className="absolute bottom-[-3.3rem] right-0 w-22 h-22 max-md:w-12 max-md:h-13"
          />
        </div>
      </div>
    </section>
  );
}
