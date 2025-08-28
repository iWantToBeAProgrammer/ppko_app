"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GrowthChartCalculator } from "@/lib/z-score-calculator-static";
import boysData from "../data/boys.json";
import girlsData from "../data/girls.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

export default function CalculatorPage() {
  // State untuk form input
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [height, setHeight] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [measurementResult, setMeasurementResult] = useState({
    status: "",
    zScore: "",
    keterangan: "",
  });

  // State untuk counting animation
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // Target values untuk counting
  const target1 = 18.5;
  const target2 = 45;
  const target3 = 13.7;

  // useEffect untuk counting animation
  useEffect(() => {
    const duration = 2000; // 2 detik
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function

      setCount1(Number((target1 * easeOutQuart).toFixed(1)));
      setCount2(Number((target2 * easeOutQuart).toFixed(0)));
      setCount3(Number((target3 * easeOutQuart).toFixed(1)));

      if (currentStep >= steps) {
        clearInterval(timer);
        // Set final values to ensure accuracy
        setCount1(target1);
        setCount2(target2);
        setCount3(target3);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // Data rekomendasi makanan
  const foodRecommendations = [
    {
      id: 1,
      image: "/assets/images/resep-makanan/right_picture.png",
      title: "Bubur Ayam Ga Enak Kemaren",
      duration: "30 Mins",
      description:
        "Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...",
    },
    {
      id: 2,
      image: "/assets/images/resep-makanan/right_picture.png",
      title: "Bubur Ayam Ga Enak Kemaren",
      duration: "30 Mins",
      description:
        "Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...",
    },
    {
      id: 3,
      image: "/assets/images/resep-makanan/right_picture.png",
      title: "Bubur Ayam Ga Enak Kemaren",
      duration: "30 Mins",
      description:
        "Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...",
    },
    {
      id: 4,
      image: "/assets/images/resep-makanan/right_picture.png",
      title: "Bubur Ayam Ga Enak Kemaren",
      duration: "30 Mins",
      description:
        "Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...",
    },
    {
      id: 5,
      image: "/assets/images/resep-makanan/right_picture.png",
      title: "Bubur Ayam Ga Enak Kemaren",
      duration: "30 Mins",
      description:
        "Hidangan sarapan yang kemaren dibuat anak rs yg gaenak ituu...",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!birthDate || !gender || !height) {
        alert("Lengkapi semua data terlebih dahulu.");
        return;
      }

      // ✅ Calculate age in days
      const today = new Date();
      const diffMilliseconds = today.getTime() - birthDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const ageInDays = Math.floor(diffMilliseconds / millisecondsPerDay);

      // ✅ Pick data by gender
      const data = gender === "Laki-laki" ? boysData : girlsData;
      const dataByGender = new GrowthChartCalculator(data);

      // ✅ Calculate Z-score
      const result = dataByGender.calculateZScore(
        parseFloat(height),
        ageInDays
      );

      if (!result || result.zScore === null) {
        setMeasurementResult({
          status: "Data tidak tersedia",
          zScore: "-",
          keterangan:
            "Parameter WHO untuk usia/jenis kelamin ini tidak ditemukan.",
        });
      } else {
        let status = "";
        if (result.zScore < -3) status = "Stunting Berat";
        else if (result.zScore < -2) status = "Stunting Sedang";
        else status = "Normal";

        setMeasurementResult({
          status,
          zScore: result.zScore.toFixed(2),
          keterangan:
            status === "Normal"
              ? "Pertumbuhan anak normal."
              : "Segera konsultasikan ke dokter/puskesmas.",
        });
      }

      setShowResult(true);
    } catch (err) {
      console.error("Error calculating Z-score:", err);
    }
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
            className="absolute inset-0 w-[130%] h-[130%] -top-[15%] -left-[5%] scale-110 sm:w-[150rem] sm:h-[58rem] sm:top-0 sm:left-0 sm:scale-100 object-cover"
          />
          
          {/* Konten di kiri gambar bayi */}
          <div className="absolute top-12 left-8 sm:top-16 sm:left-24 z-10">
            {/* Badge "You Are Not Alone" */}
            <div className="bg-purple-600 text-white p-2 flex items-center justify-center sm:px-1.5 sm:py-1.5 rounded-full sm:text-lg text-xs font-medium mb-6 sm:mb-24 sm:w-52">
              You Are Not Alone
            </div>
            
            {/* Teks vertikal di kiri */}
            <div className=" sm:space-y-3">
              <div className="text-gray-800 font-semibold text-sm sm:text-6xl mb-1 sm:mb-8">Informasi</div>
              <div className="text-gray-800 font-semibold text-sm sm:text-6xl mb-1 sm:mb-8">Edukasi</div>
              <div className="text-gray-800 font-semibold text-sm sm:text-6xl mb-1 sm:mb-8">Support</div>
              <div className="text-gray-800 font-semibold text-sm sm:text-6xl mb-1 sm:mb-8">Advokasi</div>
            </div>
          </div>

          {/* Konten di kanan gambar bayi */}
          <div className="absolute top-20 right-8  sm:top-16 sm:right-24 z-10 max-w-[6rem] sm:max-w-[17.5rem] text-right">
            {/* Tanda kutip - hanya tampil di desktop */}
            <div className="hidden sm:block text-gray-800 text-lg sm:text-4xl font-bold mb-1 sm:mb-3 text-right">"</div>
            
            {/* Definisi stunting - hanya tampil di desktop */}
            <div className="hidden sm:block text-gray-800 text-xs sm:text-lg font-semibold leading-tight mb-3 sm:mb-10 text-right">
              Stunting (kerdil) adalah gangguan pertumbuhan kronis akibat kekurangan gizi, infeksi berulang, dan stimulasi kurang selama 1.000 hari pertama kehidupan.
            </div>
            
            {/* Data statistik - tampil di mobile dan desktop */}
            <div className="space-y-1 sm:space-y-4 text-right">
              <div>
                <div className="text-gray-800 font-bold text-xs sm:text-3xl text-right mb-0.5 sm:mb-2">{count1}%</div>
                <div className="text-gray-800 text-[0.6rem] sm:text-base font-medium text-right mb-3 sm:mb-10">Faktor Ibu Hamil</div>
              </div>
              <div>
                <div className="text-gray-800 font-bold text-xs sm:text-3xl text-right mb-0.5 sm:mb-2">{count2}%</div>
                <div className="text-gray-800 text-[0.6rem] sm:text-base font-medium text-right mb-3 sm:mb-10">Sanitasi Buruk</div>
              </div>
              <div>
                <div className="text-gray-800 font-bold text-xs sm:text-3xl text-right mb-0.5 sm:mb-2">{count3}%</div>
                <div className="text-gray-800 text-[0.6rem] sm:text-base font-medium text-right mb-3 sm:mb-10">MP-ASI Tidak Adekuat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card tambahan yang menumpuk di atas dengan ukuran lebih kecil */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[45%] h-[7rem] sm:top-33 sm:w-[25rem] sm:h-[32rem] bg-transparent rounded-xl overflow-hidden">
          <Image
            src="/assets/images/calculator/gambar-bayi-center.svg"
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
                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Input Jenis Kelamin */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Jenis Kelamin</SelectLabel>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Tanggal Lahir
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !birthDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {birthDate ? (
                            format(birthDate, "dd MMMM yyyy", { locale: id }) // ✅ Indonesian format
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          onSelect={setBirthDate}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          autoFocus
                          captionLayout="dropdown"
                          startMonth={new Date(1900, 0)}
                          endMonth={new Date()}
                          locale={id} // ✅ Calendar in Indonesian
                        />
                      </PopoverContent>
                    </Popover>
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
      {showResult && measurementResult && (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mb-12 sm:mb-16 px-3 sm:px-4 md:px-6 lg:px-0">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Hasil Pengukuran
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Masukkan data anak anda untuk memeriksa status pertumbuhan
            </p>
          </div>

          {/* Card Hasil */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-16 sm:w-20 md:w-25 text-xs sm:text-sm md:text-base">
                    Status{" "}
                    <span className="text-gray-800 ml-1 sm:ml-2 md:ml-11">:</span>
                  </span>
                  <span className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
                    {measurementResult.status}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-16 sm:w-20 md:w-26 text-xs sm:text-sm md:text-base">
                    Z-score
                    <span className="text-gray-800 ml-1 sm:ml-2 md:ml-10">:</span>
                  </span>
                  <span className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
                    {measurementResult.zScore}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-16 sm:w-20 md:w-25 text-xs sm:text-sm md:text-base">
                    Keterangan{" "}
                    <span className="text-gray-800 ml-0.5 sm:ml-1 md:ml-[0.3rem]">:</span>
                  </span>
                  <span className="text-gray-800 font-bold flex-1 text-xs sm:text-sm md:text-base">
                    {measurementResult.keterangan}
                  </span>
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
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1 sm:mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-xs sm:text-sm text-gray-500">
                                {food.duration}
                              </span>
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
