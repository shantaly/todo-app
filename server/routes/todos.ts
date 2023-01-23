import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import { Todo } from 'server/models/Todo';

let todos: Todo[];

const todosFilePath = 'server/data/todos.json'

const getTodosFromStorage = () => {
  try {
    const data = fs.readFileSync(todosFilePath);
    todos = JSON.parse(data.toString());
  } catch (err) {
    todos = [];
  }
}

const router: Router = express.Router();

// Get all todos
router.get('/', (req: Request, res: Response) => {
  try {
    getTodosFromStorage()
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/', (req: Request, res: Response) => {
  getTodosFromStorage()
  const todo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  todos.push(todo);
  try {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos));
    res.status(201).json(todo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.patch('/:id', (req: Request, res: Response) => {
  getTodosFromStorage()
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: 'Cannot find todo' });
  }
  if (req.body.title != null) {
    if (req.body.title.length == 0) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    todo.title = req.body.title;
  }
  if (req.body.description != null) {
    todo.description = req.body.description;
  }
  if (req.body.completed != null) {
    todo.completed = req.body.completed;
  }
  try {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos));
    res.json(todo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', (req: Request, res: Response) => {
  getTodosFromStorage()
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: 'Cannot find todo' });
  }
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  try {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos));
    res.json({ message: 'Deleted Todo' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
