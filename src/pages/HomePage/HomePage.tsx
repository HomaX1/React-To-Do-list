import './HomePage.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, List, ListHeader } from '../../components';

function HomePage() {
  const [searchTaskValue, setSearchTaskValue] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);
  const [removeAll, setRemoveAllTask] = useState(false);

  return (
    <div className="home">
      <h1 className="h1 pt-4 title home__title">To-Do List</h1>
      <div className="home__wrap">
        <Search handleCallBack={setSearchTaskValue} />
        <NavLink to={`/add-new-task`} className="home__link">
          <button className="btn btn-primary home__button">
            <i className="bi bi-plus me-1"></i>
            <span>Add New Task</span>
          </button>
        </NavLink>
        <ListHeader
          handleCallBack={setSelectedAll}
          handleRemoveCallBack={setRemoveAllTask}
        />
        <List
          searchTaskValue={searchTaskValue}
          selectedAll={selectedAll}
          removeAll={removeAll}
          handleSelectAllCallBack={setSelectedAll}
          handleDeleteAllCallBack={setRemoveAllTask}
        />
      </div>
    </div>
  );
}

export default HomePage;
