<script setup lang="ts">
import IconSet from '@/components/UI/IconSet.vue';
import type { iconName } from '@/components/UI/IconSet.vue';
import type { FilterItemName } from '@/types/inventory';
import { ref } from 'vue';
import type { Ref } from 'vue';

// interface
interface FilterItem {
  name: FilterItemName;
  icon: iconName;
}

interface Props {
  selectedFilter: FilterItemName;
}

// variables
const props = defineProps<Props>();
const emit = defineEmits<{
  setSelectedFilter: [value: FilterItemName];
}>();

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

// function
const updateSelectedFilter = (value: FilterItemName) => {
  emit('setSelectedFilter', value);
};
</script>

<template>
  <div class="inventory-filter">
    <button
      :class="{
        'inventory-filter__btn': true,
        'inventory-filter__btn_active': props.selectedFilter === filterItem.name,
      }"
      type="button"
      v-for="filterItem in filterList"
      :key="filterItem.name"
      @click="updateSelectedFilter(filterItem.name)"
    >
      <IconSet
        size="2.6875rem"
        :name="filterItem.icon"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.inventory-filter {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #393839;
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

    &_active {
      opacity: 1;
    }
  }
}
</style>
