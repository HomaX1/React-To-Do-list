import React, {useState} from 'react';
import './AddNewTask.scss';
import {useForm, SubmitHandler} from 'react-hook-form';
import NewTaskInterface from './NewTaskInterface';
import Requests from '../Services/Requests';
import {useNavigate, useLocation} from 'react-router-dom';
import OptionObject from '../Services/OptionObjectInterface';

function AddNewTask() {
  const navigate = useNavigate();
  const srcPath = 'https://dummyjson.com/todos';
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<NewTaskInterface>();

  console.log(watch('taskName'));

  const location = useLocation();
  const editTaskName = location.state;
  const [isDisable, setIsDisable] = useState(false);
  let taskNameValue = watch('taskName');

  React.useEffect(() => {
    setFocus('taskName');
    if (editTaskName && taskNameValue === editTaskName.todo) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [setFocus, editTaskName, taskNameValue]);

  function newTaskSubmit(newTask:NewTaskInterface): SubmitHandler<NewTaskInterface> | void {
    const capitalizedTaskName = newTask.taskName.charAt(0).toUpperCase() + newTask.taskName.slice(1);
    const getId = Math.floor(Math.random() * 100);
    let putUrlPath = '';
    let requestObject: OptionObject;

    if (editTaskName) {
      const taskToDo = newTask.taskName ? capitalizedTaskName : editTaskName.todo;
      putUrlPath = `${srcPath}/${editTaskName.id}`;
      requestObject = {
        method: 'PUT',
        body: JSON.stringify({
          todo: taskToDo,
        })
      };
    } else {
      putUrlPath = `${srcPath}/add`;
      requestObject = {
        method: 'POST',
        body: JSON.stringify({
          todo: capitalizedTaskName,
          completed: false,
          userId: getId
        })
      };
    }

    Requests(putUrlPath, requestObject)
      .then((data) => {
        navigate('/', {state: data});
      })
      .catch((err) => {
        console.log(err.message, 'error');
      })
  }

  return (
    <div className="new-task">
      <h1 className="h1 pt-4 title new-task__title">Add New task</h1>
      <form className="new-task__form" onSubmit={handleSubmit(newTaskSubmit)}>
        <label className="mb-3 new-task__label">
          <input className="form-control new-task__input"
                 {...register('taskName', {minLength: 3})}
                 defaultValue={editTaskName ? editTaskName.todo : ''}
                 type="text"
                 placeholder="Task name"/>
        </label>
        {errors.taskName && <p className="text-danger">Task should have minimum 3 characters</p>}
        <button className="btn btn-primary new-task__submit" type="submit" disabled={isDisable || !taskNameValue}>
          <i className="bi bi-plus me-1 new-task__icon"></i>
          <span className="new-task__text">Add</span>
        </button>
      </form>
    </div>
  )
}

export default AddNewTask;