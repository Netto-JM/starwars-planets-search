import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const getPlanets = ({ results }) => {
    const planets = results.map(({ residents, ...rest }) => (rest));
    const headings = Object.keys(planets[0]).map((planet) => planet.replace('_', ' '));
    return { planets, headings };
  };

  const fetchedData = useFetch('https://swapi.dev/api/planets', getPlanets, {});

  const { isLoading, error, planets, headings } = useMemo(() => ({
    isLoading: fetchedData.isLoading,
    error: fetchedData.error,
    planets: fetchedData.data.planets,
    headings: fetchedData.data.headings,
  }), [fetchedData]);

  return (
    <PlanetsContext.Provider value={ { isLoading, error, planets, headings } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
}.isRequired;
