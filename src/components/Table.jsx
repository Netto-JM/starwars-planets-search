import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const { planets, headings } = useContext(PlanetsContext);
  const { values: { filteredPlanets, usingFilter } } = useContext(FilterContext);

  const planetsToRender = usingFilter ? filteredPlanets : planets;

  const tableHeadings = headings.map((heading) => (
    <th key={ heading }>{heading}</th>
  ));

  const tableData = planetsToRender.map((planet) => {
    const data = Object.values(planet);
    const planetData = data.map((value, i) => {
      if (i === 0) return <td key={ value + i } data-testid="planet-name">{value}</td>;
      return <td key={ value + i }>{value}</td>;
    });
    return <tr key={ JSON.stringify(data) }>{planetData}</tr>;
  });

  return (
    <div>
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
