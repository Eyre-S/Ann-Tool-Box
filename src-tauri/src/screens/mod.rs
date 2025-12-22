use tauri::{AppHandle, Runtime};
use tauri::utils::config::WindowConfig;
use crate::helpers::errors::Exception;

pub(crate) mod arcaea_shutter_screen;

pub fn get_window_config <'a, R: Runtime> (app: &'a AppHandle<R>, window: &str) -> Result<&'a WindowConfig, Exception> {
	let mut window_config: Option<&WindowConfig> = None;
	for i in &app.config().app.windows {
		if i.label == window {
			window_config = Some(&i);
			break;
		}
	}
	window_config.ok_or(Exception::new(format!("{} window configuration not found!", window)))
}
