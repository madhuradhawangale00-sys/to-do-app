import axios from "axios";

function TaskList({
  tasks,
  fetchTasks,
}) {

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/tasks/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (
    task
  ) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/tasks/${task._id}`,
        {
          completed: !task.completed,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div>
  {tasks.map((task) => (
    <div
      key={task._id}
      className={`task-card ${
        task.completed ? "completed" : ""
      }`}
    >
      <h3>{task.title}</h3>

      <p>
        {task.completed
          ? " Completed"
          : " Pending"}
      </p>

      {task.dueDate && (
        <p>
           {new Date(task.dueDate).toLocaleString()}
        </p>
      )}

      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={() => toggleComplete(task)}
        >
          {task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
  );
}

export default TaskList;