import { Link } from "react-router";
import { useContext } from "react";
import "./NavigationMenu.css";
import { DataContext } from "../context/DataContext";

const NavigationMenu = ({ isLoggedInAdmin }) => {

    const { currentUser, logout } = useContext(DataContext);

    return (
        <ul id="nav">
            <li className="navLink">
                <Link to="/main">Home</Link>
            </li>
            <li className="navLink">
                <Link to="/about">About</Link>
            </li>
            <li className="navLink">
                <Link to="/profilePage">Profile</Link>
            </li>
            <li className="navLink">
                <Link to="/savedBreweries">Saved Breweries</Link>
            </li>
            <li className="navLink">
                <Link to="/search">Search</Link>
            </li>
            <li className="navLink" style={{ float: "right" }}>
                <Link to="/" onClick={() => logout(currentUser.id)}>Log Out</Link> {/* Logout function called on click. */}
            </li>
            <li className="userLoggedIn" style={{ float: "right" }}>
                {isLoggedInAdmin ? (<p>User: Nfox1190</p>) : (currentUser ? (  /* Ternary for profile username display */
                    <p>User: {currentUser.username}</p>
                ) : (
                    <p>No profile data found.</p>
                ))}
            </li>
        </ul>
    );
}
export default NavigationMenu;