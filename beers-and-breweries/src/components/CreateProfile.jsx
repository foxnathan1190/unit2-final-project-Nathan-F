import { useState, useEffect, use } from "react";
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
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    const { fetchProfiles } = use(DataContext);

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
            fetchProfiles();
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
        if (year > (today.getFullYear() - 21)) {
            alert("Must be 21 years of age.")
            return;
        }
        else if (year > 2025 || year < 1000 || year.length > 4) {
            alert("Please enter valid birth year.")
            return;
        }
        else if (day.length > 2 || day.length < 1 || day > 31 || day < 1) {
            alert("Please enter valid birth day.")
            return;
        }
        else if (month.length > 2 || month.length < 1 || month > 12 || month < 1) {
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
                userName: userName,
                email: email,
                password: password,
                favBrewery: favBrewery,
                birthMonth: month,
                birthDay: day,
                birthYear: year
            };
            saveNewProfile(newProfile);
            alert("Profile Created");   
        }
    }

    //useEffect(() => {    // This useEffect is how the program saves the users create profile data to render on the profile page.
      //  const profileData = { fName, lName, username, email, password, favBrewery, month, day, year };
        //localStorage.setItem('userProfile', JSON.stringify(profileData));
    //}, [fName, lName, username, email, password, favBrewery, month, day, year]);

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
                        <label htmlFor="month">Month:</label>
                        <br />
                        <input type="text" id="month" name="month" placeholder="00" value={month} onChange={(e) => setMonth(e.target.value)} required></input>
                        <br />
                        <label htmlFor="day">Day:</label>
                        <br />
                        <input type="text" id="day" name="day" placeholder="00" value={day} onChange={(e) => setDay(e.target.value)} required></input>
                        <br />
                        <label htmlFor="year">Year:</label>
                        <br />
                        <input type="text" id="year" name="year" placeholder="0000" value={year} onChange={(e) => setYear(e.target.value)} required></input>
                    </section><br />
                    <Button type="submit" id="createProfileButton" label="Create Profile" />
                </form>
            </section>
            <Footer />
        </div>
    );
}

export default CreateProfile;