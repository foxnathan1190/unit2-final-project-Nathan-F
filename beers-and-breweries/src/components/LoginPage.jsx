import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Button from "../common/Button";
import "./LoginPage.css";

const LoginPage = ({ onAction }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    useEffect(() => {    // This pulls the profile data from local storage and is used to log back in below after a profile is created.
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    function handleClickLogin(e) { //Sends user to Main page.
        e.preventDefault();
        let hasUppercase = false;    // Password Validation
        let hasNumber = false;

        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                hasUppercase = true;
            } else if (char >= '0' && char <= '9') {
                hasNumber = true;
            }
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
        } else if (!hasUppercase) {
            alert("Password must contain at least one uppercase letter.");
        } else if (!hasNumber) {
            alert("Password must contain at least one number.");
        } else if (username === "Nfox1190" && password === "Apollo11") {   //Login user and password.
            alert("Login Successful!")
            onAction(true);
            navigate("/main");
        } else if (username === profile.username && password === profile.password) {  //Allows you to log in after loggining out with your new created profile.
            alert("Login Successful!")
            onAction(false);
            navigate("/main");
        } else {
            alert("Username and Password not found, please create profile.")
        }
    }

    function handleClickSignUp(e) {   // Sends user to Creat Profile.
        e.preventDefault();
        onAction(false);
        navigate("/createProfile")
    }

    return (
        <div className="loginPage">
            <h1 id="loginTitle">Drink Local &#127866;</h1>
            <form id="loginForm" onSubmit={handleClickLogin}>
                <label htmlFor="username">Username: </label><br />
                <input type="text" id="username" name="username" value={username} onChange={(e => setUsername(e.target.value))}></input><br /><br />
                <label htmlFor="password">Password: </label><br />
                <input type="password" id="password" name="password" value={password} onChange={(e => setPassword(e.target.value))}></input><br /><br />
                <Button type="submit" className="button" label="Login" />
                <Button className="button" id="signUpButton" onClick={handleClickSignUp} label="Sign Up" />
            </form><br />
            <Footer />
        </div>
    );
}

export default LoginPage;