import { useState, useEffect } from "react";
import NavigationMenu from "../common/NavigationMenu";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Spinner from "./Spinner";
import "./Search.css";

const Search = ({ results, fetchData, isLoggedIn, onSaveItem }) => {  // These props retrieve the data being fetched in app.jsx as well as logged in status.

    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (results.length > 0) {
            setLoading(false);
        }
    }, [results]);

    const handleChange = (e) => {   // This function allows the search to happen in real time when user types a query.
        e.preventDefault();
        setSearchInput(e.target.value);
        setLoading(true);
        setTimeout(setLoading, 2000, false);
        fetchData(e.target.value);
    }

    return (
        <div>
            <Header />
            <NavigationMenu isLoggedIn={isLoggedIn} />
            <section className="layout">
                <h1>&#128270; Search</h1>
                <label htmlFor="search">Search Breweries by City or Brewery Name: </label>
                <div className="searchBarWrapper">
                    <input
                        type="search"
                        placeholder="Type to Search..."
                        className="searchBar"
                        onChange={handleChange}
                        value={searchInput} />
                </div>
                {loading ? (<Spinner />) :  // Ternary for loading with a ternary inside for displaying data vs not data
                    (<ul className="resultListContainer">
                        {searchInput ? results.map((result) => (
                            <li key={result.id} className="resultList">{result.name} | {result.city}, {result.state} | <a href={result.website_url} target="_blank">{result.website_url}</a><button onClick={() => onSaveItem(result)}>Save</button></li>
                        )) : ("---Please Enter Search Query Above---")}
                    </ul>)}
            </section>
            <Footer />
        </div>
    );
}

export default Search;