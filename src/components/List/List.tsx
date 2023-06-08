import React, { useState, useEffect } from 'react';
import './List.scss';
import ITask from './List.model';
import { Message } from '../index';
import { Requests } from '../../Services';
import ListProps from './ListProps';
import { useNavigate } from 'react-router-dom';

const srcPath = 'https://dummyjson.com/todos';

function List({
  selectedAll,
  removeAll,
  handleSelectAllCallBack,
  handleDeleteAllCallBack,
  searchTaskValue,
}: ListProps) {
  const optionsGET = {
    method: 'GET',
  };
  const navigate = useNavigate();
  const [fetchTasks, setFetchTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState('Task is NOT deleted');
  let filteredTasks: ITask[] = [];
  let messageTimeOut: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (!fetchTasks) {
      Requests(`${srcPath}?limit=8`, optionsGET)
        .then((data) => {
          setTimeout(() => {
            setFetchTasks(true);
            setIsLoading(false);
            setTasks(data.todos);
          }, 1500);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    if (selectedAll && removeAll) {
      const selectAllTasks: boolean = !selectedAll;
      const removeAllTasks: boolean = !removeAll;

      handleSelectAllCallBack(selectAllTasks);
      handleDeleteAllCallBack(removeAllTasks);
    }
  }, [fetchTasks, selectedAll, removeAll]);

  if (searchTaskValue.length) {
    filteredTasks = getFilteredTask(searchTaskValue, tasks);
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

  if (selectedAll && removeAll) {
    removeAllTasks();
  }

  function getFilteredTask(searchValue: string, tasks: ITask[]) {
    return tasks.filter((task: ITask) => {
      return task.todo.toLowerCase().indexOf(`${searchTaskValue}`) !== -1;
    });
  }

  function removeAllTasks() {
    const idArray = tasks.map((item) => {
      return item.id;
    });

    const putUrlPath = `${srcPath}?objectIds=${idArray.join(',')}`;
    const requestMethod = {
      method: 'DELETE',
    };

    Requests(putUrlPath, requestMethod)
      .then(() => {
        const newTasks: ITask[] = [];
        setError(false);
        setDeleteStatus('All tasks are successfully deleted!');
        setTasks(newTasks);
      })
      .catch((err) => {
        setError(true);
        setDeleteStatus(`Current API doesn't support Delete All method.`);
        console.log(err.message);
      })
      .finally(() => {
        clearTimeout(messageTimeOut);
        ShowNotificationMessage();
      });
  }

  function handleCheckbox(currentTask: ITask) {
    const changedCheckbox = !currentTask.completed;
    const putUrlPath = `${srcPath}/${currentTask.id}`;
    const requestObject = {
      method: 'PUT',
      body: JSON.stringify({
        completed: changedCheckbox,
      }),
    };

    Requests(putUrlPath, requestObject)
      .then((data) => {
        const newTasks: ITask[] = tasks.map((task: ITask) =>
          task.id === data.id ? data : task
        );

        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleRemoveTask(currentTask: ITask) {
    const putUrlPath = `${srcPath}/${currentTask.id}`;
    const requestObject = {
      method: 'DELETE',
    };

    Requests(putUrlPath, requestObject)
      .then((data) => {
        const newTasks = tasks.filter((task: ITask) => {
          return task.id !== data.id;
        });
        setError(false);
        setDeleteStatus('Task is successfully deleted!');
        setTasks(newTasks);
      })
      .catch((err) => {
        setDeleteStatus(`Something went wrong! Couldn't delete the task.`);
        setError(true);
        console.log(err.message);
      })
      .finally(() => {
        clearTimeout(messageTimeOut);
        ShowNotificationMessage();
      });
  }

  function handleEditTask(currentTask: ITask) {
    navigate('/add-new-task', { state: currentTask });
  }

  function ShowNotificationMessage() {
    setShowMessage(true);

    messageTimeOut = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }

  return (
    <div data-testid="List">
      {showMessage && <Message status={deleteStatus} deleteError={error} />}
      <ul className="mb-4 list-group list">
        {!isLoading && !filteredTasks.length ? (
          <p className="text-center">There is no any tasks here!</p>
        ) : (
          filteredTasks.map((task: ITask) => {
            return (
              <li
                className={`list-group-item list__item ${
                  selectedAll ? 'list__item-color' : ''
                }`}
                key={task.id}
              >
                <label className="me-3 list__label">
                  <input
                    className="form-check-input list__input"
                    checked={task.completed}
                    type="checkbox"
                    name={`checkbox-${task.id}`}
                    onChange={() => handleCheckbox(task)}
                  />
                  <span className="ms-3 list__text">{task.todo}</span>
                </label>
                <div className="list__icons">
                  <i
                    className="bi bi-pencil-square me-2 list__icon"
                    onClick={() => handleEditTask(task)}
                  ></i>
                  <i
                    className="bi bi-trash3 list__icon"
                    onClick={() => handleRemoveTask(task)}
                  ></i>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default List;
