use std::{fs::{self, File}, io::BufReader};

#[tauri::command]
#[allow(non_snake_case)]
pub fn read_json_file(filePath: String) -> Result<String, String> {
    match std::fs::read_to_string(filePath.clone()) {
        Ok(content) => Ok(content),
        Err(_err) => {
            let f = File::open(filePath).unwrap();
            let r = BufReader::new(f);
            let s = utf16_reader::read_to_string(r);
        
            return Ok(s);

            //Err(format!("Error reading JSON file: {}", err))},
        }
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
