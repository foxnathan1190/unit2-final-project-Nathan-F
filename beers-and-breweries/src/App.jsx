import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState } from "react";
import LoginPage from './components/LoginPage';
import CreateProfile from './components/CreateProfile';
import About from './components/About';
import ProfilePage from './components/ProfilePage';
import Search from './components/Search';
import Main from './components/Main';
import SavedBreweries from './components/SavedBreweries';

function App() {

  const [results, setResults] = useState([]);
  let [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false); {/* Had to be made a let so that it could change on clicks and actions. */ }
  const [savedItems, setSavedItems] = useState([]);

  const fetchData = async (value) => {   //Fetching data from openbrewery api
    try {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=200',)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const results = data.filter((brewery) => {
        return value && brewery && (brewery.city && brewery.city.toLowerCase().includes(value.toLowerCase())) || (brewery.name && brewery.name.toLowerCase().includes(value.toLowerCase()));
      })
      setResults(results);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  }

  // Callback function to handle adding an item
  const handleSaveItem = (itemToAdd) => {
    alert("Brewery saved to your brewery list.");
    // Add the item to the savedItems list
    setSavedItems((prevItems) => [...prevItems, itemToAdd]);
  }

  // Callback function to remove an item from the saved list
  const handleRemoveItem = (itemToRemove) => {
    alert("Brewery removed from list.");
    // Remove the item from the savedItems list
    setSavedItems((prevSavedItems) =>
      prevSavedItems.filter((result) => result.id !== itemToRemove.id)
    );
  }

  const handleLoggedIn = (dataFromLoginPage) => {  // Function to handle login, to recieve the update from the Login Page, so that can be passed on.
    setIsLoggedInAdmin(isLoggedInAdmin
      = dataFromLoginPage);
  }

  return (
    <>
      <Router> {/* Route set up */}
        <Routes>
          <Route path="/" element={<LoginPage onAction={handleLoggedIn} />} /> {/* Updating logged in status from Login Page. */}
          <Route path="/main" element={<Main isLoggedInAdmin={isLoggedInAdmin} />} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/about" element={<About isLoggedInAdmin={isLoggedInAdmin} />} />
          <Route path="/profilePage" element={<ProfilePage isLoggedInAdmin={isLoggedInAdmin} />} /> {/* Updating logged in status from Login Page to Profile Page. */}
          <Route path="/search" element={<Search results={results} fetchData={fetchData} isLoggedInAdmin={isLoggedInAdmin} onSaveItem={handleSaveItem} />} /> {/* Passing props from App, parent component, to Search, child component */}
          <Route path="/savedBreweries" element={<SavedBreweries isLoggedInAdmin={isLoggedInAdmin} savedItems={savedItems} onRemoveItem={handleRemoveItem} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
