import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { lato } from "@/utils/fonts";
import prisma from "@/db";

async function Page() {
  const blogs = await prisma.blogs.findMany({ orderBy: { createdAt: "desc" } });
  let tagsSet: string[] = [];

  return (
    <div className="flex flex-col text-base">
      <div
        className="bg-default-200 rounded-md m-2 flex items-center justify-center p-12 text-4xl font-bold
            "
      >
        <span className={`${lato.className} font-semibold`}>Recent posts</span>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 gap-2 md:basis-3/4">
          {blogs?.map((blog) => (
            <div
              className="card bg-default-100 rounded-md p-2 flex flex-col justify-between hover:bg-default-200"
              key={blog.id}
            >
              <img
                src={blog.bannerImage}
                alt="banner image"
                className="rounded-md h-52 w-full"
              />
              <div className="flex gap-2 flex-wrap mx-1 items-center justify-center">
                {blog.tags.map((tag) => (
                  <div key={tag}>
                    <span className="m-1 text-purple-950 capitalize font-semibold">
                      {tag}{" "}
                    </span>
                  </div>
                ))}
                {blog.tags.filter((i, v) => {
                  if (!tagsSet.includes(i.toLowerCase().trim()) && i.length > 1)
                    tagsSet.push(i.toLowerCase().trim());
                })}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">{blog.author}</span>
                <span className="">{blog.createdAt.toLocaleDateString()}</span>
              </div>
              <p className="font-semibold text-lg">{blog.title}</p>
              <p className="text-base text-justify  overflow-hidden">
                {blog.bio.slice(
                  0,
                  blog.bio.length < 200 ? blog.bio.length : 200,
                )}{" "}
                ...
              </p>
              <Link href={`/blogs/${blog.url ? blog.url : blog.id}`}>
                <Button className="my-2 bg-purple-950 text-white w-full shadow-md">
                  Read Full blog
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="md:basis-1/4 flex flex-col items-center bg-default-200 rounded-md h-fit m-2 p-4 w-full">
          <span className="text-3xl font-semibold mb-4">Related Tags</span>
          {tagsSet.map((tag) => (
            <span
              key={tag}
              className="my-2 font-semibold text-purple-950 hover:underline"
            >
              <Link href={`/blogs/tag/${tag}`}>{tag}</Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
