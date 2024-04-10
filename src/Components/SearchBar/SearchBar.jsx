import { useEffect, useState } from 'react';
import search from '../../Assets/Search.svg'
import { getCountries } from '../../Helpers/getCountries';

const SearchBar = () => {

  const [countriesCount, setCountriesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const countries = await getCountries();
        if (countries) {
          setFilteredCountries(countries);
          setCountriesCount(countries.length);
        }
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      country.region.toLowerCase().includes(query.toLowerCase()) ||
      country.subregion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="bg-custom-dark-gray flex justify-between items-center rounded-lg">
      <div className='p-10 text-custom-light-gray w-full'>
        <p>Found {countriesCount} countries</p>
      </div>

      <div className='flex bg-custom-gray m-10 rounded-3xl w-6/12'>
        <div className='flex items-center px-2'>
          <img className='h-10 ' src={search} alt='search icon' />
        </div>
        <input
          className="p-2 m-2 bg-transparent w-full text-custom-light-gray"
          placeholder="Search by Name, Region, Subregion"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

    </div>
  )
};


export default SearchBar;

