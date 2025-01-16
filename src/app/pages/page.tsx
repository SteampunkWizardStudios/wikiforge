"use client"
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Page as PageType, Revision as RevisionType } from "@prisma/client";
import Link from "next/link";

const GET_PAGES = gql`
  query GetPages {
    pages {
      id
      title
      createdAt
      updatedAt
    }
  }
`;

const CREATE_PAGE = gql`
  mutation CreatePage($title: String!, $rawContent: String!) {
    createOnePage(data: { title: $title, revisions: { create: { rawContent: $rawContent } } }) {
      id
      title
    }
  }
`;

const DELETE_PAGE = gql`
  mutation DeletePage($id: Int!) {
    deleteOnePage(where: { id: $id }) {
      id
    }
  }
`;

const PageViewer: React.FC = () => {
  const { data, refetch } = useQuery(GET_PAGES);
  const [createPage] = useMutation(CREATE_PAGE);
  const [deletePage] = useMutation(DELETE_PAGE);

  const [title, setTitle] = useState("");
  const [rawContent, setRawContent] = useState("");

  const handleCreatePage = async () => {
    await createPage({ variables: { title, rawContent } });
    refetch();
    setTitle("");
    setRawContent("");
  };

  const handleDeletePage = async (id: number) => {
    await deletePage({ variables: { id } });
    refetch();
  };

  return (
    <div className="p-10 bg-slate-800 shadow-2xl rounded-2xl max-w-5xl mx-auto mt-20 text-black">
      <h1 className="text-4xl font-bold mb-6 text-slate-100">Page Viewer</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 bg-slate-600 text-slate-100 placeholder:text-slate-400"
        />
        <input
          type="text"
          placeholder="Raw Content"
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          className="border p-2 mr-2 bg-slate-600 text-slate-100 placeholder:text-slate-400"
        />
        <button onClick={handleCreatePage} className="bg-blue-500 text-white p-2">
          Create Page
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Pages</h2>
      <ul>
        {data?.pages.map((page: PageType) => (
          <li key={page.id} className="mb-2 text-blue-500 hover:text-blue-200">
            <Link href={`/wiki/${page.title}`} className="mr-2">{page.title}</Link>
            <button onClick={() => handleDeletePage(page.id)} className="bg-red-500 text-white p-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageViewer;