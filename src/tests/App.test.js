import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import { renderWithContext } from './helpers/renderWithContext';


describe('Testes dos componentes <Table.jsx /> e <Filter.jsx />', () => {
  const loadInitialData = async () => {
    renderWithContext(<App />);
    await screen.findByRole('table');
    await screen.findAllByRole('columnheader');
    await screen.findAllByRole('row');
  }

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa se os dados iniciais do componente <Table.jsx /> são carregados corretamente', async () => {
    renderWithContext(<App />);
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    const tableHeaders = await screen.findAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(13);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(11);

  });
});