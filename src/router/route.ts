import { RouteRecordRaw } from 'vue-router';

import template from '@/views/template.vue'
import sidebar_blog from '@/components/sidebar_blog.vue'
import sidebar_petstore from '@/components/sidebar_petstore.vue'


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
        name:"blog",
        component: template,
		redirect: { name: 'posts' },
        children:[
			{
				path: 'posts',
				meta: {
					title: '文章列表',
					requireAuth: true,
				},
				name:"posts",
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
				name:"addSingle",
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
				name:"spider",
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
        name:"petStore",
        component: template,
        children:[
          {
            path: 'products',
            meta: {
                title: '商品中心',
                requireAuth: true,
            },
            name:"products",
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
            name:"cart",
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
            name:"orders",
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
            name:"ordersDetails",
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
		component: () => import('@/views/demo/index.vue'),
		meta: {
			title: 'demo',
		},
		children:[
			{
				path: 'demo',
				name: 'demo',
				component: () => import('@/views/demo/demo.vue'),
				meta: {
					title: 'demo',
				},
			},
		
			{
				path: 'demo1',
				name: 'demo1',
				component: () => import('@/views/demo/demo1.vue'),
				meta: {
					title: 'demo1',
				},
			},
		
			{
				path: 'demo2',
				name: 'demo2',
				component: () => import('@/views/demo/demo2.vue'),
				meta: {
					title: 'demo2',
				},
			},
		
			{
				path: 'demo3',
				name: 'demo3',
				component: () => import('@/views/demo/demo3.vue'),
				meta: {
					title: 'demo3',
				},
			},
		
		
			{
				path: 'store',
				name: 'store',
				component: () => import('@/views/demo/store.vue'),
				meta: {
					title: 'store',
				},
			},
			{
				path: 'request',
				name: 'request',
				component: () => import('@/views/demo/request.vue'),
				meta: {
					title: 'request',
				},
			},
		]
	},



    {
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/blog'
    }


];
