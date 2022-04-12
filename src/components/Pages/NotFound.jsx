import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <div className="not-found">
                <h1>
                    <span className="primary-color-text">404</span>Not found
                </h1>
                <p>The page you requested was not found on this server.</p>
                <Link className="go-back" to="/">
                    Go back
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
