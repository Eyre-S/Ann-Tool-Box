use crate::screens;
use tauri::{AppHandle, LogicalPosition, LogicalSize, Manager, Runtime, WebviewWindowBuilder, Window};

static WINDOW_ID: &str = "arcaea-shutter-screen";

#[tauri::command]
pub async fn open_shutter_screen<R: Runtime>(app: AppHandle<R>, window: Window<R>) -> Result<(), String> {
	
	if app.get_webview_window(WINDOW_ID).is_some() {
		return Err(format!("Window named '{}' is already open.", WINDOW_ID));
	}
	
	// calculate best window position
	let parent = window.get_webview_window(window.label())
		.ok_or_else(|| "Failed to get parent window position.".to_string())?;
	let scale_factor = parent.scale_factor()
		.map_err(|_| "Failed to get window scale factor.".to_string())?;
	let parent_pos: LogicalPosition<f64> = parent.inner_position()
		.map_err(|_| "Failed to get window position.".to_string())?
		.to_logical(scale_factor);
	let offset_size: LogicalSize<f64> = LogicalSize::new(490.0, 240.0);
	let best_pos = LogicalPosition::new(
		parent_pos.x + offset_size.width,
		parent_pos.y + offset_size.height,
	);
	log::debug!("[ui][{}] calculated best position for Arcaea Shutter Screen window: ({}, {})", window.label(), best_pos.x, best_pos.y);

	// open window
	let window_config = screens::get_window_config(&app, WINDOW_ID)
		.map_err(|e| e.to_string())?;
	
	let window_builder = WebviewWindowBuilder::from_config(&app, window_config)
		.map_err(|e| format!("Failed to build a window named '{}': {}", WINDOW_ID, e))?
		.position(best_pos.x, best_pos.y);
		
	window_builder.build()
		.map_err(|e| format!("Failed to open a window named '{}': {}", WINDOW_ID, e))?;
	log::info!("[ui][{}] Opened Arcaea Shutter Screen window successfully.", window.label());
	Ok(())
	
}

#[tauri::command]
pub async fn close_shutter_screen<R: Runtime>(app: AppHandle<R>) -> Result<(), String> {
	app.get_webview_window(WINDOW_ID)
		.ok_or_else(||format!("There are no active window named '{}'.", WINDOW_ID))?
		.close()
		.map_err(|e| format!("Failed to initiate closing of window '{}': {}", WINDOW_ID, e))
}
