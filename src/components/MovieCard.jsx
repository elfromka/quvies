import ApiDb from "../util/api-db";

export default function MovieCard({ info }) {
    const { IMG_URL, FALLBACK_IMG_URL } = ApiDb;
    const { title, poster_path, vote_average } = info;

    const poster = poster_path
        ? `${IMG_URL}${poster_path}`
        : `${FALLBACK_IMG_URL}800x500`;

    return (
        <div className="card">
            <img src={poster} alt={title} />
            <span className="rating-badge">{vote_average}</span>
            <div className="title">
                <h4>{title}</h4>
            </div>
        </div>
    );
}
