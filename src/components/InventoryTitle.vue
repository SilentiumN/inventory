<script setup lang="ts">
// interface
interface Props {
  title: string;
}

// variables
const props = defineProps<Props>();
</script>

<template>
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
