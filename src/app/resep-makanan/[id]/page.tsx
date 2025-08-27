// app/food/[id]/page.tsx
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FoodRecipeDetailsProps {
  params: { id: string }
}

export default function FoodRecipeDetails({ params }: FoodRecipeDetailsProps) {
  const { id } = params


  const data = {
    title: "Bubur Ayam Lembut untuk Si Kecil",
    author: "Ade Fadly H Masse",
    images: "/assets/images/detail-makanan/makanan1.svg",
    ageRange: "6 - 11 Bulan",
    description: `Bubur ayam ini disiapkan dengan bahan-bahan yang lembut dan mudah dicerna, cocok untuk balita usia 6-11 bulan yang mulai mengenal makanan padat. Menggunakan ayam segar, sayuran yang kaya vitamin, dan bumbu alami, bubur ini memberikan nutrisi penting untuk mendukung pertumbuhan dan perkembangan balita. Teksturnya yang halus membuatnya nyaman untuk dimakan oleh si kecil, sambil tetap menjaga rasa yang lezat dan bergizi.`,
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 mt-40">
      <Link href="/food" className="flex gap-2 items-center mb-4">
        <ArrowLeft size={20} /> <span className="text-sm">Kembali</span>
      </Link>

      <h1 className="text-center text-2xl font-bold">{data.title}</h1>
      <p className="text-center mt-1 text-gray-500">Oleh : {data.author}</p>

      <div className="text-center flex justify-center">
        <div className="text-gray-500 flex items-center gap-1 text-sm mt-2">
          <span>⚫</span>
          <span>{data.ageRange}</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl">
        <Image
  src={data.images}
  alt={data.title}
  width={800}
  height={500}
  className="w-full h-auto object-cover"
/>

      </div>

      <p className="mt-6 text-justify leading-7 text-gray-700">
        {data.description}
      </p>


      <div className="mt-10 grid md:grid-cols-2 gap-8">
<div className="space-y-8">
      <div>
        <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
          Bahan
        </h3>
        <ul className="list-disc ml-1 space-y-2 text-gray-700">
          <p>75 gr singkong putih, rebus dan haluskan </p>
          <p>15 gr (2 sdm datar) daging ikan kembung cincang halus  </p>
          <p>15 gr daging ayam cincang rebus </p>
          <p>250 ml air kaldu ayam </p>
          <p>5 gr (1 sdt) minyak kelapa </p>
          <p>20 gr (2 sdm) bayam segar, potong halus </p>
        </ul>
      </div>

      
    </div>
  <div>
    <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
      Cara Masak
    </h3>
    <div className="space-y-4 text-gray-700">
  <div className="flex items-start">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white mr-3">
      1
    </span>
    <p>Rebus air, masukkan ayam dengan daun salam, sereh, daun jeruk, dan lengkuas hingga mendidih.</p>
  </div>

  <div className="flex items-start">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white mr-3">
      2
    </span>
    <p>Tumis bumbu halus sampai harum, masukkan ke dalam air rebusan.</p>
  </div>

  <div className="flex items-start">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white mr-3">
      3
    </span>
    <p>Angkat ayam, lalu suwir ayam.</p>
  </div>

  <div className="flex items-start">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white mr-3">
      4
    </span>
    <p>Sajikan nasi dengan suwir ayam, soun, tauge, telur puyuh, dan kuah soto. Taburi daun bawang, seledri, dan bawang goreng di atasnya.</p>
  </div>
</div>


  </div>

  
    
</div>

    </div>
    

  )
}
