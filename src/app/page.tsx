"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<any>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [backendMessage, setBackendMessage] = useState('');

  const fetchHello = async () => {
    try {
      const res = await fetch('http://localhost:3001/hello');
      const data = await res.json();
      setBackendMessage(data.message);
    } catch (err) {
      console.error("Error fetching /hello:", err);
    }
  };

  const fetchGames = async (playerName: string) => {
    try {
      const res = await fetch(`http://localhost:3001/search?q=${playerName}`);
      const data = await res.json();
      setGames(data[playerName]);
    } catch (err) {
      console.error("Error fetching /search:", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetch(`http://localhost:3001/bar?q=${query}`)
          .then(res => res.json())
          .then(data => setUsers(data.users))
          .catch(err => console.error("Error fetching /bar:", err));
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const clearResults = () => {
    setGames(null);
    setQuery('');
    setUsers([]);
  };

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Chessare</h1>

      <Button onClick={fetchHello}>Test Backend</Button>
      {backendMessage && <p>{backendMessage}</p>}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Type player name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="flex flex-wrap gap-2">
          {users.map((user, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => {
                setQuery(user);
                fetchGames(user);
              }}
            >
              {user}
            </Button>
          ))}
        </div>
      </div>

      {games && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Games:</h2>
            <Button variant="destructive" onClick={clearResults}>Clear Results</Button>
          </div>

          {games.map((game: any, idx: number) => (
            <Card key={idx} className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Game {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>White:</strong> {game.whiteplayer}</p>
                <p><strong>Black:</strong> {game.blackplayer}</p>
                <p><strong>Winner:</strong> {game.winner}</p>
                <p><strong>Opening:</strong> {game.opening}</p>
                <p><strong>Result:</strong> {game.result}</p>
                <p><strong>Moves:</strong> {game.gamemoves}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}