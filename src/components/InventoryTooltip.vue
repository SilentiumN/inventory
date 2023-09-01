<script setup lang="ts">
// interface
import { computed } from 'vue';
import piniaInventoryStore from "@/store/inventory";

// interface
interface Props {
  text: string;
}

// store
const inventoryStore = piniaInventoryStore();

// variables
const props = defineProps<Props>();

// computed
const positionTop = computed(() => inventoryStore.positionTooltipTop);
const positionLeft = computed(() => inventoryStore.positionTooltipLeft);
</script>

<template>
  <div
    v-if="positionTop && positionLeft"
    class="inventory-tooltip"
    :style="{ '--position-top': `${positionTop}px`, '--position-left': `${positionLeft}px` }"
  >
    {{ props.text.toUpperCase() }}
  </div>
</template>

<style scoped lang="scss">
.inventory-tooltip {
  position: absolute;
  top: var(--position-top);
  left: var(--position-left);
  border-radius: 0px 5px 5px 5px;
  border: 2px solid #6c6c6c;
  background: #1a1a1a;
  padding: 0.4375rem 0.75rem;
  color: #969696;
  @include font('sm-plus', 'regular', 'Archivo Black');
  max-width: 8.22%;
  word-break: break-word;
}
</style>
