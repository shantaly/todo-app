import { ref, onMounted } from 'vue';
import { Todo } from '../types/Todo';
import axios from 'axios';

interface TodosState {
  todos: Todo[]
}

export const useTodos = () => {
  const state = ref<TodosState>({
    todos: []
  });
  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      state.value.todos = response.data
    } catch (err) {
      console.error(err);
    }
  }
  const addTodo = async (todo: Todo) => {
    try {
      const response = await axios.post('/api/todos', todo);
      state.value.todos.push(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const updateTodo = async (todo: Todo) => {
    try {
      await axios.patch(`/api/todos/${todo.id}`, todo);
      state.value.todos = state.value.todos.map((item) => item.id === todo.id ? todo : item);
    } catch (err) {
      console.error(err);
    }
  }
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      state.value.todos = state.value.todos.filter((item) => item.id !== id);
    } catch (err) {
      console.error(err);
    }
  }
  onMounted(() => fetchTodos());
  return {
    state,
    addTodo,
    updateTodo,
    deleteTodo
  }
}