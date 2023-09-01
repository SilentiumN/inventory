<script setup lang="ts">
import type { InventoryItem } from '@/types/inventory';
import IconSet from '@/components/UI/IconSet.vue';
import piniaInventoryStore from '@/store/inventory';
import { ref } from 'vue';
import type { Ref } from 'vue';

// TYPES
// интерфейс пропсов
interface Props {
  inventoryItem: InventoryItem | null;
}

// STORE
const inventoryStore = piniaInventoryStore();

// VARIABLES
// пропсы
const props = defineProps<Props>();

// ссылка на контент ячейки инвентаря
const inventoryListItemContent: Ref<HTMLDivElement | null> = ref(null);
// проверка загрузилась ли картинка
const isLoadingImg: Ref<boolean> = ref(true);

// FUNCTIONS
// функция для получения оставшихся секунд до снятия отката
const getSecondsCooldown = (cooldownTimestamp: number): number => {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();

  return Math.ceil((cooldownTimestamp - currentTimestamp) / 1000);
};

// функция для получения подсветки ячейки инвентаря
const getBackgroundSettingsInventoryListItem = (type: InventoryItem['type']): string => {
  const backgroundColor = {
    armor: 'radial-gradient(59.14% 59.14% at 50% 50%, #367CCE 0%, rgba(0, 95, 206, 0.00) 100%)',
    weapon: 'radial-gradient(59.14% 59.14% at 50% 50%, #7F59CE 0%, rgba(127, 89, 206, 0.00) 100%)',
    misc: 'transparent',
  };

  return `center / contain ${backgroundColor[type]} no-repeat border-box`;
};

// функция для обновления текста подсказки при наведении на ячейку
const updateTooltipText = (value: string) => {
  inventoryStore.updateTooltipMessage(value);
};
</script>

<template>
  <!-- ЯЧЕЙКА ИНВЕНТАРЯ -->
  <div
    class="inventory-list-item"
    @mouseover="updateTooltipText(props.inventoryItem?.name || '')"
    @focusin="updateTooltipText(props.inventoryItem?.name || '')"
  >
    <!-- КОНТЕНТ ЯЧЕЙКИ ИНВЕНТАРЯ -->
    <div
      ref="inventoryListItemContent"
      :class="{
        'inventory-list-item__content': true,
        'inventory-list-item__content_cooldown': props.inventoryItem.cooldown,
      }"
      v-if="props.inventoryItem"
      :style="{
        background: getBackgroundSettingsInventoryListItem(props.inventoryItem.type),
      }"
    >
      <!-- КАРТИНКА ПРЕДМЕТА -->
      <Transition name="fade">
        <img
          :class="{
          'inventory-list-item__image': true,
          'inventory-list-item__image_cooldown': props.inventoryItem.cooldown,
        }"
          :src="props.inventoryItem.imageUrl"
          :alt="props.inventoryItem.name"
          v-show='!isLoadingImg'
          @load='isLoadingImg = false'
        />
      </Transition>
      <!-- ОСТАВШЕЕСЯ КОЛИЧЕСТВО ПРЕДМЕТА -->
      <div
        v-if="props.inventoryItem.count"
        class="inventory-list-item__count"
      >
        {{ `x${props.inventoryItem.count}` }}
      </div>
      <!-- МАКСИМАЛЬНОЕ И ОСТАВШЕЕСЯ КОЛИЧЕСТВО ЗАРЯДОВ ПРЕДМЕТА -->
      <div
        v-if="props.inventoryItem.charges && props.inventoryItem.maxCharges"
        class="inventory-list-item__charges"
      >
        {{ `${props.inventoryItem.charges}/${props.inventoryItem.maxCharges}` }}
      </div>
      <!-- ОСТАВШЕЕСЯ ВРЕМЯ ДО ОТКАТА -->
      <div
        class="inventory-list-item__cooldown"
        v-if="props.inventoryItem.cooldown"
      >
        <IconSet
          size="1.75rem"
          color="#fff"
          name="cooldown"
        />
        <div class="inventory-list-item__cooldown-time">
          {{ getSecondsCooldown(props.inventoryItem.cooldown) }}
          <span class="unit">s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inventory-list-item {
  aspect-ratio: 1/1;
  position: relative;
  border: 1px solid $gray-light;
  background-color: $dark;

  &__content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.625rem;
    cursor: pointer;

    &_cooldown {
      cursor: default;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    @include default-transition();

    &_cooldown {
      opacity: 0.3;
    }
  }

  &__count,
  &__charges {
    color: $white;
    font-family:
      JetBrains Mono,
      serif;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position: absolute;
  }

  &__count {
    @include font('medium', 'medium', 'JetBrains Mono');
    bottom: 0;
    right: 0.25rem;
    text-align: right;
  }

  &__charges {
    @include font('sm-plus', 'medium', 'JetBrains Mono');
    top: 0;
    left: 0;
    width: 66%;
    height: 39%;
    padding-left: 0.125rem;
    background: linear-gradient(
      to top left,
      transparent 0%,
      transparent 50%,
      $black 50%,
      $black 100%
    );
  }

  &__cooldown {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.125rem 0.625rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;

    &-time {
      @include font('lg', 'regular', 'Archivo Black');
      color: $white;
      text-align: center;
      text-transform: uppercase;
      display: flex;
      align-items: baseline;
      gap: 0.0625rem;

      & > .unit {
        @include font('sm', 'regular', 'inherit');
      }
    }
  }
}
</style>
