import React from "react";

export default function InputPanel({
    genres,
    handleChange,
    handleSubmit,
    query,
    buttonAction,
}) {
    const { searchByKeyword, sortByRating, filterByGenre } = query;

    return (
        <div className="input-panel">
            <div className="select-container">
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
                    <button className="btn btn-primary">
                        {buttonAction === "search" ? "Search" : "Clear"}
                    </button>
                </form>
            </div>
        </div>
    );
}
