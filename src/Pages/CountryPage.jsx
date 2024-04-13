import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PopulationArea = ({ label, value }) => {
  return (
    <div className='bg-custom-gray p-5 rounded-[15px] text-xl flex'>
      <label className='border-r mr-5 pr-5 border-black'>{label}</label>
      <p>{value}</p>
    </div>
  );
};

const DataTable = ({ label, value }) => {
  return (
    <div className='flex justify-between py-5 border-y px-3'>
      <label className='text-custom-light-gray'>{label}</label>
      <p>{value}</p>
    </div>
  );
};

const CountryPage = () => {

  const { id } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://restcountries.com/v3.1/alpha/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error');
          }
          return response.json();
        })
        .then(data => setCountryData(data[0]))
        .catch(error => console.error('Error fetching country data:', error));
    }
  }, [id]);

  if (!countryData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    capital,
    population,
    area,
    subregion,
    languages,
    currencies,
    continents,
    flags,
  } = countryData;

  return (
    <div>
      <div className='flex flex-col text-custom-light-white'>
        <div className='flex justify-center'>
          <img className='rounded-[20px]' src={flags?.png} alt={flags?.alt} />
        </div>

        <div className='py-5 text-center'>
          <p className='text-4xl pb-4 font-bold'>{name?.common}</p>
          <p className='text-xl pb-4'>{name?.official}</p>
        </div>

        <div className='flex justify-around mb-10'>
          <PopulationArea label='Population' value={population?.toLocaleString()} />
          <PopulationArea label='Area (km²)' value={area} />
        </div>

        <div className='pb-5 flex flex-col '>
          <DataTable label='Capital' value={capital} />
          <DataTable label='Subregion' value={subregion} />
          <DataTable label='Languages' value={Object.values(languages)} />
          <DataTable
            label='Currencies'
            value={Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`)}
          />
          <DataTable label='Continent' value={continents} />
        </div>
      </div>
    </div>
  )
}

export default CountryPage;