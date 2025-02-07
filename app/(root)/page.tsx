import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const params = {
    search : query || null
  }

  const session = await auth();

  console.log(session?.id);

  
  const { data: post } = await sanityFetch({ query: STARTUPS_QUERY  , params});

  console.log(JSON.stringify(post, null, 2));


  return (
    <>
      <section className="pink_container_pattern">
        <h1 className="heading">
          Pitch Your Startup ,<br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for  "${query}" ` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {post?.length > 0 ? (
            post.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};

export default page;
