import React, {useState, useEffect} from 'react';
import './List.scss';
import TaskObject from './TaskInterface';
import Requests from '../Services/Requests';
import Message from '../Message/Message';
import ListProps from './ListProps';
import {useNavigate} from 'react-router-dom';

const srcPath = 'https://dummyjson.com/todos';
const getUrlPath = `${srcPath}?limit=8`;
const optionsGET = {
  method: 'GET'
};

function List(props: ListProps) {
  const navigate = useNavigate();
  const [fetchTasks, setFetchTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskObject[]>([]);
  const [error, setError] = useState(false);
  const [checked, setCheckboxChange] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState('Task is NOT deleted');
  let filteredTasks:TaskObject[] = [];
  let messageTimeOut:ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (!fetchTasks) {
      Requests(getUrlPath, optionsGET)
        .then((data) => {
          setTimeout(() => {
            setFetchTasks(true);
            setIsLoading(false);
            setTasks(data.todos);
          }, 1500);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
  }, [fetchTasks]);

  if (props.searchTaskValue.length) {
    filteredTasks = tasks.filter((task: TaskObject) => {
      return task.todo.toLowerCase().indexOf(`${props.searchTaskValue}`) !== -1;
    });
  } else {
    filteredTasks = tasks;
  }

  if (isLoading) {
    return (
      <div className="loading">
        <p className="loading__icon"></p>
      </div>
    );
  }

  function handleCheckbox(currentTask: TaskObject) {
    setCheckboxChange(!checked);

    const putUrlPath = `${srcPath}/${currentTask.id}`;
    const requestObject = {
      method: 'PUT',
      body: JSON.stringify({
        completed: checked,
      }),
    };

    Requests(putUrlPath, requestObject)
      .then((data) => {
        const newTasks = tasks.map((task: TaskObject) => {
          if (task.id === data.id) {
            return data;
          }
          return task;
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  function handleRemoveTask(currentTask: TaskObject) {
    const putUrlPath = `${srcPath}/${currentTask.id}`;
    const requestObject = {
      method: 'DELETE',
    };

    Requests(putUrlPath, requestObject)
      .then((data) => {
        const newTasks = tasks.filter((task: TaskObject) => {
          return task.id !== data.id;
        });
        clearTimeout(messageTimeOut);
        setDeleteStatus('Task is successfully deleted!');
        setShowMessage(true);
        setTasks(newTasks);
      })
      .catch((err) => {
        setDeleteStatus(`Something went wrong! Couldn't delete the task.`);
        setError(true);
        console.log(err.message);
      })
  }

  function handleEditTask(currentTask: TaskObject) {
    navigate('/add-new-task', { state: currentTask });
  }

  function MessageCallBack(childData: boolean) {
    messageTimeOut = setTimeout(() => {
      setShowMessage(childData);
    }, 5000);
  }

  return (
    <div data-testid="List">
      {showMessage &&
        <Message status={deleteStatus} deleteError={error} showMessage={showMessage} handleCallBack={MessageCallBack}/>
      }
      <ul className="mt-5 mb-4 list-group list">
        {!isLoading && !filteredTasks.length ?
          <p className="text-center">There is no any tasks here!</p>
          :
          (filteredTasks.map((task: TaskObject) => {
            return (
              <li className="list-group-item list__item" key={task.id}>
                <label className="me-3 list__label" onClick={() => handleCheckbox(task)}>
                  <input className="form-check-input list__input" defaultChecked={task.completed || checked}
                         type="checkbox"/>
                  <span className="ms-3 list__text">{task.todo}</span>
                </label>
                <div className="list__icons">
                  <i className="bi bi-pencil-square me-2 list__icon" onClick={() => handleEditTask(task)}></i>
                  <i className="bi bi-trash3 list__icon" onClick={() => handleRemoveTask(task)}></i>
                </div>
              </li>
            );
          }))
        }
      </ul>
    </div>
  )
}

export default List;

