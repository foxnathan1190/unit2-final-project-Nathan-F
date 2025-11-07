import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";
import "./Main.css";
import urbanChestnut from "../images/urbanChestnut.jpg";
import greatDivide from "../images/greatDivide.webp";
import austinBeerworks from "../images/austinBeerworks.jpg";
import rooftopBrewCo from "../images/rooftopBrewCo.jpg";

const Main = ({ isLoggedInAdmin }) => {
    return (
        <>
            <Header />
            <NavigationMenu isLoggedInAdmin={isLoggedInAdmin} />
            <div className="layout">
                <h1 className="mainH1">Welcome to Drink Local!</h1>
                <p>
                    Drink Local, the site you use to find the local brewery you've been dreaming of. The brewery with great beer and a great vibe. Use our patented search feature and extensive database to find breweries in your hometown or the place to be while traveling.
                </p>
                <p>
                    Whatever your reason for being here, we're glad you are. Take a look around and we hope you keep coming back again and again.
                </p><br />
                <div>
                    <img src={urbanChestnut} alt="Urban Chestnut Brewery" className="hover-over-image" />
                    <img src={greatDivide} alt="Great Divide Brewery" className="hover-over-image" /><br />
                    <img src={austinBeerworks} alt="Austin Beerworks Brewery" className="hover-over-image" />
                    <img src={rooftopBrewCo} alt="Rooftop Brewing Company" className="hover-over-image" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Main;