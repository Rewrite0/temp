import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
});

export default router;
