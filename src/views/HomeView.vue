<template>
  <main class="main-page-wrapper">
    <div class="todos-wrapper">
      <TodoList />
      <TodoForm />
      <div v-if="isLoading" class="loading-spinner-container">
        <LoadingEllipsis />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';
import LoadingEllipsis from '../components/LoadingEllipsis.vue';

import { useTodoStore } from '@/stores/TodoStore';

export default defineComponent({
  components: {
    TodoList,
    TodoForm,
    LoadingEllipsis,
  },
  setup() {
    const { state } = useTodoStore()
    const isLoading = computed(() => state.loading);
    return { isLoading }
  },
});
</script>

<style lang="scss">
@import '@/styles/main.scss';

.todos-wrapper {
  max-width: 460px;
  margin: $d-small;
  @include breakpoint(x-small) {
    margin: $d-small auto;
  }

}


.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>