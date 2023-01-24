import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const { isLoading, error, headings } = useContext(PlanetsContext);
  const { setters, values } = useContext(FilterContext);
  const { planetsToRender, columnOptions, columnValue } = values;
  const {
    setNameFilter,
    setColumnValue,
    handleFilter,
    handleClear,
    setComparisonValue,
    setNumberValue,
  } = setters;

  console.log('to be used:', isLoading, error);

  console.log('planetsToRender', planetsToRender);

  const tableHeadings = headings.map((heading) => (
    <th key={ heading }>{heading}</th>
  ));

  const tableData = planetsToRender.map((planet) => {
    const data = Object.values(planet);
    const planetData = data.map((value, index) => <td key={ value + index }>{value}</td>);
    return <tr key={ JSON.stringify(data) }>{planetData}</tr>;
  });

  const columnFilterOptions = columnOptions.map((option) => (
    <option key={ option } value={ option }>{option}</option>
  ));

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => { setNameFilter(target.value); } }
      />
      <label htmlFor="column" data-testid="column-filter">
        Coluna:
        <select
          name="column"
          id="column"
          value={ columnValue }
          onChange={ ({ target }) => { setColumnValue(target.value); } }
        >
          {columnFilterOptions}
        </select>
      </label>
      <label htmlFor="comparison" data-testid="comparison-filter">
        Operador:
        <select
          name="comparison"
          id="column"
          onChange={ ({ target }) => { setComparisonValue(target.value); } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => { setNumberValue(target.value); } }
      />
      <button type="button" data-testid="button-filter" onClick={ handleFilter }>
        FILTRAR
      </button>
      <button type="button" data-testid="button-remove-filters" onClick={ handleClear }>
        REMOVER FILTROS
      </button>
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
