use std::{fs::{self, File}, io::Write, path::Path, string};

use showfile::show_path_in_file_manager;

#[tauri::command]
pub fn show_in_folder (path: String) {
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
pub fn file_write_string (path: String, file_content: String) {
	let file_path = Path::new(&path);
	let mut file: File;
	if file_path.is_file() {
		file = File::create(&file_path).unwrap();
	} else {
		file = File::create_new(&file_path).unwrap();
	}
	file.write_all(file_content.as_bytes()).unwrap();
}

#[tauri::command]
pub fn file_read_string (path: String) -> String {
	let string_content: String = fs::read_to_string(&path).unwrap();
	return string_content;
}
