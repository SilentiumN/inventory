<script lang="ts" setup>
import type { Tab } from '@/types/inventory';
import IconSet from '@/components/UI/IconSet.vue';

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
    :style="{ '--count-tabs': props.tabs.length }"
    class="inventory-tabs"
  >
    <!-- ЭЛЕМЕНТЫ ВКЛАДОК -->
    <div
      v-for="tab in props.tabs"
      :key="tab.name"
      :class="{
        'inventory-tabs__item': true,
        'inventory-tabs__item_disabled': tab.disabled,
      }"
    >
      {{ tab.title.toUpperCase() }}
    </div>
    <!-- КНОПКА ЗАКРЫТИЯ -->
    <button
      class="inventory-tabs__item"
      type="button"
    >
      <IconSet
        name="close"
        size="1.75rem"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
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
    text-align: center;

    &_disabled {
      background-color: $gray;
      color: rgba($white, 0.5);
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
