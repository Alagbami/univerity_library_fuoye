"use client";

import React, { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [genre, setGenre] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("newest");
  const [genres, setGenres] = useState<string[]>([]);

  // Fetch available genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/books/genres");
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Search books with filters
  useEffect(() => {
    const searchBooks = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const params = new URLSearchParams({
          q: searchQuery,
          genre,
          availability,
          sort,
        });

        const response = await fetch(`/api/books/search?${params}`);
        const data = await response.json();
        setResults(data.books || []);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchBooks, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, genre, availability, sort]);

  return (
    <section>
      <div className="mb-8 space-y-4">
        <Input
          placeholder="Search for books by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Genre Filter */}
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Availability Filter */}
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Books</option>
            <option value="available">Available Only</option>
            <option value="borrowed">Borrowed Only</option>
          </select>

          {/* Sort Options */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="alphabetical">A - Z</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {isLoading && <p className="text-center text-gray-500">Searching...</p>}

      {hasSearched && results.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">
          No books found matching your search criteria.
        </p>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="font-bebas-neue text-4xl text-dark-400 mb-6">
            Search Results ({results.length})
          </h2>
          <ul className="book-list">
            {results.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchBooks;
