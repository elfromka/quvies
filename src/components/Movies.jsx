import { useContext } from "react";
import Hero from "./Hero";
import InputPanel from "./InputPanel";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import MovieContext from "../context/MovieContext";

export default function Movies() {
    const { movies } = useContext(MovieContext);

    return (
        <div className="container">
            <Hero />
            <InputPanel />
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
