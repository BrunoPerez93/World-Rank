export const TableCountries = ({ selectOption, countries }) => {

  return (
    <div>
      <ul>
        {selectOption &&
          countries
            .slice() 
            .sort((a, b) => {
              if (selectOption === "population") {
                return b.population - a.population;
              } else if (selectOption === "area") {
                return b.area - a.area; 
              }
            })
            .map((country, index) => (
              <li key={index}>
                {country.name.common} -{" "}
                {selectOption === "population"
                  ? country.population
                  : country.area}
              </li>
            ))}
      </ul>
    </div>
  )
};

export default TableCountries;