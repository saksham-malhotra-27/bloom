import React from 'react';
import parse from 'html-react-parser';
import prisma from "@/src/utils/prismaIndex";
import {noto, rubik} from "@/src/app/lib/fonts/font";
import "./blogstyle.css"

async function Page({params}: { params: { id: string } }) {
    let blog
    if (params.id.includes("-"))
        blog = await prisma.blogs.findUnique({where: {url: params.id}})
    else blog = await prisma.blogs.findUnique({where: {id: params.id}})
    return (
        <div className={`flex justify-center mt-2 md:mt-0 overflow-x-hidden max-w-5xl mx-auto ${noto.className}`}>
            <div className="flex flex-col w-full gap-1 md:gap-0">
                <div className="mx-2 md:m-4 flex flex-col gap-2 relative items-center justify-center">
                    <div className="bg-black w-full rounded-lg">
                        <img src={blog?.bannerImage} alt=""
                             className="rounded-lg w-full h-[30vh] md:h-[65vh] opacity-40 bg-black"/></div>
                    <h1 className="text-2xl md:text-6xl text-white absolute font-semibold">{blog?.title}</h1>
                </div>

                <div className="mx-2 md:mx-4 rounded-lg bg-purple-700 text-white flex py-4 px-2">
                    <div className="flex items-center justify-start gap-4 basis-1/2">
                        <span className="">{blog?.author}</span>
                        <span className="">{blog?.createdAt.toDateString()}</span>
                    </div>

                    <div className="flex items-center justify-end gap-4 basis-1/2">
                        {blog?.tags.map((tag) => <span className="" key={tag}>{tag}</span>)}
                    </div>
                </div>

                <div className="bg-zinc-100 rounded-md mx-4 my-2 p-4">{parse(blog!.content)}</div>

            </div>
        </div>
    );
}

export default Page;