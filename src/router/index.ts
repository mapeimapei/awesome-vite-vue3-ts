import { createRouter, createWebHashHistory } from 'vue-router';
import staticRoutes from './route';
import pinia from '@/stores';
import { stores } from '@/stores';

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter (options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});


// 路由加载前
router.beforeEach(async (to, from, next) => {
  //console.log("router.to",to)
  const storesAuth = stores.useAuth(pinia);
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (!!storesAuth.access_token) {
       next()
    }else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next()
  }
})
// 路由加载后
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

// 导出路由
export default router;
