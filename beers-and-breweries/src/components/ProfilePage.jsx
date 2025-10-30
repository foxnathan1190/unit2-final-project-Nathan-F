import { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";
import "./ProfilePage.css";

const ProfilePage = ({ isLoggedIn }) => {

    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {    // This pulls the data from local storage for the profile to be built below.
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const [editedProfileData, setEditedProfileData] = useState({ ...profile });

    useEffect(() => {
        if (profile) {
            setEditedProfileData({ ...profile });
        }
    }, [profile]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProfileData({ ...profile }); // Initialize edited data with current profile data
    };

    const handleSaveClick = async () => {
        setProfile(editedProfileData); // Update the main profile data
        localStorage.setItem('userProfile', JSON.stringify(editedProfileData));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                    {profile ? (
                        <>
                            {isEditing ? (              // This ternary allows the user to edit their profile data.
                                <>
                                    <label htmlFor="fName">First Name:</label><br />
                                    <input type="text" id="fName" name="fName" value={editedProfileData.fName} onChange={handleChange} required></input><br />
                                    <label htmlFor="lName">Last Name:</label><br />
                                    <input type="text" id="lName" name="lName" value={editedProfileData.lName} onChange={handleChange} required></input><br />
                                    <label htmlFor="username">Username:</label><br />
                                    <input type="text" id="username" name="username" value={editedProfileData.username} onChange={handleChange} required></input><br />
                                    <label htmlFor="email">Email:</label><br />
                                    <input type="email" id="email" name="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={editedProfileData.email} onChange={handleChange} required></input><br />
                                    <label htmlFor="password">Password: </label><br />
                                    <input type="password" id="password" name="password" value={editedProfileData.password} onChange={handleChange} required></input><br />
                                    <label htmlFor="faveBrewery">Favorite Brewery:</label><br />
                                    <input type="text" id="favBrewery" name="favBrewery" value={editedProfileData.favBrewery} onChange={handleChange}></input><br />
                                    <button onClick={handleSaveClick}>Save</button>
                                    <button onClick={handleCancelClick}>Cancel</button>
                                </>
                            ) : (
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
                                    <button onClick={handleEditClick}>Edit Profile</button>
                                </>
                            )}
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