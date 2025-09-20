"use client"
import { searchPostsAction } from '@/action/PostAction';
import { usePost } from '@/context/PostContext';
import Link from 'next/link';
import React, { useState } from 'react'

const SearchPost = () => {
    const { post, setPost } = usePost()
    console.log(post);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const res = await searchPostsAction(query);
        setResults(res);
        setPost(res)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <Link href="/a"></Link>
                <input
                    type="text"
                    name="search"
                    value={query}
                    placeholder="Cari berdasarkan makna..."
                    className="border p-2 rounded"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchPost
