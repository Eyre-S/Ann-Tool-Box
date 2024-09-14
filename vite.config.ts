import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import VueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros/vite";
import VueReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	
	build: {
		target: "ES2022"
	},
	
	plugins: [
		
		VueMacros({
			
			plugins: {
				
				vue: vue({
					
					template: {
						compilerOptions: {
							isCustomElement: (tag) => {
								return ["ii"].includes(tag);
							}
						}
					}
					
				}),
				
				vueJsx: VueJsx()
				
			}
			
		}),
		
		VueReactivityTransform()
		
	],
	
	resolve: {
		alias: [
			{ find: "@", replacement: path.resolve(__dirname, "src") },
		]
	},
	
	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ["**/src-tauri/**"],
		},
	},
	
}));
