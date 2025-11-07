import { createContext, useEffect, useState } from "react";
import Profile from "../classes/Profile";
import Brewery from "../classes/Brewery";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [allProfiles, setAllProfiles] = useState(null);
    const [allBreweries, setAllBreweries] = useState(null);

    const fetchProfiles = async () => {
        const profiles = [];

        try {
            const response = await fetch('http://localhost:8080/api/userprofile');
            const data = await response.json();

            data.ForEach(profile => {
                let newProfile = new Profile(profile.id, profile.fName, profile.lName, profile.userName, profile.email, profile.password, profile.favBrewery, profile.month, profile.day, profile.year);
                profiles.push(newProfile);
            })

        } catch (error) {
            console.error(error.message);
        } finally {
            setAllProfiles(profiles);
        }
    }

    const fetchSavedBreweries = async () => {
        const breweries = [];

        try {
            const response = await fetch('http://localhost:8080/api/saved-breweries');
            const data = await response.json();

            data.ForEach(brewery => {
                let newBrewery = new Brewery(brewery.id, brewery.name, brewery.city, brewery.state, brewery.website_url);
                breweries.push(newBrewery);
            })

        } catch (error) {
            console.error(error.message);
        } finally {
            setAllBreweries(breweries);
        }
    }

    useEffect(() => {
        fetchProfiles();
        fetchSavedBreweries();
    }, []);

    useEffect(() => {
        if (allProfiles !== null && allBreweries !== null) {
            setIsLoading(false);
        }
    }, [allProfiles, allBreweries]);

    return <DataContext.Provider value={{ isLoading, allProfiles, allBreweries, fetchProfiles, fetchSavedBreweries }}>{children}</DataContext.Provider>
};