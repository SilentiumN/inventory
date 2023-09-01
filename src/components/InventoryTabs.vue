<script setup lang="ts">
import IconSet from '@/components/UI/IconSet.vue';
import type { Tab } from '@/types/inventory';

// TYPES
// тип пропсов
interface Props {
  tabs: Tab[];
}

// VARIABLES
// пропсы
const props = defineProps<Props>();
</script>

<template>
  <!-- СПИСОК ВКЛАДОК -->
  <div
    class="inventory-tabs"
    :style="{ '--count-tabs': props.tabs.length }"
  >
    <!-- ЭЛЕМЕНТЫ ВКЛАДОК -->
    <div
      :class="{
        'inventory-tabs__item': true,
        'inventory-tabs__item_disabled': tab.disabled,
      }"
      v-for="tab in props.tabs"
      :key="tab.name"
    >
      {{ tab.title.toUpperCase() }}
    </div>
    <!-- КНОПКА ЗАКРЫТИЯ -->
    <button
      class="inventory-tabs__item"
      type="button"
    >
      <IconSet
        size="1.75rem"
        name="close"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.inventory-tabs {
  display: grid;
  grid-template-columns: repeat(var(--count-tabs, 0), 1fr) max-content;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    @include font('lg-plus', 'regular', 'Archivo Black');
    padding: 1rem;
    border: 1px solid $black;
    cursor: pointer;

    &_disabled {
      background-color: $gray;
      color: rgba($white, 0.5);
    }

    &:not(button) {
    }

    &:is(button) {
      color: rgba($white, 0.5);
      background: transparent;

      &:hover {
        color: rgba($white, 0.8);
      }
    }
  }
}
</style>
