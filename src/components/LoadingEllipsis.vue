<template>
  <div>
    <div class="lds-ellipsis" :class="[size, color]">
      <div />
      <div />
      <div v-if="!isSmall" />
      <div v-if="!isSmall" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'LoadingEllipsis',
  props: {
    size: {
      type: String,
      required: false,
      default: 'normal',
      validator: (value: string) => ['small', 'normal'].includes(value),
    },
    color: {
      type: String,
      required: false,
      default: 'gray',
      validator: (value: string) => ['black', 'gray'].includes(value),
    },
  },
  setup(props) {
    const isSmall = computed(() => props.size === 'small')
    return { isSmall }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: $d-x-large;
  height: $d-xx-small;
}

.lds-ellipsis.small {
  width: 40px;
}

.lds-ellipsis div {
  position: absolute;
  width: $d-xx-small;
  height: $d-xx-small;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis.gray div {
  background: #fff;
}

.lds-ellipsis.black div {
  background: #000;
}

.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(19px, 0);
  }
}
</style>
