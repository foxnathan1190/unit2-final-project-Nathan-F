import { useContext } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";
import { DataContext } from "../context/DataContext";

const SavedBreweries = ({ isLoggedInAdmin }) => {
    const { savedBreweries, removeSavedBreweryForUser } = useContext(DataContext);

    const handleRemove = async (savedId) => {
        try {
            await removeSavedBreweryForUser(savedId);
            alert('Brewery removed from list.');
        } catch (err) {
            console.error(err);
            alert('Failed to remove brewery.');
        }
    }

    return (
        <>
            <Header />
            <NavigationMenu isLoggedInAdmin={isLoggedInAdmin} />
            <section className="layout">
                <h1>&#128190; Saved Breweries</h1>
                <ul className="resultListContainer">
                    {savedBreweries && savedBreweries.length > 0 ? savedBreweries.map((result) => (
                        <li key={result.id} className="resultList">{result.name} | {result.city}, {result.state} | <a href={result.website_url} target="_blank">{result.website_url}</a><button className="button" onClick={() => handleRemove(result.id)}>Remove</button></li>
                    )) : (<p>No saved breweries</p>)}
                </ul>
            </section>
            <Footer />

        </>
    );
}

export default SavedBreweries;