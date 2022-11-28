import { RouteRecordRaw } from 'vue-router';
import template from '@/views/template.vue'
import sidebar_blog from '@/components/sidebar_blog.vue'
const blogRoutes:RouteRecordRaw = 	{
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
}

export default blogRoutes