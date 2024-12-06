import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TodoList from "./ListTask";
import "./Todo.css";
const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (task) => {
    if (!task.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task: task.trim(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, updatedTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask.trim() } : todo
      )
    );
    setEditingTodoId(null); // Stop editing mode after saving
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="task-counters">
        <div className="task-counter total-counter">
          Total Tasks: <span>{totalTasks}</span>
        </div>
        <div className="task-counter completed-counter">
          Completed: <span>{completedTasks}</span>
        </div>
      </div>
      <AddTask handleAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
        handleEditTodo={handleEditTodo}
        editingTodoId={editingTodoId}
        setEditingTodoId={setEditingTodoId}
      />
    </div>

  );
};

export default Todo;
