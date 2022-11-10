import TaskTable from '../components/TaskTable';
import MenuAppBar from '../components/MenuAppBar';
import FloatingButtonAddTask from '../components/FloatingButtonAddTask';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../data/api';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId === undefined) {
      api.get('/task/getAll')
      .then( (response) => {
        setTasks(response.data);
      });
      setUser(null);
    } else {
      api.get('/task/findByUserId?userId=' + userId)
      .then( (response) => {
        setTasks(response.data);
      });
      api.get('/user/findById?id=' + userId)
      .then( (response) => {
        setUser(response.data);
      });
    }
  }, [userId]);

  const handleNewTask = (task) => {
    setTasks([...tasks, task]);
  }

  const handleDeleteTask = (id) => {
    const newTasksList = tasks.filter((task) => task.id !== id);
    setTasks(newTasksList);
  }

  const handleEditTask = (updatedTask) => {
    const newTasksList = tasks.map((task) => {
      if(task.id === updatedTask.id) {
        const newTask = {
          ...task,
          title: updatedTask.title,
          description: updatedTask.description,
          done: updatedTask.done,
          userId: updatedTask.userId
        };
        return newTask;
      }
      return task;
    });
    setTasks(newTasksList);
  }

  const handleCheckboxTask = (id) => {
    const newTasksList = tasks.map((task) => {
      if(task.id === id) {
        const newTask = {
          ...task,
          done: !task.done
        };
        return newTask;
      }
      return task;
    });
    setTasks(newTasksList);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
      </header>
      <body>
        <h2>{user? user.name+"'s tasks":"Tasks"}</h2>
        <TaskTable tasks={tasks} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleCheckboxTask={handleCheckboxTask} />
        <FloatingButtonAddTask handleNewTask={handleNewTask} />
      </body>
    </div>
  );
}

export default TasksPage;
