/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../src/components/Navigation';
const initialFetch = window.fetch;


describe('PokemonCard', () => {

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

  it('Should render', async () => {
    await act(async () => {
      render(<Navigation />, 
        {wrapper: BrowserRouter}
      );
    });
    expect(screen.getByText('Pokeverse')).toBeInTheDocument();
    expect(screen.getByText('All Pokemon')).toBeInTheDocument();
  });

});