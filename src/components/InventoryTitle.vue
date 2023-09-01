<script setup lang="ts">
// TYPES
// тип пропсов
interface Props {
  title: string;
}

// VARIABLES
// пропсы
const props = defineProps<Props>();
</script>

<template>
  <!-- ЗАГОЛОВОК -->
  <div class="inventory-title">
    {{ props.title }}
  </div>
</template>

<style scoped lang="scss">
.inventory-title {
  width: 100%;
  padding: 0 0.75rem;
  @include font('lg', 'regular', 'Archivo Black');
  text-transform: uppercase;
}
</style>
