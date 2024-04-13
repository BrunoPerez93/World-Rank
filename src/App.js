import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import logo from './Assets/Logo.svg';
import Homepage from './Pages/Homepage';
import CountryPage from './Pages/CountryPage';

function App() {

  const [isCountryPage, setIsCountryPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsCountryPage(pathname.includes("/country"));
  }, []);

  return (
    <Router>
     <div className={`app ${isCountryPage ? "country-page" : ""}`}>
        <div className='logoContainer'>
          <img src={logo} alt='logo' />
        </div>

        <div className={`searchContainer m-20 ${isCountryPage ? "country-page-search" : ""}`}>
           <div className='p-10'>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/country/:id" element={<CountryPage />} />
            </Routes>

          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
