import { client } from "@/sanity/lib/client";
import React, { Suspense } from "react";
import { STARTUP_BY_ID_QUERY , PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { StartupTypeCard } from "@/components/StartupCard";
import StartupCard from "@/components/StartupCard"


const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;  // No need to await params
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  const {select : editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug : "editor-picks"
  })
  
  if (!post) return notFound();
  
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container_pattern !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt="Thumbnail" className="w-full rounded-xl h-96 " />
        <div className="space-y-5 mt-10 !max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.author?.image?.url}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg object-cover"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-20-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedContent ? (
            <article dangerouslySetInnerHTML={{ __html: parsedContent }} className="prose font-work-sans break-all"/>
          ) : (
            <p className="no-details">No Details Provided</p>
          )}
        </div>
        <hr className="divider !w-full" />

        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard , index : number) => (
                <StartupCard key={index} post={post} />
                
              ))}
            </ul>
             </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
