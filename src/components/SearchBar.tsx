import React from "react";

type SearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
  placeholder?: string;
};


const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, placeholder }) => (
  <div className="relative w-full">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.65 6.65a7.5 7.5 0 0 0 10.6 10.6z"/></svg>
    </span>
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder={placeholder || "Search posts..."}
      className="pl-10 pr-4 py-2 w-full rounded-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-slate-100 placeholder-slate-400 outline-none shadow transition-all"
      aria-label="Search posts"
    />
  </div>
);

export default SearchBar;
