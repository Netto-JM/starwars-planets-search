import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const { headings } = useContext(PlanetsContext);
  const { values: { filteredPlanets } } = useContext(FilterContext);

  const tableHeadings = headings.map((heading) => (
    <th key={ heading }>{heading}</th>
  ));

  const tableData = filteredPlanets.map((planet) => {
    const data = Object.values(planet);
    const planetData = data.map((value, index) => <td key={ value + index }>{value}</td>);
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
