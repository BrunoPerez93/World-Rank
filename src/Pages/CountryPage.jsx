import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PopulationArea = ({ label, value }) => {
  return (
    <div className='bg-custom-gray p-5 rounded-[15px] text-xl flex flex-col md:flex-row my-3 '>
      <label className='border-r mr-5 pr-5 border-black '>{label}</label>
      <p>{value}</p>
    </div>
  );
};

const DataTable = ({ label, value }) => {
  return (
    <div className='flex justify-between py-5 border-y px-3 ml-2' >
      <label className='text-custom-light-gray'>{label}</label>
      <p>{value}</p>
    </div>
  );
};

const CountryPage = () => {
  const { id } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [neighboringFlags, setNeighboringFlags] = useState([]);
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`https://restcountries.com/v3.1/alpha/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error');
          }
          return response.json();
        })
        .then(data => {
          setCountryData(data[0]);
          Promise.all(
            data[0].borders.map(border => fetch(`https://restcountries.com/v3.1/alpha/${border}`))
          )
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(neighborsData => {
              setNeighbors(neighborsData);
              const flags = neighborsData.map(neighbor => neighbor[0]?.flags?.svg).filter(flag => flag);
              setNeighboringFlags(flags);
            })
            .catch(error => console.error('Error fetching neighboring countries:', error));
        })
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

        <div className='flex justify-around mb-10 flex-col md:flex-row'>
          <PopulationArea label='Population' value={population?.toLocaleString()} />
          <PopulationArea label='Area (km²)' value={area} />
        </div>

        <div className='pb-5 flex flex-col'>
          <DataTable label='Capital' value={capital} />
          <DataTable label='Subregion' value={subregion} />
          <DataTable label='Languages' value={Object.values(languages)} />
          <DataTable
            label='Currencies'
            value={Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`)}
          />
          <DataTable label='Continent' value={continents} />

          <label className='text-custom-light-gray py-5 px-3 ml-2'>Neighbouring Countries</label>
          {neighboringFlags.length === 0 ? (
            <div>No neighboring country flags available</div>
          ) : (
            <div className='flex ml-5'>
              {neighboringFlags.map((flag, index) => {
                const neighborCountry = neighbors[index][0];
                return (
                  <div key={index} className='flex flex-col justify-center items-center max-w-[100px]'>
                    <img src={flag} alt={`Flag ${index + 1}`} className='w-10 mx-5 pb-2' />
                    <div className='text-xs whitespace-pre-wrap'>{neighborCountry?.name?.common}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default CountryPage;
