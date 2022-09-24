import { RouteRecordRaw } from 'vue-router';

import template from '@/views/template.vue'
import sidebar_blog from '@/components/sidebar_blog.vue'
import sidebar_petstore from '@/components/sidebar_petstore.vue'
import sidebar_demo from '@/components/sidebar_demo.vue'

export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue'),
		meta: {
			title: '登录',
		},
	},



	{
		path: '/blog',
		meta: {
			title: '博客',
			requireAuth: true,
		},
		name: "blog",
		component: template,
		redirect: { name: 'posts' },
		children: [
			{
				path: 'posts',
				meta: {
					title: '文章列表',
					requireAuth: true,
				},
				name: "posts",
				components: {
					default: () => import('@/views/blog/posts.vue'),
					sidebar: sidebar_blog
				}
			},
			{
				path: 'addSingle',
				meta: {
					title: '添加文章',
					requireAuth: true,
				},
				name: "addSingle",
				components: {
					default: () => import('@/views/blog/addSingle.vue'),
					sidebar: sidebar_blog
				}
			},

			{
				path: 'spider',
				meta: {
					title: '网络爬虫',
					requireAuth: true,
				},
				name: "spider",
				components: {
					default: () => import('@/views/blog/spider.vue'),
					sidebar: sidebar_blog
				}
			},


		]
	},



	{
		path: '/petStore',
		redirect: { name: 'products' },
		meta: {
			title: '宠物商店',
			requireAuth: true,
		},
		name: "petStore",
		component: template,
		children: [
			{
				path: 'products',
				meta: {
					title: '商品中心',
					requireAuth: true,
				},
				name: "products",
				components: {
					default: () => import('@/views/petStore/products.vue'),
					sidebar: sidebar_petstore
				}
			},
			{
				path: 'cart',
				meta: {
					title: '购物车',
					requireAuth: true,
				},
				name: "cart",
				components: {
					default: () => import('@/views/petStore/cart.vue'),
					sidebar: sidebar_petstore
				}
			},
			{
				path: 'orders',
				meta: {
					title: '订单中心',
					requireAuth: true,
				},
				name: "orders",
				components: {
					default: () => import('@/views/petStore/orders.vue'),
					sidebar: sidebar_petstore
				}
			},
			{
				path: 'ordersDetails',
				meta: {
					title: '订单详情',
					requireAuth: true,
				},
				name: "ordersDetails",
				components: {
					default: () => import('@/views/petStore/ordersDetails.vue'),
					sidebar: sidebar_petstore
				}
			},
		]
	},

	{

		path: '/demo',
		name: 'demoIndex',
		redirect: { name: 'demo' },
		component: template,
		meta: {
			title: 'demo',
			//requireAuth: true,
		},
		children: [
			{
				path: 'demo',
				name: 'demo',
				meta: {
					title: 'demo'
				},
				components: {
					default: () => import('@/views/demo/demo.vue'),
					sidebar: sidebar_demo
				}
			},

			{
				path: 'demo3',
				name: 'demo3',
				meta: {
					title: 'demo3',
				},
				components: {
					default: () => import('@/views/demo/demo3.vue'),
					sidebar: sidebar_demo
				}
			},



			{
				path: 'store',
				name: 'store',
				meta: {
					title: 'store',
				},
				components: {
					default: () => import('@/views/demo/store.vue'),
					sidebar: sidebar_demo
				}
			},
			{
				path: 'request',
				name: 'request',
				meta: {
					title: 'request',
				},
				components: {
					default: () => import('@/views/demo/request.vue'),
					sidebar: sidebar_demo
				}
			},
		]
	},



	{
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
		redirect: '/blog'
	}


];
