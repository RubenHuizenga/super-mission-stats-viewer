// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::read_json_file,
            commands::get_files_in_directory
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
