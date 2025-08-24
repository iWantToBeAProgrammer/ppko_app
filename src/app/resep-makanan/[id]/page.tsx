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

  <div>
    <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
      Cara Masak
    </h3>
    <ul className="list-disc ml-5 space-y-2 text-gray-700">
      <li>Tumis bumbu halus, lalu masukkan daun salam dan sereh.</li>
      <li>Tambahkan air kaldu, masukkan singkong putih, daging ikan, daging ayam cincang rebus, aduk-aduk hingga setengah matang.</li>
      <li>Masukkan daun bayam, aduk hingga matang.</li>
      <li>Jika airnya mengental dapat ditambahkan air matang.</li>
      <li>Angkat, lalu saring halus atau diblender.</li>
      <li>Sebelum disajikan tambahkan saus jeruk.</li>
    </ul>
  </div>

  
  <div className="space-y-8">
    <div>
      <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
        Bahan
      </h3>
      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        <li>75 gr singkong putih, rebus dan haluskan</li>
        <li>15 gr daging ikan kembung cincang halus</li>
        <li>15 gr daging ayam cincang rebus</li>
        <li>250 ml air kaldu ayam</li>
        <li>5 gr minyak kelapa</li>
        <li>20 gr bayam segar, potong halus</li>
      </ul>
    </div>

    <div>
      <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
        Bumbu
      </h3>
      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        <li>1 lembar daun salam</li>
        <li>1 batang sereh</li>
      </ul>
    </div>

    <div>
      <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
        Bumbu Halus
      </h3>
      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        <li>1 siung bawang merah</li>
        <li>1 siung bawang putih</li>
      </ul>
    </div>
  </div>
</div>

    </div>
    

  )
}
