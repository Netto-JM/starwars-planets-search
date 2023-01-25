import React from 'react';
import { render } from '@testing-library/react';
import PlanetsProvider from '../../context/PlanetsProvider';
import FilterProvider from '../../context/FilterProvider';

function withContext (component) {
  return (
    <PlanetsProvider>
      <FilterProvider>
        { component }
      </FilterProvider>
    </PlanetsProvider>
  )
}

export function renderWithContext(component) {
  return {  
    ...render(withContext(component))
  }
}
