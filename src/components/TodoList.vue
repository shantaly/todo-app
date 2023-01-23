<template>
  <div class="todos-list-container">
    <div class="todos-list-container__header">
      <h1 class="todos-list-container__header__title">
        Todo List
      </h1>
      <button class="todos-list-container__header__btn" @click="fetchTodos">
        <i>
          <RefreshIcon />
        </i>
      </button>
    </div>

    <div class="todos-list-container__content">
      <div v-if="todos.length > 0" class="todos-list-container__content__list">
        <div v-for="(todo, index) in todos" :key="todo.id">
          <TodoItem :todo-item="todo" />
          <div v-if="index != todos.length - 1" class="divider" />
        </div>
      </div>
      <p v-else class="todos-list-container__content__empty">
        You have nothing to do :(
      </p>
    </div>
    <p v-if="errorMsg" class="todos-list-container__err">
      Something went wrong...
      {{ errorMsg }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import TodoItem from './TodoItem.vue';
import RefreshIcon from './icons/IconRefresh.vue'
import { useTodoStore } from '../stores/TodoStore';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
    RefreshIcon,
  },
  setup() {
    const { state, fetchTodos } = useTodoStore()
    const todos = computed(() => state.todos);
    const isLoading = computed(() => state.loading);
    const errorMsg = computed(() => state.error);
    onMounted(() => {
      fetchTodos()
    })
    return { todos, isLoading, errorMsg, fetchTodos }
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.todos-list-container {
    background-color: #f1f5fb;
    border-radius: $d-tiny $d-tiny 0 0;
    padding: $d-x-small;
    color: #162e57;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__title {
            margin: $d-tiny 0;
        }

        &__btn {
            border: none;
            border-radius: $d-tiny;
            background-color: #c8cad2;
            padding: 4px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: $d-tiny;
        border: 1px solid #e0e0e0;

        &__empty {
            padding: $d-x-small;
            align-self: center;
            font-size: 18px;
            font-weight: 500;
        }
    }

    &__err {
        background-color: #ffeeee;
        border-radius: $d-tiny;
        border: 1px solid #ffa4a4;
        padding: $d-tiny;
        margin-top: $d-x-small;
    }

    .divider {
        background-color: #e0e0e0;
        height: 1px;
    }
}
</style>