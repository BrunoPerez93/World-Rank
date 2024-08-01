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
    <div className="md:ml-10 overflow-y-auto max-h-96">
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr className="text-custom-gray border-b-2">
            <th className="py-3 hidden md:flex">Flag</th>
            <th className="py-3">Name</th>
            <th className="py-3">Population</th>
            <th className="py-3">Area (km²)</th>
            <th className="py-3">Region</th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((country, index) => (
            <tr key={index} className="text-custom-light-white">
              <td className="py-3 w-1/3 hidden md:flex">
                <Link to={`/country/${country.cca3}`}>
                  <img className="rounded-md" src={country.flags.png} alt={country.flags.alt} style={{ width: '50px', height: 'auto' }} />
                </Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.population.toLocaleString()}</Link>
              </td>
              <td className="py-3 w-1/5">
                <Link to={`/country/${country.cca3}`}>{country.area.toLocaleString()}</Link>
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
