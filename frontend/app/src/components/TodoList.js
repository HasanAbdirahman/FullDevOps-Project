import React, { useEffect, useState } from "react";
import "./TodoList.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      setText("");
      load();
    }
  }

  async function deleteTodo(id) {
    const res = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  function startEdit(todo) {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  async function saveEdit(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/todos/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    });
    if (res.ok) {
      setEditId(null);
      setEditText("");
      load();
    }
  }

  return (
    <div>
      <form onSubmit={add} style={{ marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
          style={{ padding: "8px", width: "70%" }}
        />
        <button style={{ padding: "8px 12px", marginLeft: 8 }}>Add</button>
      </form>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: "6px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {editId === todo.id ? (
                <form
                  onSubmit={saveEdit}
                  style={{ flex: 1, display: "flex", gap: "8px" }}
                >
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span>
                    <input type="checkbox" checked={todo.done} readOnly />{" "}
                    {todo.text}
                  </span>
                  <span>
                    <button
                      onClick={() => startEdit(todo)}
                      style={{ marginRight: 6 }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
