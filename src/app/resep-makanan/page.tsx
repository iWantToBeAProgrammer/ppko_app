import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecipeCard from "./_components/recipe-card";
import { Separator } from "@/components/ui/separator";
import TestimonialCards from "./_components/testimonial-card";

export default function ResepMakananPage() {
  const cardData = [
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
    {
      title: "Resep Bubur Bayi",
      category: "6 - 9 Bulan",
      description:
        "Hidangan sarapan atau makan siang khas Timur Tengah yang terdiri dari telur yang di...",
      image: "/assets/images/gallery/landscape.jpg",
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden sm:pt-56 pt-28">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold mb-2">Semua Tentang Asupan</h1>
        <p className="text-lg text-foreground/50 w-1/2 tracking-wider font-medium">
          Explore different types of meals such as breakfast, brunch, lunch, and
          more to find delicious recipes and ideas for every time of day for
          your child.
        </p>

        <h1 className="mt-12 border-l-10 border-primary pl-2 text-2xl font-semibold">
          Tags Categories
        </h1>
        <div className="category-tags mt-4">
          <Button variant="outline" className="mr-2">
            6 - 8 Bulan
          </Button>
          <Button variant="outline" className="mr-2">
            9 - 11 Bulan
          </Button>
          <Button variant="outline" className="mr-2">
            12 - 23 Bulan
          </Button>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="px-0">
            {cardData.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2  md:basis-1/4"
              >
                <div className="pt-6 sm:pt-12">
                  <RecipeCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    category={item.category}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex min-w-11 min-h-11" />
          <CarouselNext className="hidden sm:flex min-w-11 min-h-11" />
        </Carousel>

        <div className="recommended-recipe w-full mt-12">
          <div className="recommended-recipe-title w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold flex-1">Rekomendasi Menu</h1>

            <p className="text-sm text-muted-foreground w-1/3">
              Selamat datang di Galeri Resep Kami, tempat di mana kami
              membagikan dokumentasi kegiatan yang telah dilakukan di Desa
              Gemawang. Melalui foto-foto ini.
            </p>
          </div>

          <Separator className="my-4 mb-12" />

          <div className="recommendation-cards-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cardData.map((item, index) => (
              <div key={index} className="recommendation-card">
                <RecipeCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  category={item.category}
                />
              </div>
            ))}
          </div>

          <div className="testimony-card mt-24 w-full">
            <TestimonialCards />
          </div>
        </div>
      </div>
    </div>
  );
}
