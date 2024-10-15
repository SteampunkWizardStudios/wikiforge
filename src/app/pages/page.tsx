"use client"

import React, { useState, useEffect } from "react";
import { Page } from "@prisma/client";
import Link from "next/link";

const ManagePages: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await fetch('/api/pages');
    const data: Page[] = await res.json();
    setPages(data);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      fetchPages();
      setTitle('');
      setContent('');
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/pages?slug=${slug}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchPages();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Pages</h1>
      <form onSubmit={handleCreate} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Page
        </button>
      </form>
      <ul className="space-y-4">
        {Array.isArray(pages) && pages.map((page) => (
          <li key={page.title} className="p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <p className="mb-2">{page.content}</p>
            <div className="flex space-x-2">
              <Link href={`/wiki/${page.title}`} className="bg-green-500 text-white px-4 py-2 rounded">
                View
              </Link>
              <button
                onClick={() => handleDelete(page.title)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePages;