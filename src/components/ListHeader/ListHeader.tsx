import React, { useState } from 'react';
import './ListHeader.scss';
import ListHeaderProps from './ListHeaderProps';

function ListHeader(props: ListHeaderProps) {
  const [checked, setCheckboxChange] = useState(false);
  const [removingTasks, setRemovingTasks] = useState(false);

  if (removingTasks) {
    setCheckboxChange(false);
    setRemovingTasks(false);
  }

  function handleCheckbox() {
    const checkboxChange = !checked;

    setCheckboxChange(checkboxChange);
    props.handleCallBack(checkboxChange);
  }

  function handleRemoveAllTasks() {
    const isRemove = !removingTasks;

    setRemovingTasks(isRemove);
    props.handleRemoveCallBack(isRemove);
  }

  return (
    <div className="mt-4 mb-3 list-header">
      <label className="list-header__label">
        <input
          className="form-check-input list-header__input"
          checked={checked}
          onChange={handleCheckbox}
          name="select-all-checkbox"
          type="checkbox"
        />
        <span className="ms-3 list-header__text">Select All</span>
      </label>
      {checked && (
        <div className="list-header__icons">
          <i
            className="bi bi-trash3 list-header__icon"
            onClick={handleRemoveAllTasks}
          ></i>
        </div>
      )}
    </div>
  );
}

export default ListHeader;
