import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import {
  renderWithContext
} from './helpers/renderWithContext';


describe('Testes dos componentes <Table.jsx /> e <Filter.jsx />', () => {
  const loadInitialData = async () => {
    renderWithContext( < App / > );
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
    renderWithContext( < App / > );
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    const tableHeaders = await screen.findAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(13);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(11);
  });

  it('testa se o filtro de nome funciona e é case-sensitive', async () => {
    await loadInitialData();
    const nameInput = screen.getByTestId('name-filter');

    userEvent.type(nameInput, 'oO');
    expect(screen.getAllByRole('row')).toHaveLength(3);
    const tatooineName = screen.getByRole('cell', {
      name: /tatooine/i,
    })
    const nabooName = screen.getByRole('cell', {
      name: /naboo/i,
    })
    expect(tatooineName).toBeInTheDocument();
    expect(nabooName).toBeInTheDocument();

    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'bE');
    expect(screen.getAllByRole('row')).toHaveLength(2);
    const bespinName = screen.getByRole('cell', {
      name: /bespin/i
    })
    expect(bespinName).toBeInTheDocument();
    expect(tatooineName).not.toBeInTheDocument();
    expect(nabooName).not.toBeInTheDocument();
  });

  it('testa se o filtro por valores numéricos funciona corretamente', async () => {
    await loadInitialData();
    const filterButton = screen.getByRole('button', {
      name: /filtrar/i,
    });
    const columnInput = screen.getByRole('combobox', {
      name: /coluna:/i,
    });
    const comparisonInput = screen.getByRole('combobox', {
      name: /operador:/i,
    });
    const removeFiltersButton = screen.getByRole('button', {
      name: /remover filtros/i,
    });
    const valueInput = screen.getByTestId('value-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'maior que');
    fireEvent.change(valueInput, { target: { value: '10000' } });
    userEvent.click(filterButton)
    expect(screen.getAllByRole('row')).toHaveLength(8);

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'menor que');
    fireEvent.change(valueInput, { target: { value: '500' } });
    userEvent.click(filterButton)
    expect(screen.getAllByRole('row')).toHaveLength(6);

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    fireEvent.change(valueInput, { target: { value: '24' } });
    userEvent.click(filterButton)
    expect(screen.getAllByRole('row')).toHaveLength(3);

    userEvent.click(screen.getByTestId('remove-orbital_period'));
    expect(screen.getAllByRole('row')).toHaveLength(4);

    userEvent.click(removeFiltersButton);
    expect(screen.getAllByRole('row')).toHaveLength(11);
    userEvent.click(removeFiltersButton);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('testa se a ordenação por valores numéricos funciona corretamente', async () => {
    await loadInitialData();
    const orderButton = screen.getByRole('button', {
      name: /ordenar/i,
    });
    const columnInput = screen.getByRole('combobox', {
      name: /ordenar:/i,
    });
    const ascOption = screen.getByRole('radio', {
      name: /ascendente/i,
    })
    const descOption = screen.getByRole('radio', {
      name: /descendente/i,
    })
  });
});
