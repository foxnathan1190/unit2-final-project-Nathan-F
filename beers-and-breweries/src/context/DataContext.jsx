import { createContext, useEffect, useState } from "react";
import Profile from "../classes/Profile";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [allProfiles, setAllProfiles] = useState(null);

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [savedBreweries, setSavedBreweries] = useState([]);

    const updateCurrentUser = (userData) => {
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

    // Fetch saved breweries for a specific user (user-scoped)
    const fetchSavedBreweriesForUser = async (userId) => {
        if (!userId) return [];
        try {
            const response = await fetch(`http://localhost:8080/api/userprofile/${userId}/saved-breweries`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            // Store returned saved-brewery rows as simple objects
            setSavedBreweries(data);
            return data;
        } catch (error) {
            console.error('Error fetching saved breweries for user:', error.message);
            return [];
        }
    }

    // Save a brewery for the current user
    const saveBreweryForUser = async (brewery) => {
        if (!currentUser || !currentUser.id) {
            throw new Error('No current user set');
        }

        const payload = {
            breweryId: brewery.id,
            name: brewery.name,
            city: brewery.city,
            state: brewery.state,
            website_url: brewery.website_url
        };

        try {
            const response = await fetch(`http://localhost:8080/api/userprofile/${currentUser.id}/saved-breweries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const saved = await response.json();
            // append to local saved list
            setSavedBreweries(prev => [saved, ...prev]);
            return saved;
        } catch (error) {
            console.error('Failed to save brewery for user:', error.message);
            throw error;
        }
    }

    const removeSavedBreweryForUser = async (savedId) => {
        if (!currentUser || !currentUser.id) throw new Error('No current user set');
        try {
            const response = await fetch(`http://localhost:8080/api/userprofile/${currentUser.id}/saved-breweries/${savedId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // remove locally
            setSavedBreweries(prev => prev.filter(s => s.id !== savedId));
            return true;
        } catch (error) {
            console.error('Failed to remove saved brewery:', error.message);
            throw error;
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
            const id = isNaN(Number(storedUserId)) ? storedUserId : Number(storedUserId);
            fetchCurrentUserProfile(id).then(user => {
                if (user) {
                    setIsLoggedIn(true);
                    // load user-specific saved breweries
                    fetchSavedBreweriesForUser(id);
                }
            });
        }
        fetchProfiles();
    }, []);

    useEffect(() => {
        if (allProfiles !== null) {
            setIsLoading(false);
        }
    }, [allProfiles]);

    // When currentUser changes (login/logout), refresh user-scoped saved breweries
    useEffect(() => {
        if (currentUser && currentUser.id) {
            fetchSavedBreweriesForUser(currentUser.id);
        } else {
            setSavedBreweries([]);
        }
    }, [currentUser]);

    return <DataContext.Provider value={{ isLoading, allProfiles, savedBreweries, currentUser, isLoggedIn, fetchProfiles, fetchSavedBreweriesForUser, saveBreweryForUser, removeSavedBreweryForUser, login, logout, updateCurrentUser, authenticate }}>{children}</DataContext.Provider>
};