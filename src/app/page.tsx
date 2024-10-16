import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-6xl font-extrabold text-white mb-6">Welcome to WikiForge</h1>
      <p className="text-xl text-gray-300 max-w-2xl text-center mb-8">
        Create fast, modern and data-driven wikis with WikiForge.
      </p>
      <div className="flex space-x-4">
      <Link href="/wiki" className="text-lg text-blue-500 hover:underline">
          Wiki Home
        </Link>
        <Link href="/pages" className="text-lg text-blue-500 hover:underline">
          Manage Pages
        </Link>
        <Link href="/api" className="text-lg text-blue-500 hover:underline">
          API
        </Link>
      </div>
    </div>
  );
}