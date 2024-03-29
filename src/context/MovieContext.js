import { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiDb from "../util/api-db";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filterClearDisplay, setFilterClearDisplay] = useState("hidden");

    const [query, setQuery] = useState({
        searchByKeyword: "",
        sortByRating: "",
        filterByGenre: "",
    });

    const { BASE_URL, API_KEY } = ApiDb;

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

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

            setMovies(() => {
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

    /**
     * Checks changes in select/dropdowns and input as well on from the
     * InputPanel component(search, filter/sort).
     *
     * @param event
     */
    function handleChange(event) {
        const { name, value } = event.target;

        setQuery((prevQuery) => {
            return {
                ...prevQuery,
                [name]: value,
            };
        });

        setFilterClearDisplay(() => {
            const isEmptyQuery = !value;

            return isEmptyQuery ? "hidden" : "";
        });
    }

    /**
     * Function fired on form submit when the 'Search' button is pressed (form submitted).
     * Searched movies based on the filled in data is retrieved from the API.
     *
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault();

        // retrieve data based on the prev entered keyword
        fetchSearchedMovie();
    }

    /**
     * Called from 'x' button method to clear input and selects/dropdowns value.
     * Also returns the movies list without any filter from the API.
     *
     * @param none
     */
    function handleClear() {
        fetchMovies();

        setQuery(() => {
            return {
                searchByKeyword: "",
                sortByRating: "",
                filterByGenre: "",
            };
        });

        setFilterClearDisplay("hidden");
    }

    return (
        <MovieContext.Provider
            value={{
                movies,
                genres,
                query,
                filterClearDisplay,
                handleChange,
                handleSubmit,
                handleClear,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;
