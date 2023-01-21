import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const { isLoading, error, data: { results } } = useFetch('https://swapi.dev/api/planets');

  const filtRes = results.map(({ residents, ...planetRest }) => (planetRest));

  setPlanets(filtRes);

  return (
    <PlanetsContext.Provider value={ { isLoading, error, planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
