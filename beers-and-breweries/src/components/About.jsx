import Footer from "../common/Footer";
import Header from "../common/Header";
import "./About.css";
import NavigationMenu from "../common/NavigationMenu";
import peopleAtBrewery from "../images/peopleAtBrewery.jpg";

const About = ({ isLoggedIn }) => {

    return (
        <div >
            <Header />
            <NavigationMenu isLoggedIn={isLoggedIn} />
            <section className="aboutPage">
                <h1 id="aboutHeader">About Us</h1>
                <img src={peopleAtBrewery} alt="People at a Brewery" id="aboutImage" />
                <p>
                    We at Drink Local have always wanted to be able to travel and simply drink local. We are a small midwestern operation from St. Louis Missouri and want you to be able to experience breweries of every kind, no matter where you are going.
                </p>
                <p>
                    With our patented search feature, you can enter the city you are in or travleing to and it will provide you with a list of all breweries in that city, along with their website. We want you to be able to experience local breweries and not be worried about how to find them.
                </p>
                <p>
                    Another great use of our search feature is to find where the brewery is that makes the beer you found at the local grocery store or maybe the beer you tried at dinner. You can enter the brewer from the label and find out more imformation.
                </p>
                <p>
                    We also want you to stick around, so we ask that you make a profile and introduce yourself. We want you to be of age and also let us know your favorite brewery.
                </p>
                <p>
                    Your next search on Drink Local awaits!
                </p>
            </section>
            <Footer />
        </div>
    );
}

export default About;