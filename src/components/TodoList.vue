<template>
    <div class="todos-list-container">
        <div v-if="todos.length > 0">
            <div v-for="(todo, index) in todos" :key="todo.id">
                <TodoItem :todo="todo" />
                <div class="divider" v-if="index != todos.length - 1" />
            </div>
        </div>
        <div v-else>
            No Todos
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TodoItem from './TodoItem.vue';
import { useTodos } from '../composables/useTodos';

export default defineComponent({
    name: 'TodoList',
    components: {
        TodoItem
    },
    setup() {
        const { state } = useTodos()
        const todos = computed(() => state.value.todos);
        return { todos }
    }
});
</script>
<style lang="scss" scoped>
.todos-list-container {
    background-color: #f0f0f0;
    border: 2px solid gray;
    border-radius: 8px;
    min-width: 400px;

    .divider {
        background-color: black;
        height: 1px;
    }
}
</style>