import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vue_jsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve('src/renderer/src')
			}
		},
		plugins: [
			vue({
				template: {
					compilerOptions: {
						isCustomElement: (tag) => ['ii'].includes(tag)
					}
				}
			}),
			vue_jsx()
		]
	}
})
