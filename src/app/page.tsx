'use client';

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
const mockData = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Honeydew"];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const results = mockData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(results);
    setShowDropdown(results.length > 0);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
          {filtered.map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}