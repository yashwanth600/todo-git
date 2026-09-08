// script.js
// this file talks to our backend api and updates the page

// change this if your backend runs on a different port
const API_URL = 'http://localhost:5000/api/todos';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// load todos as soon as the page opens
document.addEventListener('DOMContentLoaded', loadTodos);

addBtn.addEventListener('click', addTodo);

// also let user press enter instead of clicking button
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// fetch todos from backend and show them on page
function loadTodos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(todos => {
      renderTodos(todos);
    })
    .catch(err => {
      console.log('something went wrong loading todos:', err);
    });
}

// send new todo to backend
function addTodo() {
const text = todoInput.value.trim();

if (!text) {
  alert('enter something yaar🥵');
  return;
}

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text })
  })
    .then(res => res.json())
    .then(() => {
      todoInput.value = ''; // clear input box
      loadTodos(); // refresh the list
    })
    .catch(err => {
      console.log('couldnt add todo:', err);
    });
}

// toggle completed true/false
function toggleComplete(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  })
    .then(() => loadTodos())
    .catch(err => console.log('couldnt update todo:', err));
}

// delete a todo
function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(() => loadTodos())
    .catch(err => console.log('couldnt delete todo:', err));
}

// this just builds the html for the todo list
function renderTodos(todos) {
  todoList.innerHTML = ''; // clear old list first

  todos.forEach(todo => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span onclick="toggleComplete(${todo.id}, ${todo.completed})">${todo.text}</span>
      <div class="actions">
        <button class="deleteBtn" onclick="deleteTodo(${todo.id})">x</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}
