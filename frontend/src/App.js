import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>To-Do App</h1>

      <TaskForm fetchTasks={fetchTasks} />

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default App;