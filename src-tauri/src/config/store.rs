use std::env;
use std::path::Path;
use tauri::State;
use crate::AnnToolBox;
use crate::config::store::provider::{ConfigStoreProvider, FromUserData, FromUserDefined};
use crate::helpers::errors::Exception;

mod provider {
	
	use std::env;
	use std::path::{Path, PathBuf};
	use crate::helpers::errors::Exception;
	
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
			Ok(Path::new(&self.defined_path).into())
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
		
		let path = config_dir_provider.get_config_dir()
			.map_err(|err| Exception::with_source(
				format!("Cannot determine config directory (using {}).", config_dir_provider.provider_name()),
				Box::new(err)
			))?;
		
		log::info!("[ConfigStore] Get config directory '{}' using provider '{}'", path.display(), config_dir_provider.provider_name());
		
		// fallback create directory if not exists
		let path_exists = path.try_exists()
			.map_err(|err| Exception::with_source(
				format!("Cannot access config directory '{}'.", path.display()),
				Box::new(err)
			))?;
		if !path_exists {
			log::info!("[ConfigStore] Config directory '{}' does not exist. Creating a new one!", path.display());
			std::fs::create_dir_all(&path)
				.map_err(|err| Exception::with_source(
					format!("Cannot create config directory '{}'.", path.display()),
					Box::new(err)
				))?;
		}
		
		// absolute path
		let path = path.canonicalize()
			.map_err(|err| Exception::with_source(
				format!("Cannot canonicalize config directory '{}'.", path.display()),
				Box::new(err)
			))?;
		
		Ok(ConfigStore {
			path: path.into_boxed_path()
		})
		
	}
	
}

#[tauri::command]
pub fn get_config_store (app_context: State<AnnToolBox>) -> Result<String, String> {
	// let app_context = app_context.lock().map_err(
	// 	|poisoned| format!("Cannot access global config directory: {}", poisoned)
	// )?;
	Ok(app_context.config_store.path.to_string_lossy().to_string())
}
