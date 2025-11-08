import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Button from "../common/Button";
import "./CreateProfile.css";
import { DataContext } from "../context/DataContext";

const CreateProfile = () => {
    const [fName, setFName] = useState("");  // Need all of these useStates for saving data to local storage.
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [favBrewery, setFavBrewery] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [birthYear, setBirthYear] = useState("");

    const { fetchProfiles, login } = useContext(DataContext);

    const navigate = useNavigate();
    const today = new Date();

    const saveNewProfile = async profile => {
        try {
            const response = await fetch('http://localhost:8080/api/userprofile/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error - Status ${response.status}');
            } else {
                const newUserData = await response.json();
                fetchProfiles();
                await login(newUserData.id);
                navigate("/main");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleCreateProfile(e) {
        e.preventDefault();
        let hasUppercase = false;    // Password and birthdate validation.
        let hasNumber = false;

        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                hasUppercase = true;
            } else if (char >= '0' && char <= '9') {
                hasNumber = true;
            }
        }
        if (birthYear > (today.getFullYear() - 21)) {
            alert("Must be 21 years of age.")
            return;
        }
        else if (birthYear > 2025 || birthYear < 1000 || birthYear.length > 4) {
            alert("Please enter valid birth yYear.")
            return;
        }
        else if (birthDay.length > 2 || birthDay.length < 1 || birthDay > 31 || birthDay < 1) {
            alert("Please enter valid birth day.")
            return;
        }
        else if (birthMonth.length > 2 || birthMonth.length < 1 || birthMonth > 12 || birthMonth < 1) {
            alert("Please enter valid birth month.")
            return;
        }
        else if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        } else if (!hasUppercase) {
            alert("Password must contain at least one uppercase letter.");
            return;
        } else if (!hasNumber) {
            alert("Password must contain at least one number.");
            return;
        } else {
            let newProfile = {
                fName: fName,
                lName: lName,
                username: username,
                email: email,
                password: password,
                favBrewery: favBrewery,
                birthMonth: birthMonth,
                birthDay: birthDay,
                birthYear: birthYear
            };
            saveNewProfile(newProfile);
            login('${id}');
            alert("Profile Created");
        }
    }

    return (
        <div>
            <Header />
            <section className="createProfile">
                <h2>Create Profile</h2>
                <form onSubmit={handleCreateProfile}>
                    <label htmlFor="fName">First Name:</label><br />
                    <input type="text" id="fName" name="fName" value={fName} onChange={(e) => setFName(e.target.value)} required></input><br />
                    <label htmlFor="lName">Last Name:</label><br />
                    <input type="text" id="lName" name="lName" value={lName} onChange={(e) => setLName(e.target.value)} required></input><br />
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input><br />
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} required></input><br />
                    <label htmlFor="password">Password: </label><br />
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input><br />
                    <label htmlFor="faveBrewery">Favorite Brewery:</label><br />
                    <input type="text" id="favBrewery" name="favBrewery" value={favBrewery} onChange={(e) => setFavBrewery(e.target.value)}></input><br />
                    <h4>Must be 21+ | Age Verification</h4>
                    <section>
                        <label htmlFor="birthMonth">Month:</label>
                        <br />
                        <input type="text" id="birthMonth" name="birthMonth" placeholder="00" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} required></input>
                        <br />
                        <label htmlFor="birthDay">Day:</label>
                        <br />
                        <input type="text" id="birthDay" name="birthDay" placeholder="00" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} required></input>
                        <br />
                        <label htmlFor="birthYear">Year:</label>
                        <br />
                        <input type="text" id="birthYear" name="birthYear" placeholder="0000" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required></input>
                    </section><br />
                    <Button type="submit" id="createProfileButton" label="Create Profile" />
                </form>
            </section>
            <Footer />
        </div>
    );
}

export default CreateProfile;