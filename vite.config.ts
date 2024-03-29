import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

import { svgBuilder } from './src/utils/svgBuilder';



const pathResolve = (dir: string): any => {
	// 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
	return resolve(__dirname, dir);
};

const alias: Record<string, string> = {
	'@': pathResolve("src"),
	"comps": resolve("src/components"),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
	"api": resolve('src/api'),
	"views": resolve('src/views'),
	"utils": resolve('src/utils'),
	"router": resolve('src/router'),
};

export default defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	// mode ==> { mode: 'development', command: 'serve', ssrBuild: false }
	// process.cwd() => D:\github\awesome-vite-vue3-ts
	return {
		lintOnSave: false,
		plugins: [
			vue(),
			[svgBuilder('./src/assets/icons/svg/')] // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
		],
		root: process.cwd(),
		resolve: { alias },
		//项目部署的基础路径
		base: env.VITE_PUBLIC_PATH,
		// 热更
		hmr: true, 
		// 强制预构建插件包
		optimizeDeps: {
			include: [
				// 'element-plus/lib/locale/lang/zh-cn', 
				// 'element-plus/lib/locale/lang/en', 
				// 'element-plus/lib/locale/lang/zh-tw',
				'axios'
			],
		},

		 // 本地运行配置，及反向代理配置
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: env.VITE_OPEN, // 在服务器启动时自动在浏览器中打开应用程序
			cors: true, // 默认启用并允许任何源
			//https.createServer()配置项
			https: false,
			//反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
			proxy: {
				// 匹配请求路径，localhost:3000/snow
				'/api': {
					target: 'http://127.0.0.1:9000', // 代理的目标地址
					// secure: true, // 是否https接口
					ws: true,// 是否代理websockets
					changeOrigin: true,
					//rewrite: (path) => path.replace(/^\/api/, '') // 路径重写，rewrite target目标地址 + '/api'，如果接口是这样的，那么不用重写
				},
				'/resStatic': {
					target: 'http://127.0.0.1:9000/', // 代理的目标地址
					// secure: true, // 是否https接口
					// ws: true,// 是否代理websockets
					changeOrigin: true,
					// 路径重写
					rewrite: (path) => path.replace(/^\/resStatic/, '')
				}
			},
		},

  		// 打包配置
		build: {
			outDir: 'dist', //指定输出路径
			minify: 'terser', // 混淆器，terser构建后文件体积更小
			sourcemap: false,
			chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						//echarts: ['echarts'],
					},

					// manualChunks(id) {
					// 	if (id.includes("node_modules")) {
					// 	  return id
					// 		.toString()
					// 		.split("node_modules/")[1]
					// 		.split("/")[0]
					// 		.toString();
					// 	}
					// },



				},
			},
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
		},
	};
});

