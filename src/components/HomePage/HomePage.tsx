import './HomePage.scss';
import Search from '../Search/Search';
import {NavLink} from 'react-router-dom';
import List from '../List/List';
import React, {useState} from 'react';
import ListHeader from '../ListHeader/ListHeader';

function HomePage() {
  const [searchTaskValue, setSearchTaskValue] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);
  const [removeAll, setRemoveAllTask] = useState(false);

  function taskValueCallBack(taskValue: string) {
    setSearchTaskValue(taskValue);
  }

  function selectAllCallBack(selectAllTask:boolean) {
    setSelectedAll(selectAllTask);
  }

  function removeAllCallBack(removeAllTask:boolean) {
    setRemoveAllTask(removeAllTask);
  }

  return(
    <div className="home">
      <h1 className="h1 pt-4 title home__title">To-Do List</h1>
      <div className="home__wrap">
        <Search handleCallBack={taskValueCallBack}/>
        <NavLink to={`/add-new-task`} className="home__link">
          <button className="btn btn-primary home__button">
            <i className="bi bi-plus me-1"></i>
            <span>Add New Task</span>
          </button>
        </NavLink>
        <ListHeader handleCallBack={selectAllCallBack} handleRemoveCallBack={removeAllCallBack} selectedAll={selectedAll}/>
        <List searchTaskValue={searchTaskValue} selectedAll={selectedAll} removeAll={removeAll}
              handleSelectAllCallBack={selectAllCallBack} handleDeleteAllCallBack={removeAllCallBack}/>
      </div>
    </div>
  );
}

export default HomePage;