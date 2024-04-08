import { useEffect, useState } from "react";
import { getCountries } from "../../Helpers/getCountries";
import TableCountries from "../TableCountries/TableCountries";
import ButtonComponnent from "../Common/ButtonComponnent";

export const Filters = () => {

  const [selectOption, setSelectOption] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function FetchData() {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    }
    FetchData();
  }, [])

  const handleRegionFilter = (region) => {
    const filteredCountries = countries.filter(country => country.region === region);
    setCountries(filteredCountries);
  };

  return (
    <div className="w-full flex justify-between">
      <div className="w-1/3">
        <p className="text-custom-light-gray py-5">Sort by</p>
        <select className="bg-custom-dark-gray text-custom-light-white px-10 py-5 w-full rounded-[12px] border focus:outline-none" onChange={(e) => setSelectOption(e.target.value)}>
          <option value=''>Seleccione..</option>
          <option value='population'>Population</option>
          <option value='area'>Area</option>

        </select>

        <div className="pt-5">
          <p className="text-custom-light-gray py-5">Region</p>
          <div>
            <ButtonComponnent region="America" onClick={handleRegionFilter} />
            <ButtonComponnent region="Antarctic" onClick={handleRegionFilter} />
            <ButtonComponnent region="Africa" onClick={handleRegionFilter} />
            <ButtonComponnent region="Asia" onClick={handleRegionFilter} />
            <ButtonComponnent region="Europe" onClick={handleRegionFilter} />
            <ButtonComponnent region="Oceania" onClick={handleRegionFilter} />
          </div>
        </div>

      </div>

      <div className="w-1/2">
        <TableCountries selectOption={selectOption} countries={countries} />
      </div>

    </div>
  )
};

export default Filters;