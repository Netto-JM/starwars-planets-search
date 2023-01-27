import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function Filter() {
  const { setters, values, handlers } = useContext(FilterContext);
  const { columnOptions, columnValue, numericFilter, numberValue } = values;
  const { handleFilter, handleClear, handleRemove } = handlers;
  const {
    setNameFilter,
    setColumnValue,
    setComparisonValue,
    setNumberValue,
  } = setters;

  const buildSingleFilterEl = (column, comparison, number) => {
    const SingleFilterEl = (
      <div data-testid="filter" key={ column }>
        <p>{`${column} ${comparison} ${number}`}</p>
        <button
          onClick={ () => { handleRemove(column); } }
          data-testid={ `remove-${column}` }
        >
          X
        </button>
      </div>
    );
    return SingleFilterEl;
  };

  const numericFilters = Object.entries(numericFilter).map((filterValues) => (
    buildSingleFilterEl(filterValues[0], filterValues[1][0], filterValues[1][1])
  ));

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
      <label htmlFor="column">
        Coluna:
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ columnValue }
          onChange={ ({ target }) => { setColumnValue(target.value); } }
        >
          {columnFilterOptions}
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
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
        value={ numberValue }
        onChange={ ({ target }) => { setNumberValue(target.value); } }
      />
      <button type="button" data-testid="button-filter" onClick={ handleFilter }>
        FILTRAR
      </button>
      <button type="button" data-testid="button-remove-filters" onClick={ handleClear }>
        REMOVER FILTROS
      </button>
      <div>{numericFilters}</div>
    </div>
  );
}

export default Filter;
