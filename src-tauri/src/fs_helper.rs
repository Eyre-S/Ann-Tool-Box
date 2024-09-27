use std::{fs::File, io::{self, Read, Write}, path::Path};

use showfile::show_path_in_file_manager;

#[tauri::command]
pub async fn show_in_folder (path: String) {
	println!("opening directory in file manager: {}", path);
	let path = Path::new(&path)
		.canonicalize()
		.unwrap();
	println!("resolved absolute path: {}", path.display());
	show_path_in_file_manager(&path)
}

#[tauri::command]
pub fn get_abs_path (path: &str) -> String {
	println!("getting absolute path of: {}", path);
	let path = Path::new(path)
		.canonicalize()
		.unwrap();
	let path_abs_str = path.display().to_string();
	println!("resolved absolute path: {}", &path_abs_str);
	return path_abs_str;
}

#[tauri::command]
pub async fn file_write_string (path: String, file_content: String) -> Result<(), String> {
	
	let exec = || -> Result<(), io::Error> {
		
		let file_path = Path::new(&path);
		let mut file: File;
		if file_path.is_file() {
			file = File::create(&file_path)?;
		} else {
			file = File::create_new(&file_path)?;
		}
		file.write_all(file_content.as_bytes())?;
		return Ok(());
		
	}();
	
	exec.map_err(|err| -> String { err.to_string() })
	
}

#[tauri::command]
pub async fn file_read_string (path: String) -> Result<String, String> {
	
	let file_path = Path::new(&path);
	if !file_path.is_file() {
		return Err("File not found.".into());
	}
	
	let do_write = || -> Result<String, io::Error> {
		
		let mut file = File::open(&file_path)?;
		let mut string_content = String::new();
		file.read_to_string(&mut string_content)?;
		return Ok(string_content);
		
	}();
	do_write.map_err(|err| -> String { err.to_string() })
	
}
