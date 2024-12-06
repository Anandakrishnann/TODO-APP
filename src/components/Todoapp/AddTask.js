import React, { useState } from "react";
import "./Todo.css";

const AddTask = ({ handleAddTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(task);
    setTask("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        className="add-task-input"
      />
      <button type="submit" className="add-task-button">
        Add
      </button>
    </form>
  );
};

export default AddTask;
