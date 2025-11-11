import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState, useContext } from "react";
import LoginPage from './components/LoginPage';
import CreateProfile from './components/CreateProfile';
import About from './components/About';
import ProfilePage from './components/ProfilePage';
import Search from './components/Search';
import Main from './components/Main';
import SavedBreweries from './components/SavedBreweries';
import { DataContext } from './context/DataContext';

function App() {

  const [results, setResults] = useState([]);
  let [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false); {/* Had to be made a let so that it could change on clicks and actions. */ }

  const { saveBreweryForUser, fetchSavedBreweriesForUser } = useContext(DataContext);

  const fetchData = async (value) => {
    if (!value || value.trim() === '') {
      setResults([]);
      return;
    }

    // Figured out Open Brewery documentation to be use entire API for searching with below URL.
    try {
      const q = encodeURIComponent(value.trim());
      const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${q}&per_page=200`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Filter to only items where brewery name or city match the query
      const qLower = value.trim().toLowerCase();

      const filtered = (data || []).filter(brewery => {
        const name = brewery.name.toLowerCase();
        const city = brewery.city.toLowerCase();
        return name.includes(qLower) || city.includes(qLower);
      });

      // Alphabetize results by brewery name
      const sorted = filtered.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setResults(sorted);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  }

  // Callback function to handle adding an item
  const handleSaveItem = async (itemToAdd) => {
    try {
      await saveBreweryForUser(itemToAdd);
      alert("Brewery saved to your brewery list.");
      // refresh user saved list if needed
      const storedUserId = localStorage.getItem('currentUserId');
      if (storedUserId) fetchSavedBreweriesForUser(storedUserId);
    } catch (error) {
      console.error('Failed to save brewery:', error);
      alert('Failed to save brewery. Please try again.');
    }
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
          <Route path="/savedBreweries" element={<SavedBreweries isLoggedInAdmin={isLoggedInAdmin} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
