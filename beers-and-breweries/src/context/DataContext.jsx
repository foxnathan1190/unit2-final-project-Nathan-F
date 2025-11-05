import { createContext, useState } from "react";
import Profile from "./classes";
import Brewery from "./classes";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setisLoading] = useState(true);

    const [allProfiles, setAllProfiles] = useState(null);
    const [allBreweries, setAllBreweries] = useState(null);

    const fetchProfiles = async () => {
        const profiles = [];

        try {
            const response = await fetch();
            const data = await response.json();

            data.ForEach(profile => {
                let newProfile = new Profile(profile.id, profile.fName, profile.lName, profile.userName, profile.email, profile.password, profile.favBrewery, profile.month, profile.day, profile.year);
            })
            let profiles = new Profile
            profiles.push(Profile);
            
        } catch (error) {

        } finally {

        }
    }

    useEffect(() => {
        fetchProfiles();
    }, []);







    return <DataContext.Provider value={{}}>{children}</DataContext.Provider>
};