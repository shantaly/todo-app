<template>
  <form class="todo-form" @submit.prevent="submit">
    <input v-model="title" placeholder="Title" type="text">
    <input v-model="description" placeholder="Description (optional)" type="text">
    <button class="todo-form__submit" :disabled="isTitleEmpty" type="submit">
      Add Todo
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Todo } from '../types/Todo';
import { useTodoStore } from '../stores/TodoStore';

export default defineComponent({
  name: 'TodoForm',
  setup() {
    const { addTodo } = useTodoStore()
    const title = ref('');
    const description = ref('');
    const clearForm = () => {
      title.value = ''
      description.value = ''
    }

    const isTitleEmpty = computed(() => {
      return title.value?.length == 0
    })

    const submit = () => {
      const newTodo = new Todo(Date.now(), title.value, description.value, false);
      addTodo(newTodo);
      clearForm()
    };

    return { title, description, submit, isTitleEmpty }
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.todo-form {
    display: flex;
    flex-direction: column;
    padding: $d-x-small;
    background-color: #2E4C89;
    border-radius: 0 0 $d-tiny $d-tiny;

    * {
        &:not(:last-child) {
            margin-bottom: $d-tiny;
        }
    }

    &__submit {
        border-radius: $d-tiny;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #54c759;
        padding: $d-tiny $d-x-small;
        font-size: 18px;
    }
}
</style>