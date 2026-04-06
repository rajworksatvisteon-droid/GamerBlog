import React from "react";

const updates = [
  {
    id: 1,
    title: "Added What's New tab",
    description: "Now you can see recent updates to the site!",
    date: "2026-04-1",
  },
  {
    id: 2,
    title: "YouTube Thumbnails in Posts",
    description: "Posts can now display YouTube video thumbnails if a link is provided.",
    date: "2026-03-31",
  },
  {
    id: 3,
    title: "Search Bar for Posts",
    description: "Quickly find posts by title or content using the new search bar.",
    date: "2026-03-31",
  },
];


const WhatsNew: React.FC = () => (
  <main className="max-w-xl mx-auto py-8 px-2 sm:px-4">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-400 mb-6 text-center tracking-tight drop-shadow-lg">What's New</h1>
    <ul className="space-y-5">
      {updates.map(update => (
        <li
          key={update.id}
          className="bg-slate-900 border border-purple-700 rounded-lg shadow-md p-4 sm:p-5 hover:shadow-xl transition-shadow relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-tight">{update.title}</h2>
            <span className="text-xs bg-purple-800 text-purple-200 px-2 py-0.5 rounded-full font-mono font-medium shadow">{update.date}</span>
          </div>
          <p className="text-slate-300 text-base sm:text-lg leading-snug mt-1">{update.description}</p>
        </li>
      ))}
    </ul>
    <div className="mt-8 text-center text-slate-500 text-xs sm:text-sm">Stay tuned for more updates!</div>
  </main>
);

export default WhatsNew;
