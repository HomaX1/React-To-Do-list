import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import List from './List';

describe('<List />', () => {
  function selectAllCallBack() {}
  function removeAllCallBack() {}

  test('it should mount', () => {
    render(
      <List
        searchTaskValue=""
        selectedAll={false}
        removeAll={false}
        handleSelectAllCallBack={selectAllCallBack}
        handleDeleteAllCallBack={removeAllCallBack}
      />
    );

    const list = screen.getByTestId('List');

    expect(list).toBeInTheDocument();
  });
});
