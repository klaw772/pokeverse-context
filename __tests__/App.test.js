/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { App } from '../src/App';
const initialFetch = window.fetch;


jest.mock("../src/routes/PokemonDetails", () => ({
  PokemonDetails: jest.fn(() => (
    <div data-testid="PokemonDetails"></div>
  ))
}));

describe('App', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [],
          }),
      })
    );
  });
  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('Should render home page on default route', async () => {
    window.history.pushState({}, '', '/');
    await act(async () => {
      render(<App />);
    });
    const appContainer = screen.getByTestId('app');

    expect(appContainer).toBeInTheDocument();
    expect(screen.getByText('All Pokemon')).toBeInTheDocument();
  });

  it('Should render pokemon details page on a name route', async () => {
    window.history.pushState({}, '', '/charizard');
    await act(async () => {
      render(<App />);
    });
    const pokeDetails = screen.getByTestId('PokemonDetails');

    expect(pokeDetails).toBeInTheDocument();
  })
});
