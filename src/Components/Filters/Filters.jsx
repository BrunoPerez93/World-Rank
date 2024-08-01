import { useCallback, useEffect, useState } from "react";
import { getCountries } from "../../Helpers/getCountries";
import TableCountries from "../TableCountries/TableCountries";
import ButtonComponnent from "../Common/ButtonComponnent";
import CheckboxGroup from "../Common/CheckboxGroup";
import SearchBar from "../SearchBar/SearchBar";

export const Filters = () => {

  const [selectOption, setSelectOption] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [filterIndependent, setFilterIndependent] = useState(true);
  const [filterUNMember, setFilterUNMember] = useState(true);

  useEffect(() => {
    async function FetchData() {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    }
    FetchData();
  }, [])

  const handleRegionFilter = (region) => {
    let updatedSelectedRegion = [];
    if (selectedRegion.includes(region)) {
      updatedSelectedRegion = selectedRegion.filter((selected) => selected !== region);
    } else {
      updatedSelectedRegion = [...selectedRegion, region];
    }

    const filtered = countries.filter((country) => {
      return updatedSelectedRegion.includes(country.region);
    });
    setSelectedRegion(updatedSelectedRegion);
    setFilteredCountries(filtered);
  };

  const handleCheckboxChange = () => {
    setFilterUNMember(prevFilterUNMember => {
      const newFilterUNMember = !prevFilterUNMember;

      let updatedFilters = countries.filter((country) => {
        return selectedRegion.length === 0 || selectedRegion.includes(country.region);
      });

      if (!newFilterUNMember) {
        updatedFilters = updatedFilters.filter(country => country.unMember);
      }

      if (!filterIndependent) {
        updatedFilters = updatedFilters.filter(country => country.independent);
      }

      if (!newFilterUNMember && !filterIndependent) {
        setFilterIndependent(prevFilterIndependent => !prevFilterIndependent);
      }

      setFilteredCountries(updatedFilters);

      return newFilterUNMember;
    });
  };

  const applyFilters = useCallback(() => {
    let updatedFilters = [...countries];
  
    if (selectedRegion.length > 0) {
      updatedFilters = updatedFilters.filter(country => selectedRegion.includes(country.region));
    }
  
    if (!filterUNMember) {
      updatedFilters = updatedFilters.filter(country => country.unMember);
    }
  
    if (!filterIndependent) {
      updatedFilters = updatedFilters.filter(country => country.independent);
    }
  
    setFilteredCountries(updatedFilters);
  }, [countries, selectedRegion, filterUNMember, filterIndependent]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);


  return (
    <>
      <SearchBar
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <div className="w-full h-full flex flex-col md:flex-row justify-between">

        <div className="md:w-1/3 w-full">
          <p className="text-custom-light-gray py-2 w-1/2">Sort by</p>
          <select className="bg-custom-dark-gray text-custom-light-white p-2 w-full rounded-[12px] border focus:outline-none" onChange={(e) => setSelectOption(e.target.value)}>
            <option value=''>Seleccione..</option>
            <option value='population'>Population</option>
            <option value='area'>Area</option>

          </select>

          <div className="pt-5">
            <p className="text-custom-light-gray py-5">Region</p>
            <div className="grid grid-cols-2">
              <ButtonComponnent region="Americas" onClick={() => handleRegionFilter("Americas")} selected={selectedRegion.includes("Americas")} />
              <ButtonComponnent region="Antarctic" onClick={() => handleRegionFilter("Antarctic")} selected={selectedRegion.includes("Antarctic")} />
              <ButtonComponnent region="Africa" onClick={() => handleRegionFilter("Africa")} selected={selectedRegion.includes("Africa")} />
              <ButtonComponnent region="Asia" onClick={() => handleRegionFilter("Asia")} selected={selectedRegion.includes("Asia")} />
              <ButtonComponnent region="Europe" onClick={() => handleRegionFilter("Europe")} selected={selectedRegion.includes("Europe")} />
              <ButtonComponnent region="Oceania" onClick={() => handleRegionFilter("Oceania")} selected={selectedRegion.includes("Oceania")} />

            </div>
          </div>

          <div className="py-5">
            <p className="text-custom-light-gray">Status</p>
            <CheckboxGroup labels={["Member of the United Nations", "Independent"]} onChange={handleCheckboxChange} />
          </div>

        </div>

        <div className="w-full h-auto">
          <TableCountries
            selectOption={selectOption}
            countries={filteredCountries}
          />
        </div>

      </div>
    </>
  )
};

export default Filters;