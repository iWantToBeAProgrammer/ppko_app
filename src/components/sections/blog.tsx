import BlogCard from "../common/blog-card";

export default function Blog() {
  const blogs = [
    {
      title: "Pencegahan Stunting di Desa Gemawang",
      image: "/assets/images/article/article.png",
      writer: "Tim Kesehatan Desa Gemawang",
    },
    {
      title: "test 2",
      image: "/assets/images/article/article.png",
      writer: "writer",
    },
    {
      title: "Pentingnya Peran Keluarga dalam Mencegah Stunting",
      image: "/assets/images/article/article.png",
      writer: "Dr. Liana Pratiwi, Ahli Gizi Keluarga",
    },
  ];

  return (
    <section id="blog" className="my-32 container mx-auto">
      <div className="blog-header w-full max-w-6xl mx-auto font-semibold ">
        <h1 className="text-6xl text-center">BLOG</h1>
        <p className="text-center mt-5 px-64 text-foreground/70">
          From updating work samples to optimizing for mobile devices, Noman
          will provide you with the knowledge and skills you need.{" "}
        </p>
      </div>

      <div className="blog-card-wrapper grid grid-flow-row grid-cols-3 gap-3 px-12 mt-15">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            image={blog.image}
            writer={blog.writer}
          />
        ))}
      </div>
    </section>
  );
}
