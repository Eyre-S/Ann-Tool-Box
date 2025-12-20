use tauri::{utils::config::WindowConfig, Manager, Runtime};

static WINDOW_ID: &str = "arcaea-shutter-screen";

#[tauri::command]
pub async fn open_shutter_screen<R: Runtime>(_app: tauri::AppHandle<R>, _window: tauri::Window<R>) -> Result<(), String> {
	
	let existing_screen = _app.get_webview_window(WINDOW_ID);
	
	existing_screen.map_or_else(|| {
		
		let mut window_config: Option<&WindowConfig> = None;
		for i in &_app.config().app.windows {
			if i.label == WINDOW_ID {
				window_config = Some(&i);
				break;
			}
		}
		if window_config.is_none() {
			return Err("Arcaea Shutter Screen window configuration not found! Please report this bug to devs.".into());
		}
		
		let opened = tauri::WebviewWindowBuilder::from_config(&_app, window_config.unwrap())
			.unwrap()
			.build();
		
		match opened {
			Ok(_) => {
				log::info!("[ui][{}] Opened Arcaea Shutter Screen window successfully.", _window.label());
				Ok(())
			},
			Err(e) => Err(format!("Failed to open Arcaea Shutter Screen window: {}", e)),
		}
		
	}, |_| {
		Err("Arcaea Shutter Screen window already exists!".into())
	})
	
}

#[tauri::command]
pub async fn close_shutter_screen<R: Runtime>(_app: tauri::AppHandle<R>) -> Result<(), String> {
	
	let existing_screen = _app.get_webview_window(WINDOW_ID);
	
	existing_screen.map_or_else(|| {
		Err("Arcaea Shutter Screen window not found!".into())
	}, |screen| {
		let closed = screen.close();
		match closed {
			Ok(ok) => Ok(ok),
			Err(e) => Err(format!("Failed to close Arcaea Shutter Screen window: {}", e)),
		}
	})
	
}
