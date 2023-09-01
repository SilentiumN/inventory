<script setup lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import InventoryListItem from '@/components/InventoryListItem.vue';
import type { InventoryItem } from '@/types/inventory';

// interface
interface Props {
  filledInventoryList: InventoryItem[];
  maxCountItemInRow: number;
  maxCountColumn: number;
}

// variables
const props = defineProps<Props>();

const inventoryList: Ref<(InventoryItem | null)[]> = ref([]);

// function
const fillInventory = (length: number) => {
  inventoryList.value = Array(length).fill(null);
};
const init = () => {
  fillInventory(40);
};

// watch
watch(
  () => props.filledInventoryList,
  (newVal) => {
    if (newVal) {
      console.log('watcher');
      const getInventoryLength = (
        filledInventoryListLength: number,
        minInventoryLength: number,
      ) => {
        if (filledInventoryListLength > minInventoryLength) {
          return filledInventoryListLength;
        }
        return minInventoryLength;
      };

      fillInventory(getInventoryLength(newVal.length, 40));

      inventoryList.value = inventoryList.value.map((_, i) => props.filledInventoryList[i] || null);

      console.log(inventoryList.value);
    }
  },
);

// hooks
onMounted(() => {
  init();
});
</script>

<template>
  <div class="inventory-list">
    <InventoryListItem
      v-for="index in inventoryList.length"
      :key="index"
      :inventoryItem="props.filledInventoryList[index] || null"
    />
  </div>
</template>

<style scoped lang="scss">
.inventory-list {
  width: 100%;
  height: max-content;
  border-collapse: collapse;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
