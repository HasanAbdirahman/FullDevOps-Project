import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Todos (DevOps Demo)</h1>
      <TodoList />
    </div>
  );
}

export default App;
