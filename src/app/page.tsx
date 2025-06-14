'use client';

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome! Start Searching</h1>
      <Input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={handleInputChange}
        className="w-full max-w-md"
      />
      <p className="mt-4 text-gray-600">
        You are searching for: <strong>{query}</strong>
      </p>
    </div>
  );
}