"use client";

// app/food/[id]/page.tsx
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { FoodCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function FoodRecipeDetails() {
  const params = useParams();
  const id = params.id as string;

  const [isPlay, setIsPlay] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const response = await fetch(`/api/recipes/${id}`);
      if (!response.ok) throw new Error("Gagal memuat resep");
      return response.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  function extractYouTubeID(url: string) {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) return match[1];
    try {
      const u = new URL(url);
      if (u.searchParams.has("v")) {
        return u.searchParams.get("v");
      }
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1);
      }
    } catch (e) {
      console.warn("Invalid URL:", e);
    }
    return null;
  }

  const videoId = extractYouTubeID(data.youtubeUrl || "");
  const youtubeThumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 mt-8">
      <Link href="/resep-makanan" className="flex gap-2 items-center mb-4">
        <ArrowLeft size={20} /> <span className="text-sm">Kembali</span>
      </Link>

      <h1 className="text-center text-2xl font-bold">{data.name}</h1>
      <p className="text-center mt-1 text-gray-500">Oleh : {data.author}</p>

      <div className="text-center flex justify-center">
        <div className="text-gray-500 flex items-center gap-1 text-sm mt-2">
          <span>⚫</span>
          <span>{data.createdBy.email}</span>
        </div>
      </div>

      {!isPlay ? (
        <div className="mt-6 overflow-hidden rounded-xl relative">
          <div className="overlay absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center">
            <button
              onClick={() => setIsPlay(true)}
              className="cursor-pointer hover:scale-105 transition-transform duration-200 ease-in"
            >
              <Play size={64} className="stroke-white/80 fill-white/80 " />
            </button>
          </div>
          <Image
            src={youtubeThumbnail}
            alt={data.name}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl relative">
          <iframe
            width="1080"
            height="500"
            src={`https://youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          ></iframe>
        </div>
      )}

      <p className="mt-6 text-justify leading-7 text-gray-700">
        {data.description}
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
              Bahan
            </h3>
            <ul className="list-disc list-inside ml-1 space-y-2 text-gray-700">
              {data.ingredients.map((ingredient: string, key: number) => {
                return <li key={key}>{ingredient}</li>;
              })}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="inline-block bg-primary px-6 py-2 rounded-lg font-semibold text-white mb-4">
            Cara Masak
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start flex-col gap-3">
              {data.cookingSteps.map((cookingStep: string, key: number) => {
                return (
                  <div key={key} className="flex">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white mr-3">
                      {key + 1}
                    </span>
                    <p>{cookingStep}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
