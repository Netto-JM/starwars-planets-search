import React, { useContext } from 'react';
import PlanetsContext from './context/PlanetsContext';
import './App.css';
import Filter from './components/Filters';
import Table from './components/Table';
import Error from './components/Error';

function App() {
  const { error } = useContext(PlanetsContext);
  if (error) return <Error />;
  return (
    <>
      <Filter />
      <Table />
    </>
  );
}

export default App;
