'use client';

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const mockData = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Honeydew"];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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

  const handleSelect = (item: string) => {
    router.push(`/item/${item.toLowerCase()}`); // Navigates to /item/apple etc.
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      handleSelect(query.trim());
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}