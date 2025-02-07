import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author->{
        _id,
        name,image,bio
    },
    description,
    image,
    views,
    category
    
    
    }`);


    export const STARTUP_BY_ID_QUERY =defineQuery(`*[_type == "startup" && _id==$id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author->{
        _id,
        name,image,username,bio
    },
    description,
    image,
    views,
    category,
      pitch
}`)

export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id==$id][0]{
   _id, views
}`)


export const AUTHOR_BY_GITHUB_QUERY = defineQuery(`*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    url,
    bio
}`)