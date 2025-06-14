'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Card } from "@/components/ui/card";
import Link from 'next/link';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Simulate fetching from Go backend or dummy data
  const mockData = ['apple', 'banana', 'orange', 'grape', 'watermelon'];

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    // Simulate backend fetch (replace with real API later)
    const filtered = mockData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Input
        type="text"
        placeholder="Search for an item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-80 mb-4"
      />

      {results.length > 0 && (
        <Card className="w-80 p-2">
          {results.map((item) => (
            <Link href={`/item/${item}`} key={item}>
              <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                {item}
              </div>
            </Link>
          ))}
        </Card>
      )}
    </div>
  );
}