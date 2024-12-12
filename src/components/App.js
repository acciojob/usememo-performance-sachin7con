// SGN
import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Utility function to generate tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      task: `Todo ${i}`,
      completed: i % 2 === 0, // Even tasks are completed
    });
  }
  return tasks;
};

// Task list rendering with artificial slowdown
const TaskList = ({ tasks }) => {
  // Artificially slow down rendering
  const slowDown = () => {
    const start = Date.now();
    while (Date.now() - start < 50) {} // 50ms delay
  };
  slowDown();

  return (
    <ul>
      {tasks.map((todo) => (
        <li
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.task}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState("All"); // 'All', 'Active', 'Completed'
  const [darkMode, setDarkMode] = useState(false);

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");
    switch (filter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div style={{ background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <hr />

      <h2>Note: Rendering is artificially slowed down!</h2>

      {/* Task List */}
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default App;