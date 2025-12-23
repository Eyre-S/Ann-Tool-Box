use std::env;
use std::path::Path;
use tauri::State;
use crate::AnnToolBox;
use crate::config::store::provider::{ConfigStoreProvider, FromUserData, FromUserDefined};
use crate::helpers::errors::Exception;

mod provider {
	
	use std::env;
	use std::path::PathBuf;
	use crate::helpers::errors::Exception;
	use crate::helpers::fs_helper::get_abs_path;
	
	pub trait ConfigStoreProvider {
		fn provider_name(&self) -> &'static str;
		fn get_config_dir (&self) -> Result<PathBuf, Exception>;
	}
	
	pub struct FromUserData {}
	impl ConfigStoreProvider for FromUserData {
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
	
	pub struct FromUserDefined {
		pub(crate) defined_path: String,
	}
	impl ConfigStoreProvider for FromUserDefined {
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
	
}

pub struct ConfigStore {
	pub path: Box<Path>
}

impl ConfigStore {
	
	pub fn get () -> Result<ConfigStore, Exception> {
		
		let config_dir_provider: Box<dyn ConfigStoreProvider> = match env::var("ANN_CONFIG_DIR") {
			Ok(val) => Box::new(FromUserDefined { defined_path: val }),
			Err(_) => Box::new(FromUserData {})
		};
		
		config_dir_provider.get_config_dir()
			.map(|path| ConfigStore { path: path.into_boxed_path() })
			.map_err(|err| Exception::with_source(
				format!("Cannot determine config directory (using {}).", config_dir_provider.provider_name()),
				Box::new(err)
			))
	}
	
}

#[tauri::command]
pub fn get_config_store (app_context: State<AnnToolBox>) -> Result<String, String> {
	// let app_context = app_context.lock().map_err(
	// 	|poisoned| format!("Cannot access global config directory: {}", poisoned)
	// )?;
	Ok(app_context.config_store.path.to_string_lossy().to_string())
}
