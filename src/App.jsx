import React from 'react';
import './App.css';
import useFetch from './hooks/useFetch';

function App() {
  const { isLoading, error, data } = useFetch('https://swapi.dev/api/planets');
  console.log(isLoading, error, data);
  return (
    <span>Hello, App!</span>
  );
}

export default App;
