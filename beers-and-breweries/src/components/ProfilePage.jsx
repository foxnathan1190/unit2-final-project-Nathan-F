import { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";
import "./ProfilePage.css";

const ProfilePage = ({ isLoggedIn }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {    // This pulls the data from local storage for the profil to be built below.
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    if (isLoggedIn) {
        return (
            <div>
                <Header />
                <NavigationMenu isLoggedIn={isLoggedIn} />
                <div className="layout">
                    <h1>Your Profile</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>Nathan Fox</td>
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td>Nfox1190</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>foxnathan1190@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td>Apollo11</td>
                            </tr>
                            <tr>
                                <td>Favorite Brewery:</td>
                                <td>Urban Chestnut Brewing</td>
                            </tr>
                            <tr>
                                <td>Birthday:</td>
                                <td>11/19/1990</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <NavigationMenu />
                <div className="layout">
                    {profile ? (              // This ternary creates the profile if theres data.
                        <>
                            <h1>Your Profile</h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{profile.fName} {profile.lName}</td>
                                    </tr>
                                    <tr>
                                        <td>Username:</td>
                                        <td>{profile.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{profile.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Password:</td>
                                        <td>{profile.password}</td>
                                    </tr>
                                    <tr>
                                        <td>Favorite Brewery:</td>
                                        <td>{profile.favBrewery}</td>
                                    </tr>
                                    <tr>
                                        <td>Birthday:</td>
                                        <td>{profile.month}/{profile.day}/{profile.year}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>No Profile Found</p>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}
export default ProfilePage;