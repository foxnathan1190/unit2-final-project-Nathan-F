import { createContext, useEffect, useState } from "react";
import Profile from "../classes/Profile";
import Brewery from "../classes/Brewery";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [allProfiles, setAllProfiles] = useState(null);
    const [allBreweries, setAllBreweries] = useState(null);

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateCurrentUser = (userData) => {q
        setCurrentUser(userData);
    };

    // Authenticate by username/password using cached profiles (or fetch if not loaded)
    const authenticate = async (username, password) => {
        try {
            // Ensure profiles are loaded
            if (allProfiles === null) {
                await fetchProfiles();
            }

            // find a matching profile in allProfiles
            const match = (allProfiles || []).find(p => p.username === username && p.password === password);

            if (match) {
                // match may already be a Profile instance (created in fetchProfiles)
                const userProfile = match;
                setCurrentUser(userProfile);
                localStorage.setItem('currentUserId', userProfile.id);
                setIsLoggedIn(true);
                return userProfile;
            }

            return null;
        } catch (error) {
            console.error('Authentication error:', error.message);
            return null;
        }
    }

    const createProfileObject = (currentUser) => {
        return new Profile(
            currentUser.id,
            currentUser.fName,
            currentUser.lName,
            currentUser.username,
            currentUser.email,
            currentUser.password,
            currentUser.favBrewery,
            currentUser.birthMonth,
            currentUser.birthDay,
            currentUser.birthYear
        );
    }

    const fetchProfiles = async () => {
        const profiles = [];

        try {
            const response = await fetch('http://localhost:8080/api/userprofile');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            data.forEach(profile => {
                let newProfile = new Profile(profile.id, profile.fName, profile.lName, profile.username, profile.email, profile.password, profile.favBrewery, profile.birthMonth, profile.birthDay, profile.birthYear);
                profiles.push(newProfile);
            })

        } catch (error) {
            console.error(error.message);
        } finally {
            setAllProfiles(profiles);
        }
    }

    const fetchCurrentUserProfile = async (id) => {
        if (!id) return null;
        try {
            const response = await fetch(`http://localhost:8080/api/userprofile/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const profileData = await response.json();
            const userProfile = createProfileObject(profileData);
            setCurrentUser(userProfile); // Set the current user state
            return userProfile;
        } catch (error) {
            console.error(`Error fetching user ${id} profile:`, error.message);
            return null;
        }
    }

    const fetchSavedBreweries = async () => {
        const breweries = [];

        try {
            const response = await fetch('http://localhost:8080/api/saved-breweries');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            data.forEach(brewery => {
                let newBrewery = new Brewery(brewery.id, brewery.name, brewery.city, brewery.state, brewery.website_url);
                breweries.push(newBrewery);
            })

        } catch (error) {
            console.error(error.message);
        } finally {
            setAllBreweries(breweries);
        }
    }

    const login = async (id) => {

        const user = await fetchCurrentUserProfile(id);

        if (user) {
            localStorage.setItem('currentUserId', id);
            setIsLoggedIn(true);
        }
    }

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('currentUserId');
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem('currentUserId');
        if (storedUserId) {
            // Fetching current user if an ID is stored (handles page refresh)
            fetchCurrentUserProfile(storedUserId).then(user => {
                if (user) {
                    setIsLoggedIn(true);
                }
            });
        }
        fetchProfiles();
        fetchSavedBreweries();
    }, []);

    useEffect(() => {
        if (allProfiles !== null && allBreweries !== null) {
            setIsLoading(false);
        }
    }, [allProfiles, allBreweries]);

    return <DataContext.Provider value={{ isLoading, allProfiles, allBreweries, currentUser, isLoggedIn, fetchProfiles, fetchSavedBreweries, login, logout, updateCurrentUser, authenticate }}>{children}</DataContext.Provider>
};