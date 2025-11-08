import { useState, useEffect, useContext } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import NavigationMenu from "../common/NavigationMenu";
import "./ProfilePage.css";
import { DataContext } from "../context/DataContext";

const ProfilePage = ({ isLoggedInAdmin }) => {

    const { currentUser, isLoggedIn, isLoading, updateCurrentUser } = useContext(DataContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfileData, setEditedProfileData] = useState({});

    useEffect(() => {
        if (currentUser) {
            setEditedProfileData({ ...currentUser });
        }
    }, [currentUser]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProfileData({ ...currentUser }); // Initialize edited data with currentUser data
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) return;

        try {
            // API Call for Saving Changes
            const response = await fetch(`http://localhost:8080/api/userprofile/${currentUser.id}`, {
                method: 'PUT', // Use PUT to update
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProfileData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedData = await response.json();

            updateCurrentUser(savedData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error.message);
        }
    };
    const handleCancelClick = () => {
        setIsEditing(false);
        if (currentUser) {
            setEditedProfileData({ ...currentUser });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (isLoggedInAdmin) {
        return (
            <div>
                <Header />
                <NavigationMenu isLoggedInAdmin={isLoggedInAdmin} />
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
                    {isLoading ? ( // <--- Add check for loading state
                        <p>Loading Profile...</p>
                    ) : isLoggedIn && currentUser ? (
                        <>
                            {isEditing ? (              // This ternary allows the user to edit their profile data.
                                <>
                                    <label htmlFor="fName">First Name:</label><br />
                                    <input type="text" id="fName" name="fName" value={editedProfileData.fName || ''} onChange={handleChange} required></input><br />
                                    <label htmlFor="lName">Last Name:</label><br />
                                    <input type="text" id="lName" name="lName" value={editedProfileData.lName || ''} onChange={handleChange} required></input><br />
                                    <label htmlFor="username">Username:</label><br />
                                    <input type="text" id="username" name="username" value={editedProfileData.username || ''} onChange={handleChange} required></input><br />
                                    <label htmlFor="email">Email:</label><br />
                                    <input type="email" id="email" name="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={editedProfileData.email || ''} onChange={handleChange} required></input><br />
                                    <label htmlFor="password">Password: </label><br />
                                    <input type="password" id="password" name="password" value={editedProfileData.password || ''} onChange={handleChange} required></input><br />
                                    <label htmlFor="favBrewery">Favorite Brewery:</label><br />
                                    <input type="text" id="favBrewery" name="favBrewery" value={editedProfileData.favBrewery || ''} onChange={handleChange}></input><br />
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
                                                <td>{currentUser.fName} {currentUser.lName}</td>
                                            </tr>
                                            <tr>
                                                <td>Username:</td>
                                                <td>{currentUser.username}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{currentUser.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Password:</td>
                                                <td>{currentUser.password}</td>
                                            </tr>
                                            <tr>
                                                <td>Favorite Brewery:</td>
                                                <td>{currentUser.favBrewery}</td>
                                            </tr>
                                            <tr>
                                                <td>Birthday:</td>
                                                <td>{currentUser.month}/{currentUser.day}/{currentUser.year}</td>
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