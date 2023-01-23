import { defineStore } from 'pinia';
import { Todo } from '../types/Todo';
import axios, { AxiosError } from 'axios';
import { ref } from 'vue';

interface TodosState {
  todos: Todo[],
  loading: boolean,
  error: string
}

export const useTodoStore = defineStore('todo', () => {
  const state = ref<TodosState>({
    todos: [],
    loading: false,
    error: '',
  });
  const parseError = (err: any) => {
    console.error(err);
    if (err instanceof AxiosError) {
      state.value.error = err.message
    }
  }
  const clearError = () => {
    state.value.error = ''
  }
  const fetchTodos = async () => {
    try {
      state.value.loading = true
      const response = await axios.get('/api/todos');
      state.value.todos = response.data
      clearError()
    } catch (err) {
      parseError(err)
    } finally {
      state.value.loading = false
    }
  }
  const addTodo = async (todo: Todo) => {
    try {
      state.value.loading = true
      const response = await axios.post('/api/todos', todo);
      state.value.todos.push(response.data);
      clearError()
    } catch (err) {
      parseError(err)
      fetchTodos()
    } finally {
      state.value.loading = false
    }
  }
  const updateTodo = async (todo: Todo) => {
    try {
      state.value.loading = true
      await axios.patch(`/api/todos/${todo.id}`, todo);
      state.value.todos = state.value.todos.map((item: Todo) => item.id === todo.id ? todo : item);
      clearError()
    } catch (err) {
      parseError(err)
      fetchTodos()
    } finally {
      state.value.loading = false
    }
  }
  const deleteTodo = async (id: number) => {
    try {
      state.value.loading = true
      await axios.delete(`/api/todos/${id}`);
      state.value.todos = state.value.todos.filter((item: Todo) => item.id !== id);
      clearError()
    } catch (err) {
      parseError(err)
      fetchTodos()
    } finally {
      state.value.loading = false
    }
  }
  return {
    state,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  }
});
