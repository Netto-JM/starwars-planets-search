import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [usingFilter, setUsingFilter] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const { planets } = useContext(PlanetsContext);

  const byName = (SWPlanets, letters) => (
    SWPlanets.filter(({ name }) => name.includes(letters))
  );

  useEffect(() => {
    // if (planets) {
    //   if (nameFilter) setFilteredPlanets(byName(planets, nameFilter));
    // }
    if (planets && nameFilter) setFilteredPlanets(byName(planets, nameFilter));
    setUsingFilter(!!(nameFilter));
  }, [nameFilter]);

  return (
    <FilterContext.Provider value={ { setNameFilter, filteredPlanets, usingFilter } }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
