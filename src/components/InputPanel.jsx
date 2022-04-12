import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { useContext } from "react";

export default function InputPanel() {
    const {
        query,
        genres,
        handleClear,
        filterClearDisplay,
        filterByGenre,
        handleChange,
        handleSubmit,
    } = useContext(MovieContext);

    const { searchByKeyword, sortByRating } = query;

    return (
        <div className="input-panel">
            <div className="select-container">
                <Link
                    to="#"
                    onClick={handleClear}
                    className={`btn btn-primary search ${filterClearDisplay}`}
                >
                    <FontAwesomeIcon icon={faX} size="xs" />{" "}
                </Link>
                <select
                    id="filterByGenre"
                    value={filterByGenre}
                    onChange={handleChange}
                    name="filterByGenre"
                >
                    <option value="">Select genre</option>
                    {genres &&
                        genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            );
                        })}
                </select>
                <select
                    id="sortByRating"
                    value={sortByRating}
                    onChange={handleChange}
                    name="sortByRating"
                >
                    <option value="">Sort by rating</option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </div>
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter a keyword..."
                        name="searchByKeyword"
                        value={searchByKeyword}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary">Search</button>
                </form>
            </div>
        </div>
    );
}
