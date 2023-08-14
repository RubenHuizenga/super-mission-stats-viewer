import { useState, useEffect, ChangeEvent } from 'react';
//import { readDir, FileEntry } from "@tauri-apps/api/fs";
import "../css/missionList.css"
//import Pagination from "./Pagination";
import { invoke } from "@tauri-apps/api/tauri";
import MissionDataContent from './MissionDataContent';
import MissionDataHeader from './MissionDataHeader';
import { MissionDataInterface, JSONError } from '../interfaces/MissionData';
import Expandable from './Expandable';

//const itemsPerPage = 10;
//const gameDirectory = "D:\\Games\\SteamLibrary\\steamapps\\common\\Deep Rock Galactic\\FSD\\Mods\\SuperMissionStats";

interface BiomeImages {
    [biome: string]: string;
}

const biomeImages: BiomeImages = {
    "Azure Weald": "src/assets/biomes/Azure Weald.png",
    "Crystalline Caverns": "src/assets/biomes/Crystalline Caverns.png",
    "Dense Biozone": "src/assets/biomes/Dense Biozone.png",
    "Fungus Bogs": "src/assets/biomes/Fungus Bogs.png",
    "Glacial Strata": "src/assets/biomes/Glacial Strata.png",
    "Hollow Bough": "src/assets/biomes/Hollow Bough.png",
    "Magma Core": "src/assets/biomes/Magma Core.png",
    "Radioactive Exclusion Zone": "src/assets/biomes/Radioactive Exclusion Zone.png",
    "Salt Pits": "src/assets/biomes/Salt Pits.png",
    "Sandblasted Corridors": "src/assets/biomes/Sandblasted Corridors.png"
}

const MissionList = () => {
    const [folderName, setFolderName] = useState('');
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [fileContents, setFileContents] = useState<(MissionDataInterface | JSONError)[]>([]);
    const [filteredFileContents, setFilteredFileContents] = useState<(MissionDataInterface | JSONError)[]>([]);

    const fetchFileNames = async () => {
        try {
            const response = await invoke<string[]>('get_files_in_directory', {
                directoryPath: folderName,
            });
            setFileNames(response.reverse());
        } catch (error) {
            console.error('Error fetching file names:', error);
        }
    };

    const fetchJsonContent = async (fileName: string) => {
        try {
            const response = await invoke<string>('read_json_file', {
                filePath: `${folderName}/${fileName}`,
            });
            const parsedJson = JSON.parse(response) as MissionDataInterface;
            parsedJson.type = "MissionData";

            return parsedJson;
        } catch (error) {
            console.error('Error fetching JSON content:', error.message);
            const jsonError = { error } as JSONError;
            jsonError.type = "JSONError";

            return jsonError;
        }
    };

    const fetchData = async () => {
        await fetchFileNames();

        if (fileNames.length === 0) {
            return;
        }

        const fetchPromises = fileNames.map((fileName) => fetchJsonContent(fileName));

        Promise.all(fetchPromises)
            .then((results) => {
                setFileContents(results);
            })
            .catch((error) => {
                console.error('Error fetching JSON contents:', error);
            });
    };

    useEffect(() => {
        console.log(fileContents);
        setFilteredFileContents(fileContents.filter((content) => {
            return content.type === "MissionData"
        }));
    }, [fileContents]);

    useEffect(() => {
    }, [filteredFileContents]);

    const handleFolderNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFolderName(event.target.value);
    };

    return (
        <section className="mission-list">
            <input
                type="text" placeholder="Enter folder name" value={folderName} onChange={handleFolderNameChange}
            />
            <button onClick={fetchData}>Refresh</button>
            <ul>
                {filteredFileContents.map((content, index) => {
                    if (content.type === 'MissionData') {
                        return (
                            <section key={index} className={`mission-data ${content.MissionResult.WasSuccess ? 'success' : 'failure'}`} style={{ backgroundImage: `url('${biomeImages[content.MissionInfo.Biome]}'` }}>
                                <Expandable
                                    header={<MissionDataHeader object={content} />}
                                    content={<MissionDataContent object={content} />}
                                />
                            </section>
                        );
                    } else if (content.type === 'JSONError') {
                        return (
                            <div key={index} className="error-message">{content.error}</div>
                        );
                    } else {
                        return null;
                    }
                })}
            </ul >
        </section >
    )
}

export default MissionList;