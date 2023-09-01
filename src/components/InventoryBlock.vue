<script setup lang="ts">
import InventoryList from '@/components/InventoryList.vue';
import { computed, ref, watch, Ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { InventoryItem, Tab } from '@/types/inventory';
import InventoryTabs from '@/components/InventoryTabs.vue';
import InventoryFilter from '@/components/InventoryFilter.vue';
import InventoryTitle from '@/components/InventoryTitle.vue';
import { FilterItemName } from '@/types/inventory';
import InventoryTooltip from '@/components/InventoryTooltip.vue';
import piniaInventoryStore from "@/store/inventory";

// store
const inventoryStore = piniaInventoryStore();

// variables
const route = useRoute();
const instance: Ref<AxiosInstance | null> = ref(null);
const inventoryList: Ref<InventoryItem[]> = ref([]);
const inventoryListContainer: Ref<HTMLDivElement | null> = ref(null);
const maxHeightInventoryList: Ref<number> = ref(0);
const maxCountColumnInventoryList: Ref<number> = ref(8);
const maxCountItemInRowInventoryList: Ref<number> = ref(5);
const tabs: Ref<Tab[]> = ref([
  {
    name: 'backpack',
    title: 'backpack',
    disabled: false,
  },
  {
    name: 'nexus',
    title: 'nexus',
    disabled: true,
  },
]);
const selectedFilter: Ref<FilterItemName> = ref('all');


// function
const checkInstance = () => {
  if (!instance.value) {
    instance.value = axios.create({
      timeout: 5000,
    });
  }
};
const getInventoryState = (caseFromRoute: string) => {
  checkInstance();

  if (instance.value) {
    instance.value
      .get(
        `https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState?case=${caseFromRoute}`,
      )
      .then((res) => {
        const { data } = res;
        const { inventory } = data;

        inventoryList.value = inventory || [];
        console.log(inventoryList.value);
      });
  }
};

const setMaxHeightInventoryList = () => {
  const block = inventoryListContainer.value;
  if (block) {
    console.log(block.clientWidth);
    maxHeightInventoryList.value = Math.ceil(
      block.clientWidth *
        (maxCountColumnInventoryList.value / maxCountItemInRowInventoryList.value) +
        2,
    );
  }
};

const onResize = () => {
  setMaxHeightInventoryList();
};

const init = () => {
  setMaxHeightInventoryList();
};

const addResizeEvent = () => {
  window.addEventListener('resize', onResize);
};

const removeResizeEvent = () => {
  window.removeEventListener('resize', onResize);
};

const setSelectedFilter = (value: FilterItemName) => {
  selectedFilter.value = value;
};

// computed
const queryCase = computed(() => route.query.case);
const inventoryTitle = computed(() => {
  switch (selectedFilter.value) {
  case 'all':
    return 'all items';
  case 'armor':
    return 'armor';
  case 'misc':
    return 'misc';
  case 'weapon':
    return 'weapon';
  default:
    return '';
  }
});

const filteredInventoryList = computed((): InventoryItem[] => {
  if (selectedFilter.value === 'all') {
    return inventoryList.value;
  }
  return inventoryList.value.filter((item) => item.type === selectedFilter.value);
});

const tooltipMessage = computed(() => inventoryStore.tooltipMessage)

// watch
watch(queryCase, (newVal) => {
  if (newVal) {
    getInventoryState(newVal.toString());
  }
});

// hooks
onMounted(() => {
  init();
  addResizeEvent();
});

onBeforeUnmount(() => {
  removeResizeEvent();
});
</script>

<template>
  <div class="inventory-block">
    <InventoryTabs :tabs="tabs" />
    <div class="inventory-block__content">
      <InventoryFilter
        :selected-filter="selectedFilter"
        @setSelectedFilter="setSelectedFilter"
      />
      <div class="inventory-block__container-inventory">
        <InventoryTitle :title="inventoryTitle" />
        <div
          ref="inventoryListContainer"
          class="inventory-block__container-inventory-list"
          :style="{
            'max-height': `${maxHeightInventoryList}px`,
          }"
        >
          <InventoryList
            :filledInventoryList="filteredInventoryList"
            :maxCountItemInRow="maxCountItemInRowInventoryList"
            :maxCountColumn="maxCountColumnInventoryList"
          />
        </div>
      </div>
    </div>
    <InventoryTooltip
      v-if="tooltipMessage"
      :text="tooltipMessage"
    />
  </div>
</template>

<style scoped lang="scss">
.inventory-block {
  width: 30.3%;
  min-width: 200px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #242223;

  &__content {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 1rem;
    height: 100%;
  }

  &__container-inventory {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin: 0.75rem 0;
  }

  &__container-inventory-list {
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 19px;
    }

    &::-webkit-scrollbar-track {
      border-right: 9px solid transparent;
      border-left: 9px solid transparent;
      background-color: #454545;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-thumb {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      background-clip: padding-box;
      background-color: #d9d9d9;
    }
  }
}
</style>
