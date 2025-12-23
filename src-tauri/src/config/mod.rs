pub(crate) mod store;

trait ConfigUnitCompatible {}
impl ConfigUnitCompatible for String {}
impl ConfigUnitCompatible for bool {}
impl ConfigUnitCompatible for f64 {}

trait ConfigUnit <'t, T: ConfigUnitCompatible + Clone> {
	
	fn key(&self) -> &'static str;
	
	fn default_value(&self) -> &'static T;
	fn value_on_init(&self) -> &Box<T>;
	fn value(&self) -> &Box<T>;
	fn set_value(&mut self, new_value: T);
	
}

struct ConfigUnitImpl <'t, T: ConfigUnitCompatible + 'static> {
	_key: &'static str,
	_default_value: &'static T,
	_value_on_init: Box<T>,
	_value: Box<T>,
}
impl <'t, T: ConfigUnitCompatible + 'static + Clone> ConfigUnit <'t, T> for ConfigUnitImpl <'t, T> {
	fn key(&self) -> &'static str {
		self._key
	}
	fn default_value(&self) -> &'static T {
		self._default_value
	}
	fn value_on_init(&self) -> &Box<T> {
		&(self._value_on_init)
	}
	fn value(&self) -> &Box<T> {
		&(self._value)
	}
	fn set_value(&mut self, new_value: T) {
		self._value = Box::new(new_value);
	}
}
impl <'t, T: ConfigUnitCompatible + Clone + 'static> ConfigUnitImpl <'t, T> {
	fn new(
		key: &'static str,
		default_value: &'static T,
		on_init: Box<T>,
	) -> Self {
		let value_on_init = on_init.clone();
		let value_curr = on_init;
		Self {
			_key: key,
			_default_value: default_value,
			_value_on_init: value_on_init,
			_value: value_curr,
		}
	}
}

pub fn init_app_config () -> app_config::This {
	app_config::init(|session_status| {
		session_status(|sidebar|{
			sidebar(Box::new(true))
		})
	})
}

pub mod app_config {
	
	pub struct This {
		session_status: session_status::This,
		// ui: ui::This,
		// features: features::This,
		// dev: dev::This,
	}
	pub fn init (
		session_status: impl FnOnce(&dyn FnOnce(&dyn FnOnce(&dyn FnOnce(Box<bool>) -> session_status::sidebar::This) -> session_status::sidebar::This) -> session_status::This) -> session_status::This
	) -> This {
		This {
			session_status: session_status::init(|sidebar|{(&sidebar)(Box::new(true))}),
		}
	}
	
	pub mod session_status {
		
