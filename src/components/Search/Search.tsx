import React, { useState } from 'react';
import SearchProps from './SearchProps';

function Search({ handleCallBack }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const targetElement = event.target as HTMLInputElement;
    setSearchValue(targetElement.value);

    handleCallBack(targetElement.value);
  }

  return (
    <div data-testid="Search" className="mb-3">
      <input
        className="form-control list__input"
        type="text"
        name="search-field"
        placeholder="Search"
        defaultValue={searchValue}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default Search;
