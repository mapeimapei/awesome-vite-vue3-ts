import { RouteRecordRaw } from 'vue-router';
import template from '@/views/template.vue'
import sidebar_petstore from '@/components/sidebar_petstore.vue'

export default 	{
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
}