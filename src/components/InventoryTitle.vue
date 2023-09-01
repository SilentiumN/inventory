<script lang="ts" setup>
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

<style lang="scss" scoped>
.inventory-title {
  width: 100%;
  padding: 0 0.75rem;
  @include font('lg', 'regular', 'Archivo Black');
  @include default-transition();
  text-transform: uppercase;
}
</style>
