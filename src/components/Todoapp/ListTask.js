import React, { useState } from "react";
import "./Todo.css";

const TodoList = ({
  todos,
  toggleComplete,
  handleDelete,
  handleEditTodo,
  editingTodoId,
  setEditingTodoId,
}) => {
  const [editTaskText, setEditTaskText] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditTaskText(todo.task);
  };

  const handleSaveClick = (id) => {
    if (!editTaskText.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    handleEditTodo(id, editTaskText);
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="todo-empty">No tasks added yet</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo.id)}
              className="todo-checkbox"
            />
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  className="add-task-input"
                />
                <button
                  className="todo-save"
                  onClick={() => handleSaveClick(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p
                  className={`todo-text ${
                    todo.isCompleted ? "todo-completed" : ""
                  }`}
                >
                  {todo.task}
                </p>
                <button
                  className="todo-edit"
                  onClick={() => handleEditClick(todo)}
                >
                  Edit
                </button>
                <button
                  className="todo-delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
