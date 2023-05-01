import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('<Search />', () => {
  function taskValueCallBack() {

  }

  test('it should mount', () => {
    render(<Search  handleCallBack={taskValueCallBack}/>);
    
    const search = screen.getByTestId('Search');

    expect(search).toBeInTheDocument();
  });
});