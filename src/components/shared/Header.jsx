export default function Header() {
    return (
        <header className="container">
            <div className="logo">
                <span className="primary-color-text">Quvies.</span>
                com
            </div>
            <nav>
                <ul>
                    <li>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.themoviedb.org/documentation/api"
                        >
                            API
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/elfromka/quvies-com"
                        >
                            Source code
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
