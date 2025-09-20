import { DeletePostButton } from "@/components/PostForm";
import PostList from "@/components/PostList";
import SearchPost from "@/components/SearchPost";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import type { Post } from "@prisma/client";
import Image from "next/image";

export default async function Post() {
    const session = await auth()
    if (!session?.userId) {
        throw new Error("something went wrong")
    }
    let posts: Post[] = [];

    switch (session?.user?.role) {
        case 'admin':
            posts = await db.post.findMany({
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true
                        }
                    }
                }
            })

            break;
        case 'user':
            posts = await db.post.findMany({
                where: {
                    userId: session?.userId
                },
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true
                        }
                    }
                }
            });
            break
        default:
            break;
    }
    

    
    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-bold">Posts Management</h1>
            <SearchPost />
            <PostList posts={posts ?? null} />
        </div>
    );
}