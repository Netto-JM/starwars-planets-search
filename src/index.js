import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import FilterProvider from './context/FilterProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </PlanetsProvider>,
  );
