<script lang="ts" setup>
import type { iconName } from '@/components/UI/IconSet.vue';
import IconSet from '@/components/UI/IconSet.vue';
import type { FilterItemName } from '@/types/inventory';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import piniaInventoryStore from '@/store/inventory';

// TYPES
// тип элемента фильтра
interface FilterItem {
  name: FilterItemName;
  icon: iconName;
}

// STORE
const inventoryStore = piniaInventoryStore();

// VARIABLES
// список фильтров
const filterList: Ref<FilterItem[]> = ref([
  {
    name: 'all',
    icon: 'grid',
  },
  {
    name: 'armor',
    icon: 'armor',
  },
  {
    name: 'weapon',
    icon: 'weapons',
  },
  {
    name: 'misc',
    icon: 'misc',
  },
]);

// FUNCTIONS
// функция обновления фильтра
const updateSelectedFilter = (value: FilterItemName) => {
  inventoryStore.updateFilterName(value);
};

// COMPUTED
// текущее название фильтра
const currentFilterName = computed(() => inventoryStore.currentFilterName);
</script>

<template>
  <!-- ФИЛЬТР -->
  <div class="inventory-filter">
    <!-- КНОПКИ ФИЛЬТРА -->
    <button
      v-for="filterItem in filterList"
      :key="filterItem.name"
      :class="{
        'inventory-filter__btn': true,
        'inventory-filter__btn_active': currentFilterName === filterItem.name,
      }"
      type="button"
      @click="updateSelectedFilter(filterItem.name)"
    >
      <IconSet
        :name="filterItem.icon"
        size="2.6875rem"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.inventory-filter {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: $gray;
  height: 100%;
  padding: 0.75rem;

  &__btn {
    border: none;
    background-color: transparent;
    padding: 0;
    opacity: 0.5;
    color: currentColor;
    cursor: pointer;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    @include default-transition();

    &_active {
      opacity: 1;
    }
  }
}
</style>
