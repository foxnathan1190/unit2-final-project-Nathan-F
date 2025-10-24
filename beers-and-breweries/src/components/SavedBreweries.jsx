import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";

const SavedBreweries = ({ isLoggedIn }) => {

    return(
        <>
            <Header />
            <NavigationMenu isLoggedIn={isLoggedIn} />
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            <Footer />

        </>
    );
}

export default SavedBreweries;