use crate::helpers::errors::Exception;
use crate::helpers::fs_helper::get_abs_path;
use crate::AnnToolBox;
use std::env;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;

trait ConfigDirProvider {
	fn provider_name(&self) -> &'static str;
	fn get_config_dir (&self) -> Result<PathBuf, Exception>;
}

struct UserDataConfigDirProvider {}
impl ConfigDirProvider for UserDataConfigDirProvider {
	fn provider_name(&self) -> &'static str { "UserDataConfigDirProvider" }
	fn get_config_dir (&self) -> Result<PathBuf, Exception> {
		let home_dir = env::home_dir();
		if home_dir.is_none() {
			Err(Exception::new("Cannot get home directory.".into()))
		} else {
			let mut config_dir = home_dir.unwrap();
			#[allow(unused_assignments)]
			let mut is_config_dir_set = false;
			#[cfg(target_os = "windows")] {
				config_dir.push("AppData");
				config_dir.push("Local");
				config_dir.push("ann-tool-box");
				is_config_dir_set = true;
			}
			#[cfg(target_os = "macos")] {
				config_dir.push("Library");
				config_dir.push("Application Support");
				config_dir.push("ann-tool-box");
				is_config_dir_set = true;
			}
			#[cfg(target_os = "linux")] {
				config_dir.push(".config");
				config_dir.push("ann-tool-box");
				is_config_dir_set = true;
			}
			if is_config_dir_set {
				Ok(config_dir)
			} else {
				Err(Exception::new("Unknown operating system, cannot determine default config directory.".into()))
			}
		}
	}
}

struct UserDefinedConfigDirProvider {
	defined_path: String,
}
impl ConfigDirProvider for UserDefinedConfigDirProvider {
	fn provider_name(&self) -> &'static str { "UserDefinedConfigDirProvider" }
	fn get_config_dir (&self) -> Result<PathBuf, Exception> {
		get_abs_path(&self.defined_path)
			.map(PathBuf::from)
			.map_err(|err| {
				Exception::with_source(
					"Cannot resolve config directory path.".into(),
					Box::new(Exception::new(err))
				)
			})
	}
}

pub fn get_config_dir () -> Result<PathBuf, Exception> {
	
	let config_dir_provider: Box<dyn ConfigDirProvider> = match env::var("ANN_CONFIG_DIR") {
		Ok(val) => Box::new(UserDefinedConfigDirProvider { defined_path: val }),
		Err(_) => Box::new(UserDataConfigDirProvider {})
	};
	
	config_dir_provider.get_config_dir().map_err(|err| Exception::with_source(
		format!("Cannot determine config directory (using {}).", config_dir_provider.provider_name()),
		Box::new(err)
	))
	
}

#[tauri::command]
pub fn get_current_config_dir (app_context: State<'_, Mutex<AnnToolBox>>) -> Result<String, String> {
	let app_context = app_context.lock().map_err(
		|poisoned| format!("Cannot access global config directory: {}", poisoned)
	)?;
	Ok(app_context.config_dir.to_string_lossy().to_string())
}
