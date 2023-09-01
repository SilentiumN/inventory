<script lang="ts" setup>
import type { Ref } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';
import InventoryListItem from '@/components/InventoryListItem.vue';
import type { InventoryItem } from '@/types/inventory';
import piniaInventoryStore from '@/store/inventory';

// STORE
const inventoryStore = piniaInventoryStore();

// VARIABLES
// список всех ячеек инвентаря
const inventoryList: Ref<(InventoryItem | null)[]> = ref([]);

// FUNCTIONS
// функция для инициализации ячеек инвентаря
const fillInventory = (length: number) => {
  inventoryList.value = Array(length).fill(null);
};

// функция, объединяющая все необходимые действия при инициализации
const init = () => {
  fillInventory(40);
};

// COMPUTED
// заполненные ячейки инвентаря
const filledInventoryList = computed(() => inventoryStore.filteredInventoryList);

// WATCH
// обновление ячеек инвентаря при изменении заполненных ячеек
watch(filledInventoryList, (newVal) => {
  if (newVal) {
    const getInventoryLength = (filledInventoryListLength: number, minInventoryLength: number) => {
      if (filledInventoryListLength > minInventoryLength) {
        return filledInventoryListLength;
      }
      return minInventoryLength;
    };

    fillInventory(getInventoryLength(newVal.length, 40));

    inventoryList.value = inventoryList.value.map((_, i) => filledInventoryList.value[i] || null);

    console.log(inventoryList.value);
  }
});

// HOOKS
onMounted(() => {
  init();
});
</script>

<template>
  <!-- СПИСОК ЯЧЕЕК ИНВЕНТАРЯ -->
  <div class="inventory-list">
    <!-- ЯЧЕЙКИ ИНВЕНТАРЯ -->
    <InventoryListItem
      v-for="index in inventoryList.length"
      :key="index"
      :inventoryItem="filledInventoryList[index - 1] || null"
    />
  </div>
</template>

<style lang="scss" scoped>
.inventory-list {
  width: 100%;
  height: max-content;
  border-collapse: collapse;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
