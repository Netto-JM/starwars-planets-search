import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const getPlanets = ({ results }) => results.map(({ residents, ...rest }) => (rest));

  const fetchedData = useFetch('https://swapi.dev/api/planets', getPlanets);

  const { isLoading, error, data } = useMemo(() => ({
    isLoading: fetchedData.isLoading,
    error: fetchedData.error,
    data: fetchedData.data,
  }), [fetchedData]);

  return (
    <PlanetsContext.Provider value={ { isLoading, error, data } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
