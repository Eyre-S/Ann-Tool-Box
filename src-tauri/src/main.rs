// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Runtime};

mod fs_helper;
mod arcaea_shutter_screen;

fn main() {
	
	let _builder =
		tauri::Builder::default()
			
			.plugin(tauri_plugin_fs::init())
			.plugin(tauri_plugin_clipboard_manager::init())
			.plugin(tauri_plugin_shell::init())
			
			.invoke_handler(tauri::generate_handler![
				open_devtools,
				set_devtools,
				whoami,
				fs_helper::show_in_folder,
				fs_helper::get_abs_path,
				fs_helper::file_read_string,
				fs_helper::file_write_string,
				arcaea_shutter_screen::open_shutter_screen,
				arcaea_shutter_screen::close_shutter_screen,
			])
			
			// .setup(|app| {
				
			// 	let webview_url = tauri::WebviewUrl::App("index.html".into());
				
			// 	tauri::WebviewWindowBuilder::new(app, "ann-tool-box", webview_url)
			// 		.build()?;
				
			// 	Ok(())
				
			// })
			
			.run(tauri::generate_context!())
			.expect("error while running tauri application")
			
	;
	
}

#[tauri::command]
async fn open_devtools<R: Runtime>(_app: tauri::AppHandle<R>, window: tauri::Window<R>) {
	// #[cfg(debug_assertions)]
	println!("[ui][{}] opening devtools for itself.", window.label());
	window.get_webview_window(window.label()).unwrap().open_devtools();
	// #[cfg(not(debug_assertions))]
	// println!("DevTools only available in debug mode");
}

#[tauri::command]
async fn set_devtools<R: Runtime>(
	_app: tauri::AppHandle<R>, _window: tauri::Window<R>,
	label: Option<String>, enable: bool
) -> Result<(), String> {
	
	println!("[ui][{}] setting devtools for {} to {}.", _window.label(), label.clone().unwrap_or_else(|| "itself".into() ), enable);
	
	let label = label.unwrap_or_else(|| _window.label().into());
	
	_app.get_webview_window(&label).map_or_else(|| {
		println!("[ui][{}] webview window with label {} is not found!", _window.label(), &label);
		Err(format!("Webview window with label '{}' not found.", label))
	}, |win| {
		
		if enable {
			println!("[ui][{}] opening devtools for {}.", _window.label(), label);
			win.open_devtools();
		} else {
			println!("[ui][{}] closing devtools for {}.", _window.label(), label);
			win.close_devtools();
		}
		
		Ok(())
		
	})
	
}

#[tauri::command]
async fn whoami<R: Runtime>(window: tauri::Window<R>) -> String {
	window.label().into()
}
