import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vue_jsx from '@vitejs/plugin-vue-jsx'
import vue_macros from 'unplugin-vue-macros/vite'
import vue_ReactivityTransform from '@vue-macros/reactivity-transform/vite'

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
			vue_macros({
				plugins: {
					vue: vue({
						template: {
							compilerOptions: {
								isCustomElement: (tag) => ['ii'].includes(tag)
							}
						}
					}),
					vueJsx: vue_jsx()
				}
			}),
			vue_ReactivityTransform()
		]
	}
})
