import { Link } from "react-router-dom";
import "./header.css"

export default function Header() {

    return (
    <header className="header">
        <div className="header-container">

            <Link to="/" className="logo">
                <img src="./logo.png" alt="E-commerce Logo" className="logo-image"/>
            </Link>

            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            Products
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="header-actions">
            
                <Link to="/favorites" className="header-button">
                    Favorites
                </Link>

                <Link to="/compare" className="header-button">
                    Compare
                </Link>
            </div>

        </div>
    </header>
    )
}