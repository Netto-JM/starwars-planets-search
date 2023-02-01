import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockFetchResolved, mockFetchRejected } from '../__mocks__/mockFetch';
import {
  renderWithContext
} from './helpers/renderWithContext';
import { act } from 'react-dom/test-utils';


describe('Testes dos componentes <Table.jsx /> e <Filter.jsx />', () => {
  const loadInitialData = async () => {
    renderWithContext(< App/>);
    await screen.findByRole('table');
    await screen.findAllByRole('columnheader');
    await screen.findAllByRole('row');
  }

  beforeEach(() => {
    global.fetch = mockFetchResolved;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa se os dados iniciais do componente <Table.jsx /> são carregados corretamente', async () => {
    renderWithContext(< App/>);
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

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.click(descOption);
    userEvent.click(orderButton);
    const orderedByDiameterDesc = screen.getAllByRole('row');
    expect(orderedByDiameterDesc[1]).toHaveTextContent(/Bespin/);
    expect(orderedByDiameterDesc[2]).toHaveTextContent(/Kamino/);
    expect(orderedByDiameterDesc[3]).toHaveTextContent(/Alderaan/);
    expect(orderedByDiameterDesc[4]).toHaveTextContent(/Coruscant/);
    expect(orderedByDiameterDesc[5]).toHaveTextContent(/Naboo/);
    expect(orderedByDiameterDesc[6]).toHaveTextContent(/Tatooine/);
    expect(orderedByDiameterDesc[7]).toHaveTextContent(/Yavin IV/);
    expect(orderedByDiameterDesc[8]).toHaveTextContent(/Dagobah/);
    expect(orderedByDiameterDesc[9]).toHaveTextContent(/Hoth/);
    expect(orderedByDiameterDesc[10]).toHaveTextContent(/Endor/);

    userEvent.selectOptions(columnInput, 'population');
    userEvent.click(ascOption);
    userEvent.click(orderButton);
    const orderedByPopulationAsc = screen.getAllByRole('row');
    expect(orderedByPopulationAsc).toHaveLength(11);
    expect(orderedByPopulationAsc[1]).toHaveTextContent(/Yavin IV/);
    expect(orderedByPopulationAsc[2]).toHaveTextContent(/Tatooine/);
    expect(orderedByPopulationAsc[3]).toHaveTextContent(/Bespin/);
    expect(orderedByPopulationAsc[4]).toHaveTextContent(/Endor/);
    expect(orderedByPopulationAsc[5]).toHaveTextContent(/Kamino/);
    expect(orderedByPopulationAsc[6]).toHaveTextContent(/Alderaan/);
    expect(orderedByPopulationAsc[7]).toHaveTextContent(/Naboo/);
    expect(orderedByPopulationAsc[8]).toHaveTextContent(/Coruscant/);
    expect(orderedByPopulationAsc[9]).toHaveTextContent(/Dagobah/);
    expect(orderedByPopulationAsc[10]).toHaveTextContent(/Hoth/);
  });

  it('testa se o componente de erro <Error.jsx /> é carregado em caso de erro', async () => {
    global.fetch = mockFetchRejected;
    act(() => {
      renderWithContext(< App/>);
    });
    const error = await screen.findByText('Error');
    expect(error).toBeInTheDocument();
  });
});
