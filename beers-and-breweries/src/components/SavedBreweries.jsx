import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";

const SavedBreweries = ({ isLoggedInAdmin, savedItems, onRemoveItem }) => {

    return (
        <>
            <Header />
            <NavigationMenu isLoggedInAdmin={isLoggedInAdmin} />
            <section className="layout">
                <h1>Saved Breweries</h1>
                <ul>
                    {savedItems.map((result) => (
                        <li key={result.id}>{result.name} | {result.city}, {result.state} | <a href={result.website_url} target="_blank">{result.website_url}</a><button onClick={() => onRemoveItem(result)}>Remove</button></li>
                    ))}
                </ul>
            </section>
            <Footer />

        </>
    );
}

export default SavedBreweries;