<template>
  <div class="todo-container">
    <input v-model="editedTodo.completed" type="checkbox" @change="updateTodoItem">
    <div v-if="!editing" class="todo-container__content" :class="{ 'completed': editedTodo.completed }">
      <p class="todo-container__content__title">
        {{ todo.title }}
      </p>
      <p class="todo-container__content__desc">
        {{ todo.description }}
      </p>
    </div>
    <div v-else class="todo-container__inputs">
      <input v-model="editedTodo.title" placeholder="Title" type="text">
      <input v-model="editedTodo.description" placeholder="Description (optional)" type="text">
    </div>
    <div v-if="!editing" class="todo-actions">
      <button class="todo-actions__action-btn" @click="editing = true">
        <i>
          <EditIcon class="warning" />
        </i>
      </button>
      <button class="todo-actions__action-btn" @click="deleteTodoBtnClicked">
        <i>
          <DeleteIcon class="danger" />
        </i>
      </button>
    </div>
    <div v-else class="todo-actions">
      <button class="todo-actions__action-btn" :disabled="isEditedTitleEmpty" @click="updateTodoItem">
        <i>
          <SaveIcon class="success" :class="{ disbaled: isEditedTitleEmpty }" />
        </i>
      </button>
      <button class="todo-actions__action-btn" @click="cancelEditing">
        <i>
          <CloseIcon />
        </i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';
import { Todo } from '../types/Todo';
import { useTodoStore } from '../stores/TodoStore';
import EditIcon from './icons/IconEdit.vue'
import SaveIcon from './icons/IconSave.vue'
import CloseIcon from './icons/IconClose.vue'
import DeleteIcon from './icons/IconDelete.vue'

export default defineComponent({
  name: 'TodoItem',
  components: {
    SaveIcon,
    EditIcon,
    DeleteIcon,
    CloseIcon,
  },
  props: {
    todoItem: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup(props) {
    const { updateTodo, deleteTodo } = useTodoStore()
    const todo = ref({ ...props.todoItem });
    const editedTodo = ref({ ...props.todoItem });
    const editing = ref(false);

    const updateTodoItem = () => {
      updateTodo(editedTodo.value);
      todo.value = { ...editedTodo.value };
      editing.value = false
    };

    const cancelEditing = () => {
      editedTodo.value = { ...todo.value };
      editing.value = false
    }

    const deleteTodoBtnClicked = () => {
      deleteTodo(props.todoItem.id);
    };

    const isEditedTitleEmpty = computed(() => {
      return editedTodo.value?.title.length == 0
    })

    return {
      todo,
      editedTodo,
      editing,
      updateTodoItem,
      cancelEditing,
      isEditedTitleEmpty,
      deleteTodoBtnClicked,
    }
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.todo-container {
    display: flex;
    padding: $d-xx-small $d-tiny;
    justify-content: space-between;
    align-items: center;

    &__inputs {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 $d-xx-small;

        input {
            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }
    }

    &__content {
        flex: 1;
        padding: 0 $d-xx-small;

        &.completed {
            color: #c9c9c9;
        }

        &__title {
            font-size: $d-x-small;
        }

        &__desc {
            font-size: $d-xx-small;
            opacity: 70%;
        }
    }
}

.todo-actions {
    display: flex;

    &__action-btn {
        border: none;
        border-radius: $d-tiny;
        background-color: #f0f0f0;
        margin-left: $d-tiny;
        padding: 4px;
    }
}

.success {
    stroke: #429c30;
}

.warning {
    fill: #a8a33e;
}

.danger {
    stroke: #d57979;
}

.disbaled {
    stroke: gray;
}
</style>