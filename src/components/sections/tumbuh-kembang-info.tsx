"use client";

import Image from "next/image";
import { useState } from "react";

export default function TumbuhKembangInfo() {
  // Array posisi tetap berdasarkan index
  const positionClasses = [
    "absolute left-4 bottom-4 group z-20",
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group z-10",
    "absolute right-4 top-4 group",
  ];

  // Array untuk menyimpan data gambar
  const initialGambarArray = [
    {
      id: 1,
      src: "/assets/images/tumbuh-kembang/gambar-1.svg",
      alt: "Gambar Tumbuh Kembang 1",
    },
    {
      id: 2,
      src: "/assets/images/tumbuh-kembang/gambar-2.png",
      alt: "Gambar Tumbuh Kembang 2",
    },
    {
      id: 3,
      src: "/assets/images/tumbuh-kembang/gambar-3.png",
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
      className="mt-32 h-screen w-full bg-gradient-to-b from-white from-5% via-amber-100 via-50% to-white to-99%"
    >
      <div className="container mx-auto h-full overflow-x-hidden py-16">
        <div className="relative h-full px-6 flex justify-center">
          <img
            src="/assets/images/tumbuh-kembang/triangle.svg"
            alt="triangle-top"
            className="absolute top-0 left-0 w-24 h-22"
          />

          <div className="content-wrapper flex items-center justify-center">
            <div className="content-left w-1/2 h-[445px] p-10 hover:p-0 flex items-center justify-center transition-all duration-300">
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
                        className="rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:brightness-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-right self-center w-1/2 pl-12 h-[445px]">
              <h1 className="text-[38px] font-bold text-slate-800 mb-4 leading-tight">
                Kenapa Pilih MPASI Bergizi Untuk Anak Anda?
              </h1>

              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Kami menyediakan informasi dan resep MPASI untuk membantu anak
                Anda tumbuh sehat. Dengan menu yang tepat, kita bersama-sama
                mencegah stunting dan mendukung perkembangan anak yang optimal.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium">
                    Menu MPASI Sehat
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium">
                    Pencegahan Stunting
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium">
                    Edukasi Stunting dan Gizi Seimbang
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/assets/images/tumbuh-kembang/Shield Done.svg"
                      className="w-6 h-6"
                      alt="Shield Done"
                    />
                  </div>
                  <span className="text-slate-700 text-lg font-medium">
                    Dapatkan Panduan Gizi Anak dengan Mudah
                  </span>
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
    </section>
  );
}
