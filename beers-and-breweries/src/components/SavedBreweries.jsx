import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";

const SavedBreweries = ({ isLoggedIn, savedItems }) => {

    return (
        <>
            <Header />
            <NavigationMenu isLoggedIn={isLoggedIn} />
            <ul>
                {savedItems.map((result) => (
                    <li key={result.id}>{result.name} | {result.city}, {result.state} | <a href={result.website_url} target="_blank">{result.website_url}</a></li>
                ))}
            </ul>
            <Footer />

        </>
    );
}

export default SavedBreweries;