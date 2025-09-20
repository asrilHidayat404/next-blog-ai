"use client";

import Image from "next/image";
import React from "react";
import { DeletePostButton } from "./PostForm";
import { usePost } from "@/context/PostContext";

const PostList = ({ posts }) => {
  const { post } = usePost();
  
  
  // Tentukan data yang akan dirender: jika ada post dari context, pakai itu, kalau tidak pakai props
  const renderPosts = post.length ? post : posts;

  if (renderPosts.length === 0) {
    return <p className="text-center text-gray-500 py-8">No posts yet</p>;
}
console.log(renderPosts);

  return (
    <div className="grid gap-4">
      {renderPosts.map((p) => (
        <div key={p.id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.content}</p>

              {/* {p.image && (
                <div className="mt-3">
                  <Image
                    alt={p.title}
                    width={200}
                    height={200}
                    src={`/storage/${p.image}`}
                    className="rounded object-cover"
                  />
                </div>
              )} */}

              <p className="text-xs text-gray-500 mt-2">
                By: {p.user?.full_name || p.user?.email}
              </p>
            </div>

            <DeletePostButton id={p.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
