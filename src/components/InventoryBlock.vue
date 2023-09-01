<script setup lang="ts">
import InventoryList from '@/components/InventoryList.vue';
import { computed, ref, watch, Ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import type { Tab } from '@/types/inventory';
import InventoryTabs from '@/components/InventoryTabs.vue';
import InventoryFilter from '@/components/InventoryFilter.vue';
import InventoryTitle from '@/components/InventoryTitle.vue';
import InventoryTooltip from '@/components/InventoryTooltip.vue';
import piniaInventoryStore from "@/store/inventory";

// STORE
const inventoryStore = piniaInventoryStore();

// ROUTE
const route = useRoute();

// VARIABLES
// ссылка на контейнер списка ячеек инвентаря
const inventoryListContainer: Ref<HTMLDivElement | null> = ref(null);

// максимальная высота контейнера списка ячеек инвентаря
const maxHeightInventoryList: Ref<number> = ref(0);

// максимальное количество строк списка ячеек инвентаря без прокрутки
const maxCountRowInventoryList: Ref<number> = ref(8);

// максимальное количество ячеек в строке списка ячеек инвентаря
const maxCountItemInRowInventoryList: Ref<number> = ref(5);

// вкладки
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


// FUNCTIONS
// функция для расчета и установки максимальной высоты блока, в котором размещаются предметы инвентаря
const setMaxHeightInventoryList = () => {
  const block = inventoryListContainer.value;

  if (block) {
    maxHeightInventoryList.value = Math.ceil(
      block.clientWidth *
        (maxCountRowInventoryList.value / maxCountItemInRowInventoryList.value) +
        2,
    );
  }
};

// функция, объединяющая все необходимые действия при изменении экрана
const onResize = () => {
  setMaxHeightInventoryList();
};

// функция, объединяющая все необходимые действия при инициализации
const init = () => {
  setMaxHeightInventoryList();
};

// функция добавления к окну ивента изменения размеров экрана
const addResizeEvent = () => {
  window.addEventListener('resize', onResize);
};

// функция удаления у окна ивента изменения размеров экрана
const removeResizeEvent = () => {
  window.removeEventListener('resize', onResize);
};

// функция для обновления заполненных ячеек инвентаря
const updateInventoryState = (caseFromRoute: string) => {
  inventoryStore.getInventoryState(caseFromRoute)
}

// COMPUTED
// тип инвентаря
const queryCase = computed(() => route.query.case);

// текущее имя фильтра инвентаря
const currentFilterName = computed(() => inventoryStore.currentFilterName)

// заголовок инвентаря
const inventoryTitle = computed(() => {
  switch (currentFilterName.value) {
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

// сообщение подсказки при наведении на ячейку инвентаря
const tooltipMessage = computed(() => inventoryStore.tooltipMessage)

// WATCH
// обновление заполненных ячеек инвентаря при изменении типа инвентаря
watch(queryCase, (newVal) => {
  if (newVal) {
    updateInventoryState(newVal.toString());
  }
});

// HOOKS
onMounted(() => {
  init();
  addResizeEvent();
});

onBeforeUnmount(() => {
  removeResizeEvent();
});
</script>

<template>
  <!-- ИНВЕНТАРЬ -->
  <div class="inventory-block">
    <!-- ВКЛАДКИ ИНВЕНТАРЯ -->
    <InventoryTabs :tabs="tabs" />
    <!-- КОНТЕНТ ВКЛАДКИ ИНВЕНТАРЯ -->
    <div class="inventory-block__content">
      <!-- ФИЛЬТР ИНВЕНТАРЯ -->
      <InventoryFilter/>
      <!-- КОНТЕЙНЕР ОТФИЛЬТРОВАННОГО КОНТЕНТА ИНВЕНТАРЯ -->
      <div class="inventory-block__container-inventory">
        <!--ЗАГОЛОВОК СПИСКА ЯЧЕЕК ИНВЕНТАРЯ-->
        <InventoryTitle :title="inventoryTitle" />
        <!-- КОНТЕЙНЕР СПИСКА ЯЧЕЕК ИНВЕНТАРЯ -->
        <div
          ref="inventoryListContainer"
          class="inventory-block__container-inventory-list"
          :style="{
            'max-height': `${maxHeightInventoryList}px`,
          }"
        >
          <!-- СПИСОК ЯЧЕЕК ИНВЕНТАРЯ -->
          <InventoryList
            :maxCountItemInRow="maxCountItemInRowInventoryList"
            :maxCountColumn="maxCountRowInventoryList"
          />
        </div>
      </div>
    </div>
    <!-- ПОДСКАЗКА С НАЗВАНИЕМ ПРЕДМЕТА -->
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
  background-color: $gray-dark;
  word-break: break-word;

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
      background-color: $gray-light;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-thumb {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      background-clip: padding-box;
      background-color: $light;
    }
  }
}
</style>
