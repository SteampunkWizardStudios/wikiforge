"use client"

import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const CREATE_PAGE_MUTATION = gql`
  mutation CreatePage($title: String!, $content: String!) {
    createPage(data: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPage] = useMutation(CREATE_PAGE_MUTATION);

  const fetchPages = () => {
    // Define or import your fetchPages function here
  };

  const handleCreatePage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await createPage({ variables: { title, content } });
      if (data) {
        fetchPages();
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error('Error creating page:', error);
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
    </form>
  );
};

export default Page;