import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function Filter() {
  const { values, setters, handlers } = useContext(FilterContext);
  const {
    columnOptions,
    columnValue,
    orderColumnValue,
    orderOptionValue,
    numericFilter,
    numberValue,
    allColumnOptions,
  } = values;
  const {
    setNameFilter,
    setColumnValue,
    setOrderColumnValue,
    setOrderOptionValue,
    setComparisonValue,
    setNumberValue,
  } = setters;
  const { handleFilter, handleClear, handleRemove, handleOrder } = handlers;

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
    <option key={ `filter-${option}` } value={ option }>{option}</option>
  ));

  const columnOrderOptions = allColumnOptions.map((option) => (
    <option key={ `order-${option}` } value={ option }>{option}</option>
  ));

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => { setNameFilter(target.value); } }
      />
      <label htmlFor="column-filter">
        Coluna:
        <select
          name="column-filter"
          id="column-filter"
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
      <label htmlFor="column-sort">
        Ordenar:
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          value={ orderColumnValue }
          onChange={ ({ target }) => { setOrderColumnValue(target.value); } }
        >
          {columnOrderOptions}
        </select>
      </label>
      <label htmlFor="ASC">
        <input
          type="radio"
          id="ASC"
          name="order-option"
          value="ASC"
          checked={ orderOptionValue === 'ASC' }
          onChange={ () => setOrderOptionValue('ASC') }
          data-testid="column-sort-input-asc"
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          id="DESC"
          name="order-option"
          value="DESC"
          checked={ orderOptionValue === 'DESC' }
          onChange={ () => setOrderOptionValue('DESC') }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>
      <button type="button" data-testid="column-sort-button" onClick={ handleOrder }>
        ORDENAR
      </button>
      <button type="button" data-testid="button-remove-filters" onClick={ handleClear }>
        REMOVER FILTROS
      </button>
      <div>{numericFilters}</div>
    </div>
  );
}

export default Filter;
