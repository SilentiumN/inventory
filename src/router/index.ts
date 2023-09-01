import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import InventoryBlock from '@/components/InventoryBlock.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: InventoryBlock,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
