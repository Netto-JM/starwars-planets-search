import React, { useContext } from 'react';
import PlanetsContext from './context/PlanetsContext';
import './App.css';
import Filter from './components/Filters';
import Table from './components/Table';

function App() {
  const { isLoading, error } = useContext(PlanetsContext);
  console.log('render table conditionally:', isLoading, error);
  return (
    <>
      <Filter />
      <Table />
    </>
  );
}

export default App;
