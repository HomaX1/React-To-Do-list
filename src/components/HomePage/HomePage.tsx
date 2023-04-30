import './HomePage.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import List from '../List/List';
import React, {useState} from 'react';

function HomePage() {
  const [searchTaskValue, setSearchTaskValue] = useState('');

  function taskValueCallBack(taskValue: string) {
    setSearchTaskValue(taskValue);
  }

  return(
    <div className="home">
      <h1 className="h1 pt-4 title home__title">To-Do List</h1>
      <div className="home__wrap">
        <Search handleCallBack={taskValueCallBack}/>
        <button className="btn btn-primary home__button">
          <Link to={`/add-new-task`} className="home__link">
            <i className="bi bi-plus me-1"></i>
            <span>Add New Task</span>
          </Link>
        </button>
        <List searchTaskValue={searchTaskValue}/>
      </div>
    </div>
  );
}

export default HomePage;