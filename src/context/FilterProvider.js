import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const { planets } = useContext(PlanetsContext);
  const [columnValue, setColumnValue] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState({});

  const allColumnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columnOptions, setColumnOptions] = useState(allColumnOptions);

  const byName = (SWPlanets, letters) => (
    SWPlanets.filter(({ name }) => (
      name.toLowerCase().includes(letters.toLowerCase())
    ))
  );

  const filterByNumbers = (SWPlanets, column, comparison, number) => {
    const byNumberPlanets = SWPlanets.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return +planet[column] > +number;
      case 'menor que':
        return +planet[column] < +number;
      case 'igual a':
        return +planet[column] === +number;
      default:
        return true;
      }
    });
    return byNumberPlanets;
  };

  const byNumbers = (SWPlanets, numFilter) => {
    const numFilterArr = Object.entries(numFilter);
    const byNumPlanets = numFilterArr.reduce((thePlanets, filterValues) => (
      filterByNumbers(thePlanets, filterValues[0], filterValues[1][0], filterValues[1][1])
    ), SWPlanets);
    return byNumPlanets;
  };

  useEffect(() => {
    const filteredByName = byName(planets, nameFilter);
    const filteredByNumbers = byNumbers(filteredByName, numericFilter);
    setFilteredPlanets(filteredByNumbers);
  }, [nameFilter, numericFilter, planets]);

  const handleFilter = () => {
    setNumericFilter((prevState) => ({
      ...prevState,
      [columnValue]: [comparisonValue, numberValue],
    }));
    setColumnOptions((prevState) => {
      const newOptions = prevState.filter((option) => option !== columnValue);
      return newOptions;
    });
  };

  const handleRemove = (column) => {
    setNumericFilter(({ [column]: bye, ...rest }) => rest);
    setColumnOptions((prevState) => [...prevState, column]);
  };

  const handleClear = () => {
    if (Object.keys(numericFilter).length === 0) return;
    setNumericFilter({});
    setColumnOptions(allColumnOptions);
  };

  useEffect(() => { setColumnValue(columnOptions[0]); }, [columnOptions]);

  const setters = {
    setNameFilter,
    setColumnOptions,
    setColumnValue,
    setComparisonValue,
    setNumberValue,
  };

  const values = {
    allColumnOptions,
    filteredPlanets,
    columnOptions,
    columnValue,
    numberValue,
    numericFilter,
  };

  const handlers = {
    handleFilter,
    handleClear,
    handleRemove,
  };

  return (
    <FilterContext.Provider value={ { setters, values, handlers } }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
