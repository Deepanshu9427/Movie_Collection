"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Movie {
    id: {
        timestamp: number;
        date: string;
    };
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    backdrops: string[];
    genres: string[];
    reviews: any[];
}

export default function MoviesGrid() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
               // 1. Define the base URL.
               // This looks for an environment variable first; if not found, it falls back to localhost.
              const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

              // 2. Update the fetch line to use the variable
              const res = await fetch(`${apiBaseUrl}/api/v1/movies`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                setMovies(data);
                console.log(data);

            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);


    if (movies.length === 0) return <p className="text-center mt-10">Loading movies...</p>;

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
                <Link
                    key={index}
                    href={`/movies/${movie.imdbId}`}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform block"
                >
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                >
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                    />

                    <div className="p-4">
                        <h2 className="text-lg font-bold">{movie.title}</h2>
                        <p className="text-sm text-gray-500">Release: {movie.releaseDate}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {movie.genres.map((genre, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-200 text-xs px-2 py-1 rounded"
                                >
                  {genre}
                </span>
                            ))}
                        </div>

                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}
