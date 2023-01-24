import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [usingFilter, setUsingFilter] = useState(false);
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

  useEffect(() => {
    // if (planets) {
    //   if (nameFilter) setFilteredPlanets(byName(planets, nameFilter));
    // }
    if (planets && nameFilter) setFilteredPlanets(byName(planets, nameFilter));
    setUsingFilter(!!(nameFilter));
  }, [nameFilter]);

  const planetsToRender = usingFilter ? filteredPlanets : planets;

  const handleFilter = () => {
    setNumericFilter(() => ({
      ...numericFilter,
      columnValue: [comparisonValue, numberValue],
    }));
    console.log(columnValue);
    setColumnOptions((prevState) => {
      const newOptions = prevState.filter((option) => option !== columnValue);
      return newOptions;
    });
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
    handleFilter,
    handleClear,
    setComparisonValue,
    setNumberValue,
  };
  const values = {
    allColumnOptions,
    planetsToRender,
    columnOptions,
    columnValue,
  };

  return (
    <FilterContext.Provider value={ { setters, values } }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
