import { Link } from 'react-router-dom';

export const TableCountries = ({ selectOption, countries }) => {

  const sortedCountries = [...countries].sort((a, b) => {
    if (selectOption === 'population') {
      return b.population - a.population;
    } else if (selectOption === 'area') {
      return b.area - a.area;
    }
    return 0;
  });


  return (
    <div className="ml-10 overflow-y-auto max-h-96">
      <table className="w-full ">
        <thead className="text-left">
          <tr className="text-custom-gray border-b-2">
            <th className="py-3 ">Flag</th>
            <th className="py-3 ">Name</th>
            <th className="py-3 ">Population</th>
            <th className="py-3 ">Area(km2)</th>
            <th className="py-3 ">Region</th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((country, index) => (
            <tr key={index} className="text-custom-light-white">
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>
                  <img className="rounded-md" src={country.flags.png} alt={country.flags.alt} style={{ width: '50px' }} />
                </Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.population}</Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.area}</Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.region}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCountries;