import React from 'react';
import './AddNewTask.scss';

function AddNewTask() {
  return (
    <div className="new-task">
      <h1 className="h1 pt-4 title new-task__title">Add New task</h1>
      <form className="new-task__form" action="src/components/AddNewTask#">
        <label className="mb-3 new-task__label">
          <input className="form-control new-task__input" type="text" placeholder="Task name"/>
        </label>
        <button className="btn btn-primary new-task__submit" type="submit">
          <i className="bi bi-plus me-1 new-task__icon"></i>
          <span className="new-task__text">Add</span>
        </button>
      </form>
    </div>
  )
}

export default AddNewTask;