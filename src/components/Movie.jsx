import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ApiDb from "../util/api-db";

export default function Movie() {
    const { BASE_URL, API_KEY, IMG_URL, FALLBACK_IMG_URL } = ApiDb;
    const params = useParams();

    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);

    /**
     * Makes API request to get the details of the movie and
     * the cast of the movie. Then the cast list is sorted/filtered
     * to retrieve the top 3 actors with the highest popularity.
     *
     * @param none
     */
    const fetchMovieData = async () => {
        try {
            const responseMovie = await axios.get(
                `${BASE_URL}movie/${params.id}?${API_KEY}`
            );

            setMovie(responseMovie.data);

            const fetchCastData = await axios.get(
                `${BASE_URL}movie/${params.id}/credits?${API_KEY}`
            );

            const topThreeActors = fetchCastData.data.cast
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 3);

            setCast(topThreeActors);
        } catch (e) {
            if (e.response.status === 404) {
                window.location.href = "/not-found";
                return;
            }
            console.error(e);
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, [params]);

    const { title, backdrop_path, genres, overview, release_date, runtime } =
        movie;

    const cover = backdrop_path
        ? `${IMG_URL}${backdrop_path}`
        : `${FALLBACK_IMG_URL}1500x500`;

    const releaseYear = new Date(release_date).getFullYear();

    /**
     * Based on the value (minutes) in the n param the hour and minutes are calculated
     * and returned as string.
     *
     * @param {Number} n - minutes from the movie
     * @return {String} as: xh ym
     */
    const convertRuntime = (n) =>
        `${(n / 60) ^ 0}`.slice(-2) + "h " + ("0" + (n % 60)).slice(-2) + "m";

    return (
        <div className="container">
            <Link to="/" className="go-back">
                Go back
            </Link>
            <div className="movie">
                <h1>{title}</h1>
                <img className="img-cover" src={cover} alt={title} />
                <div className="additional-information">
                    <div className="genres">
                        <span className="section-title">Genres:</span>
                        <ul>
                            {Array.isArray(genres)
                                ? genres.map(({ id, name }) => (
                                      <li key={id}>{name}</li>
                                  ))
                                : null}
                        </ul>
                    </div>

                    <div className="release-year">
                        <span className="section-title">Release year:</span>
                        {releaseYear}
                    </div>

                    <div className="duration">
                        <span className="section-title">Duration: </span>
                        {convertRuntime(runtime)}
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>{overview}</p>
                </div>
                <h2>Top 3 actors</h2>
                <div className="top-actors">
                    {Array.isArray(cast)
                        ? cast.map(({ id, character, name, profile_path }) => {
                              const actorImage = profile_path
                                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                                  : `http://via.placeholder.com/650x450`;

                              return (
                                  <div key={id} className="actor">
                                      <img src={actorImage} alt={name} />
                                      <h4>{name}</h4>
                                      {character && <p>{`as ${character}`}</p>}
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}
