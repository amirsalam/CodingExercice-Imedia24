import React from 'react'
import ReactDom from 'react-dom'
import {render,screen,cleanup} from '@testing-library/react'
import App from '../App'

afterEach(()=>{
  cleanup();
})

test("renders without crashing",()=>{
    const div = document.createElement('div');
    ReactDom.render(<App />,div)

    expect(true).toBe(true);

})

test("should render App component",()=>{

  render(<App />)
  const pokemon = screen.getByTestId('pokemon1');
  expect(pokemon).toBeInTheDocument();

})




