// server.js
// this is the backend for my simple todo app
// no database here, im just saving everything in a json file
// (learned this is called "file based storage" lol, works fine for small projects)

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// this lets our frontend (different port) talk to backend without cors errors
app.use(cors());
app.use(express.json());

// path to our "database" lol its just a json file
const DATA_FILE = path.join(__dirname, 'todos.json');

// if the file doesnt exist yet, make an empty one so app doesnt crash
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// small helper function to read todos from the file
function readTodos() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  // if file is empty for some reason just return empty array
  if (!data) return [];
  return JSON.parse(data);
}

// small helper function to save todos back to the file
function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const todos = readTodos();

  const text = req.body.text;

  // basic check so we dont save empty todos
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'todo text is required' });
  }

  const newTodo = {
    id: Date.now(), // not the most professional id but it works for this project
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.json(newTodo);
});

// PUT (update) a todo - mainly used for marking complete/incomplete
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const id = Number(req.params.id);

  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'todo not found' });
  }

  // update completed status (and text if they send new text too)
  if (req.body.text !== undefined) {
    todos[todoIndex].text = req.body.text;
  }
  if (req.body.completed !== undefined) {
    todos[todoIndex].completed = req.body.completed;
  }

  saveTodos(todos);

  res.json(todos[todoIndex]);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  let todos = readTodos();
  const id = Number(req.params.id);

  const newTodos = todos.filter(t => t.id !== id);

  // if length didnt change, that id wasnt found
  if (newTodos.length === todos.length) {
    return res.status(404).json({ error: 'todo not found' });
  }

  saveTodos(newTodos);

  res.json({ message: 'deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
