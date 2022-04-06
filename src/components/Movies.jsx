import React from "react";
import Hero from "./Hero";
import InputPanel from "./InputPanel";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default function Movies({
    movies,
    genres,
    handleChange,
    handleSubmit,
    query,
    buttonAction,
}) {
    return (
        <div className="container">
            <Hero />
            <InputPanel
                genres={genres}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                query={query}
                buttonAction={buttonAction}
            />
            <div className="movies">
                {movies && movies.length ? (
                    movies.map((movie) => {
                        return (
                            <Link key={movie.id} to={`/movie/${movie.id}`}>
                                <MovieCard info={movie} />
                            </Link>
                        );
                    })
                ) : (
                    <>
                        <span></span>
                        <h2>{"No results found..."}</h2>
                        <span></span>
                    </>
                )}
            </div>
        </div>
    );
}
