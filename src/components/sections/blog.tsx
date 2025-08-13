import React from "react";
import BlogCard from "../common/blog-card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function Blog() {
  const blogs = [
    {
      title: " How to Find Great Webflow Consulting Expert",
      image: "image url",
      description: "Tim Kesehatan Desa Gemawang",
      link: "READ MORE",
      category: "UPDATE",
    },
    {
      title: "From Zero to Hero: How to Launch a Successful Startup",
      image: "image url",
      description:
        "Pulsar is a Webflow No Code Template for Creatives like you",
      link: "READ MORE",
      category: "STUDIO",
    },
    {
      title: "7 habits of Highly Successful Business People",
      image: "image url",
      description:
        "Pulsar is a Webflow No Code Template for Creatives like you",
      link: "READ MORE",
      category: "DESIGN",
    },
  ];

  return (
    <section id="blog" className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-lg text-gray-400">Blog & Article</h1>
        <p className="text-4xl font-semibold">Lany’s Light Foundation Blog</p>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden p-6 md:p-8">
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:w-1/2">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2070&auto=format&fit=crop"
              alt="Families In Need"
            />
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0">
            <Badge variant={"outline"} className="rounded-2xl">
              Update
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 py-2">
              Bringing Hope And Support To Families In Need
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              At Lainy's Light Foundation, we believe that every child and
              family facing cancer deserves full support, both emotionally and
              practically. Our mission is to provide comfort, strength, and hope
              to them through various forms of assistance.
            </p>
            <a
              href="#"
              className="font-bold text-gray-900 hover:underline tracking-wider"
            >
              READ MORE
            </a>
          </div>
        </div>
      </div>

      <div className="blog-card-wrapper h-full gap-8 max-w-6xl mx-auto mt-10">
        <div className="flex h-96 items-center space-x-4 text-sm">
          {blogs.map((blog, index) => (
            <React.Fragment key={index}>
              <BlogCard
                title={blog.title}
                image={blog.image}
                category={blog.category}
                description={blog.description}
                link={blog.link}
              />
              {index < blogs.length - 1 && <Separator orientation="vertical" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
