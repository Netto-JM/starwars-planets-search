import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const { planets } = useContext(PlanetsContext);
  const [columnValue, setColumnValue] = useState('population');
  const [orderColumnValue, setOrderColumnValue] = useState('population');
  const [orderOptionValue, setOrderOptionValue] = useState('ASC');
  const [orderFilter, setOrderFilter] = useState({});
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState({});
  const [usingFilter, setUsingFilter] = useState(false);

  const allColumnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columnOptions, setColumnOptions] = useState(allColumnOptions);

  const isEmptyObj = (object) => !(Object.entries(object).length);

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
      default:
        return +planet[column] === +number;
      }
    });
    return byNumberPlanets;
  };

  const byNumbers = (SWPlanets, numFilter) => {
    if (isEmptyObj(numFilter)) return SWPlanets;
    const numFilterArr = Object.entries(numFilter);
    const byNumPlanets = numFilterArr.reduce((thePlanets, filterValues) => (
      filterByNumbers(thePlanets, filterValues[0], filterValues[1][0], filterValues[1][1])
    ), SWPlanets);
    return byNumPlanets;
  };

  const orderPlanets = (SWPlanets, ordFilter) => {
    if (isEmptyObj(ordFilter)) return SWPlanets;
    const MINUS_ONE = -1;
    const orderedPlanets = [...SWPlanets];
    const [column, by] = Object.entries(ordFilter)[0];
    orderedPlanets.sort((planetA, planetB) => {
      if (planetB[column] === 'unknown') return MINUS_ONE;
      if (by === 'ASC') {
        return +planetA[column] - +planetB[column];
      }
      return +planetB[column] - +planetA[column];
    });
    return orderedPlanets;
  };

  useEffect(() => {
    const filteredByName = byName(planets, nameFilter);
    const filteredByNumbers = byNumbers(filteredByName, numericFilter);
    const orderedPlanets = orderPlanets(filteredByNumbers, orderFilter);
    setFilteredPlanets(orderedPlanets);
    setUsingFilter((prevState) => (
      prevState || !!(nameFilter || Object.keys(numericFilter).length)
    ));
  }, [nameFilter, numericFilter, planets, orderFilter]);

  useEffect(() => { setColumnValue(columnOptions[0]); }, [columnOptions]);

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

  const handleOrder = () => {
    setOrderFilter({ [orderColumnValue]: orderOptionValue });
    setUsingFilter(true);
  };

  const setters = {
    setNameFilter,
    setColumnOptions,
    setColumnValue,
    setOrderColumnValue,
    setOrderOptionValue,
    setComparisonValue,
    setNumberValue,
  };

  const values = {
    allColumnOptions,
    filteredPlanets,
    columnOptions,
    columnValue,
    orderColumnValue,
    orderOptionValue,
    numberValue,
    numericFilter,
    usingFilter,
  };

  const handlers = {
    handleFilter,
    handleClear,
    handleRemove,
    handleOrder,
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
