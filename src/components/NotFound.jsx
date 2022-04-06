import React from "react";

export default function NotFound() {
    return (
        <div className="container">
            <div className="not-found">
                <h1>
                    <span className="primary-color-text">404</span>Not found
                </h1>
                <p>The page you requested was not found on this server.</p>
                <a className="go-back" href="/">
                    Go back
                </a>
            </div>
        </div>
    );
}
