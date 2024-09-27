// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Runtime};

mod fs_helper;

fn main() {
	
	let mut builder = tauri::Builder::default();
	
	builder = builder
		.plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_clipboard_manager::init())
		.plugin(tauri_plugin_shell::init());
	
	builder = builder.invoke_handler(tauri::generate_handler![
		open_devtools,
		fs_helper::show_in_folder,
		fs_helper::get_abs_path,
		fs_helper::file_read_string,
		fs_helper::file_write_string,
	]);
	
	builder.run(tauri::generate_context!())
		.expect("error while running tauri application");
	
}

#[tauri::command]
async fn open_devtools<R: Runtime>(_app: tauri::AppHandle<R>, window: tauri::Window<R>) {
	// #[cfg(debug_assertions)]
	println!("Called open_devtools");
	window.get_webview_window("main").unwrap().open_devtools();
	// #[cfg(not(debug_assertions))]
	// println!("DevTools only available in debug mode");
}
