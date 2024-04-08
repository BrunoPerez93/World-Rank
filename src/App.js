import './App.css';
import logo from './Assets/Logo.svg'
import Filters from './Components/Filters/Filters';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  return (
    <>
      <div className='app' >
        <div className='logoContainer'>
          <img src={logo} alt='logo' />
        </div>

        <div className='searchContainer m-20'>
          <SearchBar />
          <div className='flex p-10'>
            <Filters />
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
