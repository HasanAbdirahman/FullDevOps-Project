// Very small in-memory store (suitable for demo/dev)
let todos = [];
let nextId = 1;

exports.listTodos = (req, res) => {
  res.json(todos);
};

exports.createTodo = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text required" });
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.getTodo = (req, res) => {
  const id = Number(req.params.id);
  const t = todos.find((x) => x.id === id);
  if (!t) return res.status(404).json({ error: "not found" });
  res.json(t);
};

exports.updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const t = todos.find((x) => x.id === id);
  if (!t) return res.status(404).json({ error: "not found" });
  const { text, done } = req.body;
  if (text !== undefined) t.text = text;
  if (done !== undefined) t.done = !!done;
  res.json(t);
};

exports.deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter((x) => x.id !== id);
  if (todos.length === before)
    return res.status(404).json({ error: "not found" });
  res.status(204).send();
};
