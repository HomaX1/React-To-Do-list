import React, { useEffect, useState } from 'react';
import './ListHeader.scss';
import ListHeaderProps from './ListHeaderProps';

function ListHeader({ handleCallBack, handleRemoveCallBack }: ListHeaderProps) {
  const [checked, setCheckboxChange] = useState(false);
  const [removingTasks, setRemovingTasks] = useState(false);

  useEffect(() => {
    if (removingTasks) {
      setCheckboxChange(false);
      setRemovingTasks(false);
    }
  }, [removingTasks]);

  function handleCheckbox() {
    const checkboxChange = !checked;

    setCheckboxChange(checkboxChange);
    handleCallBack(checkboxChange);
  }

  function handleRemoveAllTasks() {
    const isRemove = !removingTasks;

    setRemovingTasks(isRemove);
    handleRemoveCallBack(isRemove);
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
