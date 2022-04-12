import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

import "normalize.css";
import "./scss/App.scss";

import Header from "./components/shared/Header";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import NotFound from "./components/Pages/NotFound";

function App() {
    return (
        <MovieProvider>
            <div className="App">
                <Router>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Movies />} />
                        <Route path="movie/:id" element={<Movie />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        </MovieProvider>
    );
}

export default App;
