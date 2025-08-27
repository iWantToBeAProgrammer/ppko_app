"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import * as Dialog from "@radix-ui/react-dialog";

// Tipe data untuk item lightbox
type LightboxItem = {
  title: string;
  description: string;
  image?: string;
  lightboxDescription?: string;
};

// Props untuk komponen ActivityCard
interface ActivityCardProps {
  title: string;
  description: string;
  link: string;
  image?: string;
  lightboxDescription?: string;
  allItems?: LightboxItem[];
  initialIndex?: number;
}

// Komponen untuk thumbnail strip
function ThumbnailStrip({
  items,
  activeIndex,
  thumbStartIndex,
  onThumbnailClick,
  onPrev,
  onNext,
}: {
  items: LightboxItem[];
  activeIndex: number;
  thumbStartIndex: number;
  onThumbnailClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (items.length <= 1) return null;

  return (
    <div className="mt-4 flex items-center gap-3 bg-transparent rounded-md px-3 py-3">
      {/* Tombol Previous */}
      <button
        aria-label="Gambar sebelumnya"
        onClick={onPrev}
        className="shrink-0 text-black hover:text-black/80 px-3 py-2 leading-none bg-transparent border-none outline-none"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Grid Thumbnail */}
      <div className="w-full">
        <div className="grid grid-cols-4 gap-2">
          {items
            .slice(thumbStartIndex, Math.min(thumbStartIndex + 4, items.length))
            .map((item, localIdx) => {
              const idx = thumbStartIndex + localIdx;
              return (
                <button
                  key={idx}
                  onClick={() => onThumbnailClick(idx)}
                  className={`relative rounded-md overflow-hidden focus:outline-none ring-2 ${
                    idx === activeIndex ? "ring-white" : "ring-transparent"
                  }`}
                  aria-label={`Pilih gambar ${idx + 1}`}
                >
                  <img
                    src={item.image || "/assets/images/gallery/landscape.jpg"}
                    alt={item.title}
                    className="h-16 w-full object-cover rounded-md"
                  />
                </button>
              );
            })}
        </div>
      </div>

      {/* Tombol Next */}
      <button
        aria-label="Gambar selanjutnya"
        onClick={onNext}
        className="shrink-0 text-black hover:text-black/80 px-3 py-2 leading-none bg-transparent border-none outline-none"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// Komponen untuk lightbox content
function LightboxContent({
  current,
  items,
  activeIndex,
  thumbStartIndex,
  onThumbnailClick,
  onPrev,
  onNext,
}: {
  current: LightboxItem;
  items: LightboxItem[];
  activeIndex: number;
  thumbStartIndex: number;
  onThumbnailClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      {/* Gambar utama */}
      <div className="w-full h-[70vh] sm:h-[75vh] grid place-items-center">
        <div className="relative inline-block max-w-full max-h-full">
          <img
            src={current.image || "/assets/images/gallery/landscape.jpg"}
            alt={current.title}
            className="block max-h-[70vh] sm:max-h-[75vh] max-w-[92vw] w-auto h-auto object-contain rounded-md"
          />
          
          {/* Overlay informasi gambar */}
          <div className="absolute inset-x-0 bottom-0 bg-black/45 text-white px-3 sm:px-6 py-3 sm:py-4">
            <h3 className="text-lg sm:text-2xl font-semibold text-left">{current.title}</h3>
            {(current.lightboxDescription ?? current.description) && (
              <p className="text-xs sm:text-sm text-left opacity-90 mt-1">
                {current.lightboxDescription ?? current.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <ThumbnailStrip
        items={items}
        activeIndex={activeIndex}
        thumbStartIndex={thumbStartIndex}
        onThumbnailClick={onThumbnailClick}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}

export default function ActivityCard({
  title,
  description,
  link,
  image,
  lightboxDescription,
  allItems,
  initialIndex = 0,
}: ActivityCardProps) {
  // Menyiapkan array items untuk lightbox
  const items: LightboxItem[] = useMemo(() => {
    if (allItems && allItems.length > 0) return allItems;
    return [
      {
        title,
        description,
        image,
        lightboxDescription,
      },
    ];
  }, [allItems, title, description, image, lightboxDescription]);

  // State untuk mengelola lightbox
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [thumbStartIndex, setThumbStartIndex] = useState<number>(() => {
    const startGroup = Math.floor(initialIndex / 4) * 4;
    const maxStart = Math.max(0, items.length - 4);
    return Math.min(startGroup, maxStart);
  });

  // Update activeIndex ketika initialIndex berubah
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Update thumbStartIndex berdasarkan activeIndex
  useEffect(() => {
    const maxStart = Math.max(0, items.length - 4);
    if (activeIndex < thumbStartIndex) {
      setThumbStartIndex(Math.max(0, activeIndex));
    } else if (activeIndex > thumbStartIndex + 3) {
      setThumbStartIndex(Math.min(maxStart, activeIndex - 3));
    }
  }, [activeIndex, items.length, thumbStartIndex]);

  // Item yang sedang aktif
  const current = items[(activeIndex + items.length) % items.length];

  // Fungsi navigasi
  const goPrev = () => setActiveIndex((v) => (v - 1 + items.length) % items.length);
  const goNext = () => setActiveIndex((v) => (v + 1) % items.length);
  const goToThumbnail = (index: number) => setActiveIndex(index);

  return (
    <Dialog.Root>
      {/* Trigger card */}
      <Dialog.Trigger asChild>
        <Card className="p-0 border border-primary relative group shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full mb-8 md:mb-0 cursor-pointer">
          <CardContent
            className={`flex aspect-[4/5] sm:aspect-square items-center justify-center py-6 sm:py-8 min-h-90 sm:min-h-80 max-2xl:h-72 bg-cover bg-center relative overflow-hidden rounded-md`}
            style={{ backgroundImage: `url(${image || "/assets/images/gallery/landscape.jpg"})` }}
          >
            {/* Overlay hover effect */}
            <div className="card-overlay absolute w-full h-full top-0 inset-0 group-hover:bg-black/15 transition-colors duration-200"></div>
            
            {/* Informasi card */}
            <div className="absolute bg-black/30 backdrop-blur-lg bottom-0 flex flex-col justify-center py-3 sm:py-4 px-3 gap-1 sm:gap-1.5 text-background translate-y-24 sm:translate-y-28 transition-transform duration-200 ease-in-out group-hover:-translate-y-0 w-full">
              <h2 className="text-base sm:text-lg font-semibold leading-tight">{title}</h2>
              <p className="text-xs text-background/70 leading-relaxed line-clamp-2">{description}</p>
            </div>
          </CardContent>
        </Card>
      </Dialog.Trigger>

      {/* Lightbox modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl">
          <Dialog.Title className="sr-only">{current.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{current.description}</Dialog.Description>
          
          <LightboxContent
            current={current}
            items={items}
            activeIndex={activeIndex}
            thumbStartIndex={thumbStartIndex}
            onThumbnailClick={goToThumbnail}
            onPrev={goPrev}
            onNext={goNext}
          />

          {/* Tombol close */}
          <Dialog.Close
            aria-label="Tutup"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white hover:bg-black/75 focus:outline-none"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
