// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::helpers::errors::Exception;
use simple_logger::SimpleLogger;
use std::env;
use tauri::{Manager, Runtime};
use crate::config::store::ConfigStore;

mod config;
mod screens;
mod helpers;

struct AnnToolBox {
	config_store: ConfigStore,
}

fn load_app_context () -> Result<AnnToolBox, Exception> {
	
	let config_store = match ConfigStore::get() {
		Ok(dir) => dir,
		Err(err) => {
			return Err(Exception::with_source(
				"Failed to get config directory.".into(),
				Box::new(err)
			));
		}
	};
	log::info!("[main] Config directory resolved to: {}", config_store.path.display());
	
	Ok(AnnToolBox {
		config_store
	})
	
}

fn main() {
	
	// initialize logger
	SimpleLogger::new().init().unwrap();
	
	// setup config directory
	let app_context = match load_app_context() {
		Ok(ctx) => ctx,
		Err(err) => {
			log::error!("[main] Failed to load application context: {}", err);
			panic!("Failed to load application context: {}", err);
		}
	};
	
	let mut builder = tauri::Builder::default();
	
	builder = builder
		.plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_clipboard_manager::init())
		.plugin(tauri_plugin_shell::init());
	
	builder = builder.invoke_handler(tauri::generate_handler![
		open_devtools,
		set_devtools,
		whoami,
		helpers::fs_helper::show_in_folder,
		helpers::fs_helper::get_abs_path,
		helpers::fs_helper::file_read_string,
		helpers::fs_helper::file_write_string,
		screens::arcaea_shutter_screen::open_shutter_screen,
		screens::arcaea_shutter_screen::close_shutter_screen,
		config::store::get_config_store,
	]);
	
	builder = builder.setup(|app| {
		app.manage(app_context);
		Ok(())
	});
	
	let tauri_context = tauri::generate_context!();
	let app = match builder.build(tauri_context) {
		Ok(app) => app,
		Err(err) => {
			log::error!("[main] Failed to build tauri application: {}", err);
			panic!("Failed to build tauri application: {}", err);
		}
	};
	
	app.run(|_, _|{});
	
}

#[tauri::command]
async fn open_devtools<R: Runtime>(_app: tauri::AppHandle<R>, window: tauri::Window<R>) {
	// #[cfg(debug_assertions)]
	log::info!("[ui][{}] opening devtools for itself.", window.label());
	window.get_webview_window(window.label()).unwrap().open_devtools();
	// #[cfg(not(debug_assertions))]
	// println!("DevTools only available in debug mode");
}

#[tauri::command]
async fn set_devtools<R: Runtime>(
	_app: tauri::AppHandle<R>, _window: tauri::Window<R>,
	label: Option<String>, enable: bool
) -> Result<(), String> {
	
	log::info!("[ui][{}] setting devtools for {} to {}.", _window.label(), label.clone().unwrap_or_else(|| "itself".into() ), enable);
	
	let label = label.unwrap_or_else(|| _window.label().into());
	
	_app.get_webview_window(&label).map_or_else(|| {
		log::info!("[ui][{}] webview window with label {} is not found!", _window.label(), &label);
		Err(format!("Webview window with label '{}' not found.", label))
	}, |win| {
		
		if enable {
			log::info!("[ui][{}] opening devtools for {}.", _window.label(), label);
			win.open_devtools();
		} else {
			log::info!("[ui][{}] closing devtools for {}.", _window.label(), label);
			win.close_devtools();
		}
		
		Ok(())
		
	})
	
}

#[tauri::command]
async fn whoami<R: Runtime>(window: tauri::Window<R>) -> String {
	window.label().into()
}
