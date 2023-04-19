/** @jest-environment jsdom */
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Home } from '../src/routes';
import { MOCK_POKEMON_DATA } from '../mocks/mockPokemonData';
const initialFetch = window.fetch;

jest.mock("../src/components/PokemonCard", () => ({
  PokemonCard: jest.fn((props) => (
    <div data-testid="PokemonCard">{props.name}</div>
  ))
}));

describe('Home', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([]),
      })
    );
  });
  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('Should render pokemon cards', async () => {
    await act(async () => {
      render(<Home pokemonList={MOCK_POKEMON_DATA.results}/>);
    });

    expect(screen.getAllByTestId('PokemonCard').length).toEqual(5);
  });

  it('should search and filter', async () => {
    await act(async () => {
      render(<Home pokemonList={MOCK_POKEMON_DATA.results}/>);
    });
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('');
    fireEvent.change(input, {target: {value: 'ch'}})
    expect(input.value).toBe('ch');
    expect(screen.getAllByTestId('PokemonCard').length).toEqual(2);
  })
});