		pub struct This {
			sidebar: sidebar::This,
		}
		pub fn init (
			sidebar: impl FnOnce(&dyn FnOnce(Box<bool>) -> sidebar::This) -> sidebar::This,
		) -> This {
			This {
				sidebar: sidebar(&sidebar::init)
			}
		}
		pub mod sidebar {
			use crate::config::ConfigUnitImpl;
			pub struct This {
				is_open: ConfigUnitImpl<'static, bool>,
			}
			pub fn init (
				is_open: Box<bool>,
			) -> This {
				This {
					is_open: ConfigUnitImpl::new("session_status.sidebar.is_open", &true, is_open),
				}
			}
		}
	}
	pub mod ui {
		use crate::config::ConfigUnitImpl;
		pub struct This {
			sidebar_auto_expand: ConfigUnitImpl<'static, bool>,
			use_native_frame: ConfigUnitImpl<'static, bool>,
		}
		pub fn init (
			sidebar_auto_expand: Box<bool>,
			use_native_frame: Box<bool>,
		) -> This {
			This {
				sidebar_auto_expand: ConfigUnitImpl::new(
					"ui.sidebar_auto_expand",
					&true,
					sidebar_auto_expand,
				),
				use_native_frame: ConfigUnitImpl::new(
					"ui.use_native_frame",
					&false,
					use_native_frame,
				),
			}
		}
	}
	pub mod features {
		use crate::config::ConfigUnitImpl;
		pub struct This {
			use_preview_features: ConfigUnitImpl<'static, bool>,
		}
		pub fn init (
			use_preview_features: Box<bool>,
		) -> This {
			This {
				use_preview_features: ConfigUnitImpl::new(
					"features.use_preview_features",
					&false,
					use_preview_features,
				),
			}
		}
	}
	pub mod dev {
		use crate::config::ConfigUnitImpl;
		pub struct This {
			enabled: ConfigUnitImpl<'static, bool>,
			show_session_info: ConfigUnitImpl<'static, bool>,
			setting_show_debug_info: ConfigUnitImpl<'static, bool>,
			open_dev_tools_on_launch: ConfigUnitImpl<'static, bool>,
			show_debug_overlay: ConfigUnitImpl<'static, bool>,
		}
		pub fn init (
			enabled: Box<bool>,
			show_session_info: Box<bool>,
			setting_show_debug_info: Box<bool>,
			open_dev_tools_on_launch: Box<bool>,
			show_debug_overlay: Box<bool>,
		) -> This {
			This {
				enabled: ConfigUnitImpl::new(
					"dev.enabled",
					&false,
					enabled,
				),
				show_session_info: ConfigUnitImpl::new(
					"dev.show_session_info",
					&false,
					show_session_info,
				),
				setting_show_debug_info: ConfigUnitImpl::new(
					"dev.setting_show_debug_info",
					&false,
					setting_show_debug_info,
				),
				open_dev_tools_on_launch: ConfigUnitImpl::new(
					"dev.open_dev_tools_on_launch",
					&false,
					open_dev_tools_on_launch,
				),
				show_debug_overlay: ConfigUnitImpl::new(
					"dev.show_debug_overlay",
					&false,
					show_debug_overlay,
				),
			}
		}
	}
	
}

struct AppConfigs <'t> {
	session_status: AppConfig_SessionStatus,
	ui: AppConfig_UI,
	features: AppConfig_Features,
	dev: AppConfig_Dev,
}
impl <'t> AppConfigs <'t> {
	fn init(
		session_status_sidebar_is_open: Box<bool>,
		dev_enabled: Box<bool>,
		dev_show_session_info: Box<bool>,
		dev_setting_show_debug_info: Box<bool>,
		dev_open_dev_tools_on_launch: Box<bool>,
		dev_show_debug_overlay: Box<bool>,
		ui_sidebar_auto_expand: Box<bool>,
		ui_use_native_frame: Box<bool>,
	) -> Self { Self {
		session_status: AppConfig_SessionStatus {
			sidebar: AppConfig_SessionStatus_Sidebar {
				is_open: ConfigUnitImpl::new(
					"session_status.sidebar.is_open",
					&true,
					session_status_sidebar_is_open,
				),
			},
		},
		ui: AppConfig_UI {
			sidebar_auto_expand: ConfigUnitImpl::new(
				"ui.sidebar_auto_expand",
				&true,
				ui_sidebar_auto_expand,
			),
			use_native_frame: ConfigUnitImpl::new(
				"ui.use_native_frame",
				&false,
				ui_use_native_frame,
			),
		},
		features: AppConfig_Features {
			use_preview_features: ConfigUnitImpl::new(
				"features.use_preview_features",
				&false,
				Box::new(false),
			),
		},
		dev: AppConfig_Dev {
			enabled: ConfigUnitImpl::new(
				"dev.enabled",
				&false,
				dev_enabled,
			),
			show_session_info: ConfigUnitImpl::new(
				"dev.show_session_info",
				&false,
				dev_show_session_info,
			),
			setting_show_debug_info: ConfigUnitImpl::new(
				"dev.setting_show_debug_info",
				&false,
				dev_setting_show_debug_info,
			),
			open_dev_tools_on_launch: ConfigUnitImpl::new(
				"dev.open_dev_tools_on_launch",
				&false,
				dev_open_dev_tools_on_launch,
			),
			show_debug_overlay: ConfigUnitImpl::new(
				"dev.show_debug_overlay",
				&false,
				dev_show_debug_overlay,
			),
		}
	}}
}

trait ConfigManager <'t> {
	fn store() -> &'t store::ConfigStore;
}
