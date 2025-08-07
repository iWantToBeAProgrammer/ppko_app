import { Baby, Utensils, UtensilsCrossed } from "lucide-react";
import AppCard from "../common/app-card";

export default function TumbuhKembang() {
  const cards = [
    {
      icon: Baby,
      title: "Cek Tumbuh Kembang",
      description:
        "Fitur untuk memeriksa apakah tumbuh kembang anak sudah sesuai dengan usia atau membutuhkan perhatian khusus.",
      link: "#",
    },
    {
      icon: Utensils,
      title: "Rekomendasi MPASI Bergizi",
      description:
        "Memberikan rekomendasi menu MPASI yang bergizi dan berbasis bahan pangan lokal untuk anak.",
      link: "#",
    },
    {
      icon: UtensilsCrossed,
      title: "Edukasi Gizi untuk Balita",
      description:
        "Memberikan informasi dan edukasi seputar pentingnya asupan gizi yang tepat bagi anak, serta cara mengatasi kekurangan gizi.",
      link: "#",
    },
  ];

  return (
    <section id="tumbuh-kembang" className="relative overflow-x-clip h-screen mb-48">
      <div className="border-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className=" bg-[#FFE0E9]"
        >
          {/* Main fill shape, no stroke */}
          <path
            fill="#FFF"
            d="M0,160L80,138.7C160,117,320,75,480,80C640,85,800,139,960,144C1120,149,1280,107,1360,85.3L1440,64L1440,320L0,320Z"
          />

          {/* Top line only, stroked */}
          <path
            fill="none"
            stroke="#FFBDD0"
            strokeWidth="12"
            d="M0,160L80,138.7C160,117,320,75,480,80C640,85,800,139,960,144C1120,149,1280,107,1360,85.3L1440,64"
          />
        </svg>
      </div>

      <div className="container mx-auto px-8">
        <div className="card-wrapper bg-[#FFD5E1]  p-6 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {cards.map((card, index) => (
            <AppCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
