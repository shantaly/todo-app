<template>
    <div class="todo-container">
        <input type="checkbox" v-model="todo.completed" @change="updateTodoItem" />
        <div v-if="!editing">
            <p>{{ todo.title }}</p>
            <p>{{ todo.description }}</p>
        </div>
        <div v-else>
            <input type="text" v-model="editedTodo.title" @blur="updateTodoItem" />
            <input type="text" v-model="editedTodo.description" @blur="updateTodoItem" />
        </div>
        <button class="todo-action-btn warning" @click="editing = !editing">
            <i v-if="!editing">
                <EditIcon />
            </i>
            <i v-else>
                <SaveIcon />
            </i>
        </button>
        <button class="todo-action-btn danger" @click="deleteTodoBtnClicked">
            <i>
                <DeleteIcon />
            </i>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Todo } from '../types/Todo';
import { useTodos } from '../composables/useTodos';
import EditIcon from './icons/IconEdit.vue'
import SaveIcon from './icons/IconSave.vue'
import DeleteIcon from './icons/IconDelete.vue'

export default defineComponent({
    name: 'TodoItem',
    props: {
        todo: {
            type: Object as PropType<Todo>,
            required: true
        }
    },
    components: {
        SaveIcon,
        EditIcon,
        DeleteIcon
    },
    setup(props) {
        const { updateTodo, deleteTodo } = useTodos()
        const editedTodo = ref(props.todo);
        const editing = ref(false);
        const todo = ref(props.todo);

        const updateTodoItem = () => {
            updateTodo(props.todo);
            todo.value = editedTodo.value;
        };

        const deleteTodoBtnClicked = () => {
            deleteTodo(props.todo.id);
        };

        return {
            todo,
            editedTodo,
            editing,
            updateTodoItem,
            deleteTodoBtnClicked
        }
    }
});
</script>
<style lang="scss" scoped>
.todo-container {
    display: flex;
    padding: 12px 8px;
    justify-content: space-between;
    align-items: center;
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;

    color: black;
}
.todo-action-btn{
    border: none;
    background-color: aliceblue;
    :hover{
        background-color: aliceblue;
    }
}
</style>