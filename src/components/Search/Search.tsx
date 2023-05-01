import React, {useState} from 'react';
import SearchProps from './SearchProps';

function Search(props: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const targetElement = event.target as HTMLInputElement;
    setSearchValue(targetElement.value);

    props.handleCallBack(targetElement.value);
  }

  return (
    <div data-testid="Search" className="mb-3">
      <input className="form-control list__input" type="text" placeholder="Search" defaultValue={searchValue}
             onKeyUp={e => handleKeyUp(e)}/>
    </div>
)}

export default Search;
