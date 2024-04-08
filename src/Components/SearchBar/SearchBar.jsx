import { useEffect, useState } from 'react';
import search from '../../Assets/Search.svg'
import { getCountries } from '../../Helpers/getCountries';

const SearchBar = () => {

  const [countriesCount, setCountriesCount] = useState(0);

  useEffect(() => {
    async function FetchData() {
      try {
        const countries = await getCountries();
        if (countries) {
          setCountriesCount(countries.length);
        }
      } catch (error) {
        console.error('Error fetching countries', error)
      }
    }

    FetchData();
  }, [])

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
        />
      </div>

    </div>
  )
};


export default SearchBar;

