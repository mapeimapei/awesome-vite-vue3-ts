import { RouteRecordRaw } from 'vue-router';
import template from '@/views/template.vue'
import sidebar_demo from '@/components/sidebar_demo.vue'
export default {
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
}