"use client"

import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const CREATE_PAGE_MUTATION = gql`
  mutation CreateOnePage($title: String!, $content: String!) {
    createOnePage(data: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPage, { error }] = useMutation(CREATE_PAGE_MUTATION);

  const fetchPages = () => {
    // Your logic to fetch pages
  };

  const handleCreatePage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log('Creating page with:', { title, content });
      const { data } = await createPage({ variables: { title, content } });
      if (data) {
        fetchPages();
        setTitle("");
        setContent("");
      }
    } catch (err) {
      console.error('Error creating page:', err);
      if (err instanceof Error) {
        console.error('Network error details:', err.message);
      }
    }
  };

  return (
    <form onSubmit={handleCreatePage}>
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
      <button type="submit">Create Page</button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
};

export default Page;