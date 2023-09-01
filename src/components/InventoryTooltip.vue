<script lang="ts" setup>
import { computed } from 'vue';
import piniaInventoryStore from '@/store/inventory';

// TYPES
// тип пропсов
interface Props {
  text: string;
}

// STORE
const inventoryStore = piniaInventoryStore();

// VARIABLES
// пропсы
const props = defineProps<Props>();

// COMPUTED
// позиция подсказки от верха
const positionTop = computed((): number => inventoryStore.positionTooltipTop);

// позиция подсказки слева
const positionLeft = computed((): number => inventoryStore.positionTooltipLeft);
</script>

<template>
  <!-- ПОДСКАЗКА -->
  <div
    v-if="positionTop && positionLeft"
    :style="{ '--position-top': `${positionTop}px`, '--position-left': `${positionLeft}px` }"
    class="inventory-tooltip"
  >
    {{ props.text.toUpperCase() }}
  </div>
</template>

<style lang="scss" scoped>
.inventory-tooltip {
  position: absolute;
  top: var(--position-top);
  left: var(--position-left);
  border-radius: 0px 5px 5px 5px;
  border: 2px solid $gray-light-secondary;
  background: $dark;
  padding: 0.4375rem 0.75rem;
  color: $light;
  @include font('sm-plus', 'regular', 'Archivo Black');
  word-break: break-word;
}
</style>
