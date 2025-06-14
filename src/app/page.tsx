'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const mockData = ['apple', 'banana', 'orange', 'grape', 'watermelon'];

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const filtered = mockData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <Input
        type="text"
        placeholder="Search for an item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-80"
      />

      {results.length > 0 && (
        <Card className="w-80 p-2">
          {results.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedItem(item)}
            >
              {item}
            </Button>
          ))}
        </Card>
      )}

      {selectedItem && (
        <Card className="w-80 p-4 bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-2">Details for: {selectedItem}</h2>
          <p>Here are details about <strong>{selectedItem}</strong>!</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedItem(null)}
          >
            Close
          </Button>
        </Card>
      )}
    </div>
  );
}