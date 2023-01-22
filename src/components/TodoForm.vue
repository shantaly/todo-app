<template>
    <form>
        <label>Title:
            <input v-model="title" type="text" />
        </label>
        <br>
        <label>Description:
            <input v-model="description" type="text" />
        </label>
        <br>
        <button @click="submit">{{ submitButtonText }}</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Todo } from '../types/Todo';
import { useTodos } from '../composables/useTodos';

interface Props {
    todo?: Todo
}

export default defineComponent({
    name: 'TodoForm',
    props: {
        todo: {
            type: Object as () => Props['todo'],
            required: false
        }
    },
    setup(props) {
        const { updateTodo, addTodo } = useTodos()
        const title = ref(props.todo?.title ?? '');
        const description = ref(props.todo?.description ?? '');

        const submitButtonText = computed(() => props.todo ? 'Update' : 'Add');

        const submit = () => {
            const newTodo = new Todo(Date.now(), title.value, description.value, false);
            if (props.todo) {
                updateTodo(newTodo);
            } else {
                addTodo(newTodo);
            }
        };

        return {
            title,
            description,
            submitButtonText,
            submit
        }
    }
});
</script>