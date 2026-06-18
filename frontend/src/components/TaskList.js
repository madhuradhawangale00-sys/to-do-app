import axios from "axios";

function TaskList({
  tasks,
  fetchTasks,
}) {

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/tasks/${id}`
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
        `http://localhost:4000/api/tasks/${task._id}`,
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
          className="task-card"
        >
          <h3>{task.title}</h3>

          <p>
            Status:
            {" "}
            {task.completed
              ? "Completed"
              : "Pending"}
          </p>

          {task.dueDate && (
            <p>
              Due:
              {" "}
              {new Date(
                task.dueDate
              ).toLocaleString()}
            </p>
          )}

          <button
            onClick={() =>
              toggleComplete(task)
            }
          >
            {task.completed
              ? "Undo"
              : "Complete"}
          </button>

          <button
            onClick={() =>
              deleteTask(task._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;