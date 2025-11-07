import { Link } from "react-router";
import { useState, useEffect } from "react";

import "./NavigationMenu.css";

const NavigationMenu = ({ isLoggedInAdmin }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {  // Pulling in profile data from local storage to display user in nav bar.
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

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
                <Link to="/">Log Out</Link>
            </li>
            <li className="userLoggedIn" style={{ float: "right" }}>
                {isLoggedInAdmin ? (<p>User: Nfox1190</p>) : (profile ? (  /* Ternary for profile username display */
                    <p>User: {profile.username}</p>
                ) : (
                    <p>No profile data found.</p>
                ))}
            </li>
        </ul>
    );
}
export default NavigationMenu;