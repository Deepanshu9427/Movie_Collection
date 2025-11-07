"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
    const { imdbId } = useParams();
    const [movie, setMovie] = useState<any>(null);
    const [newReview, setNewReview] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/v1/movies/${imdbId}`);
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [imdbId]);

    const handleAddReview = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/v1/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imdbId: imdbId,
                    reviewBody: newReview,
                }),
            });

            if (res.ok) {
                const added = await res.json();
                setMovie((prev: any) => ({
                    ...prev,
                    reviews: [...prev.reviews, added],
                }));
                setNewReview("");
            }
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    if (!movie) return <p>Loading movie details...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            {/* Poster and basic info */}
            <div className="flex gap-6">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-72 h-auto rounded-lg shadow"
                />
                <div>
                    <p className="text-gray-600 mt-2">
                        <strong>Release Date:</strong> {movie.releaseDate}
                    </p>
                    <p className="mt-3">
                        <strong>Genres:</strong> {movie.genres?.join(", ")}
                    </p>

                    <a
                        href={movie.trailerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline mt-4 inline-block"
                    >
                        Watch Trailer
                    </a>
                </div>
            </div>

            {/* Backdrops */}
            {movie.backdrops?.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-3">Backdrops</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {movie.backdrops.map((src: string, index: number) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Backdrop ${index + 1}`}
                                className="rounded-lg shadow"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                {movie.reviews?.length === 0 ? (
                    <p>No reviews yet. Be the first!</p>
                ) : (
                    movie.reviews.map((review: any, index: number) => (
                        <div key={index} className="p-3 border-b">
                            <p>{review.body}</p>
                        </div>
                    ))
                )}

                {/* Add Review Form */}
                <div className="mt-6">
          <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded p-3"
          ></textarea>
                    <button
                        onClick={handleAddReview}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}
