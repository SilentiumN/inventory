// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export default defineStore('inventory', () => {
  const tooltipMessage: Ref<string> = ref('');
  const positionTooltipTop: Ref<number> = ref(0);
  const positionTooltipLeft: Ref<number> = ref(0);

  function updateTooltipMessage(value: string) {
    tooltipMessage.value = value;
  }

  function setPositionTooltip(evt: MouseEvent) {
    const isElInsideInventoryListContent = evt.composedPath().some(i => i instanceof HTMLElement ? i.classList.contains('inventory-list-item__content') : false);

    if (isElInsideInventoryListContent) {
      positionTooltipLeft.value = (evt.pageX || evt.clientX) + 5;
      positionTooltipTop.value = (evt.pageY || evt.clientY) + 9;
      return;
    }
    updateTooltipMessage('');
  }

  function addMouseMoveEventListener() {
    document.addEventListener('mousemove', setPositionTooltip);
  }

  function removeMouseMoveEventListener() {
    document.removeEventListener('mousemove', setPositionTooltip);
  }

  watch(tooltipMessage, (newVal) => {
    if (newVal) {
      addMouseMoveEventListener();
      return;
    }
    removeMouseMoveEventListener()
  })

  return {
    tooltipMessage,
    updateTooltipMessage,
    positionTooltipTop,
    positionTooltipLeft,
  }
});
