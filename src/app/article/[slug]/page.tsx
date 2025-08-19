import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DetailArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Tombol Kembali - Pojok Kiri Atas */}
      <div className="absolute top-45 left-15 z-10 max-md:left-2">
        <a
          href="/article"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2 text-xl"
        >
          <span className="mr-2 text-2xl font-medium">⟵</span>
          Kembali
        </a>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl pt-60">
        
        {/* Header Artikel */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Artikel Kesehatan (Determinan Faktor Budaya Pada Kejadian Stunting Di Indonesia)
          </h1>
          <p className="text-lg text-gray-600 font-medium text-center">
            Oleh: Ade Fadly H Masse
          </p>
        </div>

        {/* Gambar Utama */}
        <div className="mb-8">
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/assets/images/article/article.png"
              alt="Tim kolaborasi dalam penelitian kesehatan"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Konten Artikel */}
        <Card className="border-0 shadow-none" style={{ backgroundColor: '#f7f9fa' }}>
          <CardContent className="p-6 md:p-8">
                         <div className="prose prose-lg max-w-none">
               {/* Pendahuluan */}
               <section className="mb-8">
                 <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                Stunting adalah gangguan pertumbuhan linearitas yang dapat diukur dengan z-score tinggi badan menurut umur (TB/U). Stunting disebabkan oleh adanya malnutrisi kronis atau penyakit menular kronis. Faktor pendorong dari terjadinya stunting, bisa disebabkan seperti keadaan sosial ekonomi, nutrisi yang didapatkan saat kehamilan, morbiditas bayi dan asupan gizi bayi 1. Stunting menjadikan anak lebih mudah terkena penyakit dan produktivitas 2. Stunting menurut 3 adalah masalah kurang gizi kronis yang bisa dilihat dengan tubuh pendek.
                Ada beragam faktor yang memicu terjadinya stunting pada anak. Menurut kerangka konseptual WHO, aspek sosial budaya turut berperan dalam perkembangan anak. Di Indonesia, tingginya angka stunting sebagian besar dipengaruhi oleh faktor budaya dalam layanan kesehatan, seperti kepercayaan masyarakat terhadap larangan makanan tertentu yang mengurangi asupan gizi anak. Beberapa komunitas bahkan menganggap stunting sebagai hal yang wajar dan tidak memerlukan intervensi medis, melainkan dianggap sebagai anugerah Tuhan atau takdir yang harus diterima. Keyakinan semacam itu berpengaruh pada praktik pemberian nutrisi kepada ibu hamil dan bayi. Selain itu, minimnya pelayanan kesehatan yang mengintegrasikan nilai budaya turut membuat upaya intervensi gizi terlihat negatif dalam masyarakat 4.
                </p>
              </section>

              <Separator className="my-8" />

                             {/* Fakta Tentang Stunting */}
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Fakta Tentang Stunting</h2>
                 <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                   Stunting adalah kondisi terhambatnya pertumbuhan pada balita akibat malnutrisi kronis, terutama selama "1.000 Hari Pertama Kehidupan". Asupan nutrisi yang tidak memadai dalam jangka waktu lama dan infeksi berulang berkontribusi terhadap kondisi ini.
                 </p>
                 <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                   Stunting didiagnosis ketika panjang atau tinggi badan anak berada di bawah standar nasional dan dapat menyebabkan risiko lebih tinggi terhadap penyakit tidak menular di masa dewasa, seperti diabetes melitus, kanker, penyakit jantung, dan hipertensi.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   Menurut WHO/UNICEF/The World Bank, prevalensi stunting global mencapai 22% anak di bawah 5 tahun pada 2020, turun dari 33,1% pada 2000. Pada 2020, hampir dua perlima anak stunting tinggal di Asia Selatan dan Sub-Sahara Afrika. Di Indonesia, prevalensi stunting mencapai 31,8% pada 2020, menempati peringkat kedua di Asia Tenggara. Data nasional dari Riskesdas menunjukkan 37,2% (2013), 30,8% (2018), dan SSGI menunjukkan 24,4% (2021), 21,0% (2022).
                 </p>
              </section>

              <Separator className="my-8" />

                             {/* Pengaruh Budaya */}
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Pengaruh Budaya Pada Kejadian Stunting</h2>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   Pengaruh budaya secara signifikan berdampak pada pola pikir dan perilaku masyarakat, yang dapat menyebabkan stunting pada anak. Faktor budaya seperti pola asuh dan tradisi tertentu seringkali tidak mendukung pola makan sehat dan bergizi untuk anak, sehingga berkontribusi terhadap masalah ini.
                 </p>
              </section>

              <Separator className="my-8" />

                             {/* Pola Konsumsi Makanan */}
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Pola Konsumsi Makanan Dalam Budaya Lokal</h2>
                 <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                   Praktik budaya tertentu dapat berdampak negatif pada pola konsumsi makanan. Di Lombok, misalnya, terdapat praktik memberikan pisang dan nasi kepada bayi di bawah 4 bulan, meyakini bahwa diare dan muntah setelah 6 bulan adalah tanda pertumbuhan gigi yang sehat, membatasi konsumsi ayam hanya pada hari tertentu, menghindari santan dan makanan goreng karena diyakini menyebabkan penyakit, serta mencari dukun tradisional ("sando") untuk air doa ketika anak sakit.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   Praktik-praktik budaya ini menunjukkan betapa pentingnya memahami dan mengatasi hambatan budaya dalam upaya pencegahan dan penanganan stunting di Indonesia.
                 </p>
              </section>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
