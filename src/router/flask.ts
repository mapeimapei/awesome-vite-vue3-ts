import { RouteRecordRaw } from 'vue-router';
import template from '@/views/template.vue'
import sidebar_flask from '@/components/sidebar_flask.vue'
const blogRoutes:RouteRecordRaw = 	{
	path: '/flask',
	meta: {
		title: 'flask',
		requireAuth: true,
	},
	name: "flask",
	component: template,
	redirect: { name: 'demo1' },
	children: [
		{
			path: 'demo1',
			meta: {
				title: 'demo1',
				requireAuth: true,
			},
			name: "demo1",
			components: {
				default: () => import('@/views/flask/demo1.vue'),
				sidebar: sidebar_flask
			}
		},


	]
}

export default blogRoutes