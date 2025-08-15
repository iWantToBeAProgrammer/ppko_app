"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function CalculatorPage() {
  // State untuk form input
  const [gender, setGender] = useState('Perempuan');
  const [birthDate, setBirthDate] = useState('25/02/2025');
  const [height, setHeight] = useState('30.00');
  const [showResult, setShowResult] = useState(false);
  const [measurementResult, setMeasurementResult] = useState({
    status: 'Stunting Berat',
    zScore: '2.90',
    keterangan: 'segera konsultasikan ke dokter/puskesmas.'
  });

  // Data rekomendasi makanan
  const foodRecommendations = [
    {
      id: 1,
      image: '/assets/images/resep-makanan/right_picture.png',
      title: 'Bubur Ayam Ga Enak Kemaren',
      duration: '30 Mins',
      description: 'Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...'
    },
    {
      id: 2,
      image: '/assets/images/resep-makanan/right_picture.png',
      title: 'Bubur Ayam Ga Enak Kemaren',
      duration: '30 Mins',
      description: 'Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...'
    },
    {
      id: 3,
      image: '/assets/images/resep-makanan/right_picture.png',
      title: 'Bubur Ayam Ga Enak Kemaren',
      duration: '30 Mins',
      description: 'Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...'
    },
    {
      id: 4,
      image: '/assets/images/resep-makanan/right_picture.png',
      title: 'Bubur Ayam Ga Enak Kemaren',
      duration: '30 Mins',
      description: 'Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...'
    },
    {
      id: 5,
      image: '/assets/images/resep-makanan/right_picture.png',
      title: 'Bubur Ayam Ga Enak Kemaren',
      duration: '30 Mins',
      description: 'Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 pt-55 z-[-1] sm:p-4 sm:pt-55">
      {/* Card utama dengan gradient background */}
      <div className="relative mb-8 w-full sm:w-auto">
        <div className="relative w-full h-[15.8rem] sm:w-[85rem] sm:h-[45rem] bg-gradient-to-b from-pink-0 to-pink-200 rounded-2xl overflow-hidden">
          <Image
            src="/assets/images/calculator/garis-garis.svg"
            alt="background pattern"
            width={1500}
            height={740}
            className="absolute inset-0 w-full h-full sm:w-[150rem] sm:h-[58rem] object-cover"
          />
        </div>
        
        {/* Card tambahan yang menumpuk di atas dengan ukuran lebih kecil */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[90%] h-[16rem] sm:top-12 sm:w-[75rem] sm:h-[40rem] bg-transparent rounded-xl overflow-hidden">
        <Image
              src="/assets/images/calculator/gambar bayi.svg"
              alt="gambar bayi"
              width={700}
              height={700}
              className="w-full h-full object-contain"
            />
        </div>
      </div>

      {/* Form Kalkulator Stunting */}
      <div className="w-full max-w-4xl mt-[-4rem] sm:mt-[-8rem] z-[1] mb-16 px-4 sm:px-0">
        <Card className="shadow-lg border-grey w-full">
          {/* Header Card */}
          <CardHeader className="text-center pb-4 mt-4 sm:mt-8 px-4 sm:px-0">
            <CardTitle className="text-2xl sm:text-4xl font-bold text-gray-800">
              Kalkulator Stunting Anak
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-gray-600">
              Masukkan data anak anda untuk memeriksa status pertumbuhan
            </CardDescription>
          </CardHeader>

          {/* Content Card */}
          <CardContent className="px-4 sm:px-8 pb-6">
            {/* Form Input Container */}
            <Card className="bg-white border-black">
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                  {/* Input Jenis Kelamin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Jenis Kelamin
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                    >
                      <option value="Perempuan">Perempuan</option>
                      <option value="Laki-laki">Laki-laki</option>
                    </select>
                  </div>

                  {/* Input Tanggal Lahir */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Tanggal Lahir Anak
                    </label>
                    <input
                      type="text"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                    />
                  </div>

                  {/* Input Tinggi Badan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Tinggi/Panjang Badan Anak
                      <span className="text-sm font-normal text-gray-500 ml-1 sm:ml-2">
                        (Cm, misal 75.5)
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                    />
                  </div>

                  <CardFooter className="flex justify-center mt-8 sm:mt-12">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-pink-200 border border-black text-gray-800 font-medium rounded-md hover:bg-pink-300 transition-colors duration-200"
                    >
                      Cek Status Stunting
                    </button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Tampilan Hasil Pengukuran */}
      {showResult && (
        <div className="w-full max-w-2xl mb-16 px-4 sm:px-0">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Hasil Pengukuran
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Masukkan data anak anda untuk memeriksa status pertumbuhan
            </p>
          </div>

          {/* Card Hasil */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-20 sm:w-25 text-sm sm:text-base">Status <span className='text-gray-800 ml-2 sm:ml-11'>:</span></span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{measurementResult.status}</span>
                </div>
                <div className="flex items-center">
                <span className="text-gray-500 font-medium w-20 sm:w-26 text-sm sm:text-base">Z-score<span className='text-gray-800 ml-2 sm:ml-10'>:</span></span>
                <span className="text-gray-800 font-bold text-sm sm:text-base">{measurementResult.zScore}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-20 sm:w-25 text-sm sm:text-base">Keterangan <span className='text-gray-800 ml-1 sm:ml-[0.3rem]'>:</span></span>
                  <span className="text-gray-800 font-bold flex-1 text-sm sm:text-base">{measurementResult.keterangan}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Section Rekomendasi Makanan */}
      {showResult && (
        <div className="w-full max-w-6xl mt-[3rem] sm:mt-[5rem] px-4 sm:px-0">
          {/* Header Rekomendasi */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Rekomendasi Makanan
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Masukkan data anak anda untuk memeriksa status pertumbuhan
            </p>
          </div>

          {/* Carousel Rekomendasi Makanan */}
          <div className="w-full flex justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-full"
            >
              <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
                {foodRecommendations.map((food, index) => (
                  <CarouselItem
                    key={food.id}
                    className="pl-1 sm:pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="pt-4 sm:pt-6">
                      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm h-full pb-0 py-0">
                        <CardContent className="p-0">
                          {/* Gambar Makanan */}
                          <div className="relative w-full h-40 sm:h-48 rounded-t-xl overflow-hidden">
                            <Image
                              src={food.image}
                              alt={food.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          {/* Konten Card */}
                          <div className="p-3 sm:p-4">
                            {/* Judul */}
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                              {food.title}
                            </h3>
                            
                            {/* Durasi */}
                            <div className="flex items-center mb-2 sm:mb-3">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-xs sm:text-sm text-gray-500">{food.duration}</span>
                            </div>
                            
                            {/* Deskripsi */}
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                              {food.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex min-w-10 min-h-10 sm:min-w-11 sm:min-h-11" />
              <CarouselNext className="hidden sm:flex min-w-10 min-h-10 sm:min-w-11 sm:min-h-11" />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}
