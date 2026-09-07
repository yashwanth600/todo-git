<<<<<<< HEAD
# My Todo App

Just a simple todo list app I'm building to practice git. No database,
todos are just saved in a json file on the backend.

## Structure

```
git-todo-app/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── .gitignore
└── README.md
```

## How to run it

1. Go into the backend folder and install dependencies:
   ```
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` (already done in this repo, but if you clone
   it fresh you'll need to do this yourself):
   ```
   cp .env.example .env
   ```

3. Start the backend server:
   ```
   node server.js
   ```
   You should see: `server is running on http://localhost:5000`

4. Open `frontend/index.html` in your browser (just double click it, or
   use the "Live Server" extension in VS Code).

5. Add some todos, mark them done, delete them. That's it lol.

## Why no database?

Because this project is just for me to practice git commands, not backend
stuff. The json file (`backend/todos.json`) acts like a mini database and
gets created automatically the first time you run the server. It's ignored
by git since it's generated data, not source code.

## Git practice ideas (for myself)

- [ ] init repo + first commit
- [ ] add .gitignore BEFORE committing node_modules (don't forget this one)
- [ ] make a branch for "add delete button" feature
- [ ] make a branch for "mark complete" feature
- [ ] merge both branches back into main
- [ ] try to break something on purpose and use `git revert`
- [ ] tag first working version as v1.0
=======
# git-todo-app
This repository is created to learn and practice Git.
>>>>>>> c1289b426d667da69a978d20ae5195bd753dcebe
