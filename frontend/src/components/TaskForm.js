import { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tasks`,
        {
          title,
          dueDate,
        }
      );

      setTitle("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;