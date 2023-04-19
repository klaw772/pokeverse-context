/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { PokemonDetails } from '../src/routes/PokemonDetails';
import { MOCK_ONE_POKEMON_DATA } from '../mocks/mockPokemonData';
const initialFetch = window.fetch;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ name: 'bulbasaur' }),
}))

describe('PokemonDetails', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(MOCK_ONE_POKEMON_DATA),
      })
    );
  });
  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('Should render', async () => {


    await act(async () => {
      render(
        <PokemonDetails />
      );
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('abilities:')).toBeInTheDocument();
    expect(screen.getByText('types:')).toBeInTheDocument();
    expect(screen.getByText('stats:')).toBeInTheDocument();
  });

});