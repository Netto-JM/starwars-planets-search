import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const { isLoading, error, planets: allPlanets, headings } = useContext(PlanetsContext);
  const { setNameFilter, filteredPlanets, usingFilter } = useContext(FilterContext);
  const planetsToRender = usingFilter ? filteredPlanets : allPlanets || [];
  const headingsToRender = headings || [];

  console.log('to be used:', isLoading, error);

  const tableHeadings = headingsToRender.map((heading) => (
    <th key={ heading }>{heading}</th>
  ));

  const tableData = planetsToRender.map((planet) => {
    const data = Object.values(planet);
    const planetData = data.map((value, index) => <td key={ value + index }>{value}</td>);
    return <tr key={ JSON.stringify(data) }>{planetData}</tr>;
  });

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => { setNameFilter(target.value); } }
      />
      <table>
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export default Table;
