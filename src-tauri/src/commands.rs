use std::fs;

#[tauri::command]
#[allow(non_snake_case)]
pub fn read_json_file(filePath: String) -> Result<String, String> {
    match std::fs::read_to_string(filePath) {
        Ok(content) => Ok(content),
        Err(err) => Err(format!("Error reading JSON file: {}", err)),
    }
}

#[tauri::command]
#[allow(non_snake_case)]
pub fn get_files_in_directory(directoryPath: String) -> Result<Vec<String>, String> {
    let mut file_names = Vec::new();

    match fs::read_dir(&directoryPath) {
        Ok(entries) => {
            for entry in entries {
                if let Ok(entry) = entry {
                    if entry.file_type().unwrap().is_file() {
                        if let Some(file_name) = entry.file_name().into_string().ok() {
                            file_names.push(file_name);
                        }
                    }
                }
            }
        }
        Err(err) => {
            return Err(format!("Error reading directory: {}", err).into());
        }
    }

    Ok(file_names)
}
