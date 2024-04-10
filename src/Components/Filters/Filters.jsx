import { useEffect, useState } from "react";
import { getCountries } from "../../Helpers/getCountries";
import TableCountries from "../TableCountries/TableCountries";
import ButtonComponnent from "../Common/ButtonComponnent";
import CheckboxGroup from "../Common/CheckboxGroup";

export const Filters = () => {

  const [selectOption, setSelectOption] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [filterIndependent, setFilterIndependent] = useState(false);
  const [filterUNMember, setFilterUNMember] = useState(false);

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
    if (selectedRegion.includes(region)) {
      setSelectedRegion(selectedRegion.filter(selected => selected !== region));
    } else {
      setSelectedRegion([...selectedRegion, region]);
    }
  };

  const handleCheckboxChange = (label) => {
    if (label === "Member of the United Nations") {
      setFilterUNMember(!filterUNMember);
    } else if (label === "Independent") {
      setFilterIndependent(!filterIndependent);
    }
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
            <ButtonComponnent region="Americas" onClick={handleRegionFilter} selected={selectedRegion.includes("Americas")} />
            <ButtonComponnent region="Antarctic" onClick={handleRegionFilter} selected={selectedRegion.includes("Antarctic")} />
            <ButtonComponnent region="Africa" onClick={handleRegionFilter} selected={selectedRegion.includes("Africa")} />
            <ButtonComponnent region="Asia" onClick={handleRegionFilter} selected={selectedRegion.includes("Asia")} />
            <ButtonComponnent region="Europe" onClick={handleRegionFilter} selected={selectedRegion.includes("Europe")} />
            <ButtonComponnent region="Oceania" onClick={handleRegionFilter} selected={selectedRegion.includes("Oceania")} />
          </div>
        </div>

        <div className="pt-5">
          <p className="text-custom-light-gray py-5">Status</p>
          <CheckboxGroup labels={["Member of the United Nations", "Independent"]} onChange={handleCheckboxChange} />
        </div>

      </div>

      <div className="w-full">
      <TableCountries
          selectOption={selectOption}
          countries={countries.filter(country => {
            let isRegionFiltered = selectedRegion.length === 0 || selectedRegion.includes(country.region);
            let isUNMemberFiltered = !filterUNMember || country.unMember;
            let isIndependentFiltered = !filterIndependent || country.independent;
            return isRegionFiltered && isUNMemberFiltered && isIndependentFiltered;
          })}
        />
      </div>

    </div>
  )
};

export default Filters;