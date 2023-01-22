<template>
  <main>
    <TodoList />
    <TodoForm  />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';

export default defineComponent({
  components: {
    TodoList,
    TodoForm
  }
});
</script>


