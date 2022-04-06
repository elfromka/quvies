import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ApiDb from "./util/api-db";

import "normalize.css";
import "./scss/App.scss";

import Header from "./components/Header";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

function App() {
    const { BASE_URL, API_KEY } = ApiDb;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [buttonAction, setButtonAction] = useState("search");
    const [query, setQuery] = useState({
        searchByKeyword: "",
        sortByRating: "",
        filterByGenre: "",
    });

    /**
     * Retrieves movies from the movie db API.
     *
     * @param none
     */
    const fetchMovies = async () => {
        try {
            const responseMovies = await axios.get(
                `${BASE_URL}movie/popular?${API_KEY}`
            );

            setMovies(responseMovies.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Retrieves all genres from the movie db API.
     *
     * @param none
     */
    const fetchGenres = async () => {
        try {
            const responseGenres = await axios.get(
                `${BASE_URL}genre/movie/list?${API_KEY}`
            );

            setGenres(responseGenres.data.genres);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Retrieves movies from the movie db API based on the keyword
     * entered and other filters set in the search form.
     *
     * @param none
     */
    const fetchSearchedMovie = async () => {
        const { searchByKeyword, sortByRating, filterByGenre } = query;
        let fetchUrl = `${BASE_URL}movie/popular?${API_KEY}`;

        if (searchByKeyword) {
            fetchUrl = `${BASE_URL}search/movie?${API_KEY}&query=${searchByKeyword}`;
        }

        try {
            const responseMovies = await axios.get(fetchUrl);
            const fetchedMovies = responseMovies.data.results;

            setMovies((prevMovies) => {
                if (sortByRating && filterByGenre) {
                    const sortedMovies = fetchedMovies.sort((a, b) => {
                        return sortByRating === "desc"
                            ? b.vote_average - a.vote_average
                            : a.vote_average - b.vote_average;
                    });

                    return sortedMovies.filter((movie) =>
                        movie.genre_ids.includes(parseInt(filterByGenre))
                    );
                }

                if (sortByRating) {
                    return fetchedMovies.sort((a, b) => {
                        return sortByRating === "desc"
                            ? b.vote_average - a.vote_average
                            : a.vote_average - b.vote_average;
                    });
                }

                if (filterByGenre) {
                    return fetchedMovies.filter((movie) =>
                        movie.genre_ids.includes(parseInt(filterByGenre))
                    );
                }

                return fetchedMovies;
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    /**
     * Checks changes in select/dropdowns and input as well on from the
     * InputPanel component(search, filter/sort).
     *
     * @param event
     */
    function handleChange(event) {
        const { name, value, type } = event.target;

        setQuery((prevQuery) => {
            return {
                ...prevQuery,
                [name]: value,
            };
        });
    }

    /**
     * Function fired on form submit when a keyword is entered in the search input
     * and the 'Search' button is pressed(form submitted). Clears the previous
     * value/clears the input on submit.
     *
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault();

        // retrieve data based on the prev entered keyword
        fetchSearchedMovie();
    }

    /**
     * Called from handleSubmit method to clear input value.
     *
     * @param event
     */
    function handleClear() {
        setQuery((prevQuery) => {
            return {
                ...prevQuery,
                searchByKeyword: "",
            };
        });
    }

    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Movies
                                movies={movies}
                                genres={genres}
                                query={query}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                buttonAction={buttonAction}
                            />
                        }
                    />
                    <Route path="movie/:id" element={<Movie />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
