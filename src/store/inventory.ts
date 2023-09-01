// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { FilterItemName, InventoryItem } from '@/types/inventory';

export default defineStore('inventory', () => {
  // axios
  const instance: Ref<AxiosInstance | null> = ref(null);
  // сообщение подсказки
  const tooltipMessage: Ref<string> = ref('');
  // позиция подсказки
  const positionTooltipTop: Ref<number> = ref(0);
  const positionTooltipLeft: Ref<number> = ref(0);
  // список ячеек инвентаря
  const inventoryList: Ref<InventoryItem[]> = ref([])
  // текущий фильтр
  const currentFilterName: Ref<FilterItemName> = ref('all');

  // функция для проверка создан ли экземпляр axios'а
  function checkInstance() {
    if (!instance.value) {
      instance.value = axios.create({
        timeout: 5000,
      });
    }
  }

  // функция для получения заполненных ячеек инвентаря
  function getInventoryState(caseFromRoute: string) {
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
  }

  // функция для обновления текста подсказки инвентаря
  function updateTooltipMessage(value: string) {
    tooltipMessage.value = value;
  }

  // функция для обновления позиции подсказки
  function setPositionTooltip(evt: MouseEvent) {
    const isElInsideInventoryListContent = evt.composedPath().some(i => i instanceof HTMLElement ? i.classList.contains('inventory-list-item__content') : false);

    if (isElInsideInventoryListContent) {
      positionTooltipLeft.value = (evt.pageX || evt.clientX) + 5;
      positionTooltipTop.value = (evt.pageY || evt.clientY) + 9;
      return;
    }
    updateTooltipMessage('');
  }

  // функция для добавления к окну события перемещения мыши
  function addMouseMoveEventListener() {
    document.addEventListener('mousemove', setPositionTooltip);
  }

  // функция для удаления у окна события перемещения мыши
  function removeMouseMoveEventListener() {
    document.removeEventListener('mousemove', setPositionTooltip);
  }

  // функция для обновления текущего названия фильтра
  function updateFilterName(value: FilterItemName) {
    console.log(currentFilterName)
    currentFilterName.value = value;
  }

  // слежение за текстом подсказки и переключение события перемещения мыши у окна
  watch(tooltipMessage, (newVal) => {
    if (newVal) {
      addMouseMoveEventListener();
      return;
    }
    removeMouseMoveEventListener()
  })

  // получение отфильтрованного инвентаря
  const filteredInventoryList = computed((): InventoryItem[] => {
    if (currentFilterName.value === 'all') {
      return inventoryList.value;
    }
    console.log(currentFilterName.value, inventoryList.value.filter((item) => item.type === currentFilterName.value))
    return inventoryList.value.filter((item) => item.type === currentFilterName.value);
  });

  return {
    tooltipMessage,
    updateTooltipMessage,
    positionTooltipTop,
    positionTooltipLeft,
    getInventoryState,
    inventoryList,
    updateFilterName,
    currentFilterName,
    filteredInventoryList
  }
});
