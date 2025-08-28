"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const items = [
    {
      img: "/assets/images/login/login.webp",
      title: "Sorotan pada Allrecipes Allstar: Ashley Berger",
    },
    {
      img: "/assets/images/login/login.webp",
      title: "Sorotan pada Allrecipes Allstar: Ashley Berger",
    },
    {
      img: "/assets/images/login/login.webp",
      title: "Sorotan pada Allrecipes Allstar: Ashley Berger",
    },
    {
      img: "/assets/images/login/login.webp",
      title: "Sorotan pada Allrecipes Allstar: Ashley Berger",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (!scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex gap-4 px-4 py-6 select-none snap-x">
        {items.map((item, i) => (
          <Card
            key={i}
            className="w-full sm:w-1/3 flex-shrink-0 rounded-xl overflow-hidden relative p-0 snap-center"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={300}
              height={200}
              className="w-full object-cover aspect-square select-none"
              draggable={false} // <-- prevent default image drag
            />
            <CardContent className="absolute bottom-0 left-0 right-0 p-12 flex flex-col justify-center items-center bg-gradient-to-t from-black/70 to-transparent text-white">
              <p className="text-2xl text-center opacity-80">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
