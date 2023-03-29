import React, { FC } from 'react';

interface SearchProps {}

const Search: FC<SearchProps> = () => (
  <div data-testid="Search" className="mb-3">
    <input className="form-control list__input" type="text" placeholder="Search"/>
  </div>
);

export default Search;
