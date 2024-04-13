import { useEffect, useState } from 'react';
import search from '../../Assets/Search.svg'

const SearchBar = ({ countries, setFilteredCountries }) => {

  const [countriesCount, setCountriesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCountriesCount(countries.length);
  }, [countries]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (countries && countries.length > 0) {
      const filtered = countries.filter(country =>
        country.name.common?.toLowerCase().includes(query) ||
        country.region?.toLowerCase().includes(query) ||
        country.subregion?.toLowerCase().includes(query)
      );
      setFilteredCountries(filtered);
      setCountriesCount(filtered.length);
    }
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

