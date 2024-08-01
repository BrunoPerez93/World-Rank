import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
     <div className={`app ${isCountryPage ? "country-page" : ""} w-full h-full`}>
          <img src={logo} alt='logo' className='my-20'/>

        <div className={`searchContainer  ${isCountryPage ? "country-page-search" : ""} xl:w-[1100px]`}>
           <div className='md:p-10 p-5'>
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
