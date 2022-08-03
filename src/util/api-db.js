const API_KEY = `api_key=${process.env.REACT_APP_API_KEY}`;

const ApiDb = {
    BASE_URL: "https://api.themoviedb.org/3/",
    IMG_URL: "https://image.tmdb.org/t/p/w500/",
    API_KEY,
    FALLBACK_IMG_URL: "http://via.placeholder.com/",
};

export default ApiDb;
