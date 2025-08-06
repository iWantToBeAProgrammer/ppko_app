import BlogCard from "../common/blog-card";

export default function Blog() {
    const blogs = [
        {
            title: "Pencegahan Stunting di Desa Gemawang",
            image: "image url",
            writer: "Tim Kesehatan Desa Gemawang",
        },
        {
            title: "test 2",
            image: "image url",
            writer: "writer",
        },
        {
            title: "Pentingnya Peran Keluarga dalam Mencegah Stunting",
            image: "image url",
            writer: "Dr. Liana Pratiwi, Ahli Gizi Keluarga",
        },
        {
            title: "Pentingnya Gizi Seimbang untuk Mencegah Stunting",
            image: "image url",
            writer: "Dr. Andi Setiawan, Pakar Gizi",
        },
        {
            title: "Langkah-langkah Pemerintah Desa dalam Mengatasi Stunting",
            image: "image url",
            writer: "Kepala Desa Gemawang",
        },
        {
            title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
            image: "image url",
            writer: "Tim Kesehatan Desa Gemawang",
        },
    ]

  return (
    <section id="blog" className="mt-32 container mx-auto">
        <div className="blog-header w-full max-w-6xl mx-auto">
            <h1 className="text-6xl text-center font-semibold">BLOG</h1>
            <p className="text-center mt-5 px-64">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aperiam velit labore molestiae odit culpa, illo nulla quam, ipsam aspernatur vitae. Eos quos sequi sint cum repellat voluptatibus, dicta nam?</p>
        </div>

      <div className="blog-card-wrapper grid grid-flow-row grid-cols-3 gap-3 px-12 mt-15">
        {blogs.map((blog, index) => (
            <BlogCard key={index} title={blog.title} image={blog.image} writer={blog.writer} />
        ))}
        
      </div>
    </section>
  );
}
