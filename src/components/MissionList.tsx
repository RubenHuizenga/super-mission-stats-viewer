import { useState, useEffect, ChangeEvent } from 'react';
//import { readDir, FileEntry } from "@tauri-apps/api/fs";
import "../css/missionList.css"
//import Pagination from "./Pagination";
import { invoke } from "@tauri-apps/api/tauri";
import MissionDataContent from './MissionDataContent';
import MissionDataHeader from './MissionDataHeader';
import { MissionDataInterface, JSONError } from '../interfaces/MissionData';
import Expandable from './Expandable';
import AzureWeald from "../assets/biomes/Azure Weald.png";
import CrystallineCaverns from "../assets/biomes/Crystalline Caverns.png";
import DenseBiozone from "../assets/biomes/Dense Biozone.png";
import FungusBogs from "../assets/biomes/Fungus Bogs.png";
import GlacialStrata from "../assets/biomes/Glacial Strata.png";
import HollowBough from "../assets/biomes/Hollow Bough.png";
import MagmaCore from "../assets/biomes/Magma Core.png";
import RadioactiveExclusionZone from "../assets/biomes/Radioactive Exclusion Zone.png";
import SaltPits from "../assets/biomes/Salt Pits.png";
import SandblastedCorridors from "../assets/biomes/Sandblasted Corridors.png";
import DrgBg from '../assets/drg.jpg'
import OverallStats from "./OverallStats"

//const itemsPerPage = 10;
//const gameDirectory = "D:\\Games\\SteamLibrary\\steamapps\\common\\Deep Rock Galactic\\FSD\\Mods\\SuperMissionStats";

interface BiomeImages {
    [biome: string]: string;
}

const biomeImages: BiomeImages = {
    "Azure Weald": AzureWeald,
    "Crystalline Caverns": CrystallineCaverns,
    "Dense Biozone": DenseBiozone,
    "Fungus Bogs": FungusBogs,
    "Glacial Strata": GlacialStrata,
    "Hollow Bough": HollowBough,
    "Magma Core": MagmaCore,
    "Radioactive Exclusion Zone": RadioactiveExclusionZone,
    "Salt Pits": SaltPits,
    "Sandblasted Corridors": SandblastedCorridors
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
            setFileNames(response);
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
            console.error('Error fetching JSON content:', error);
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
        // Sort on the start time
        setFilteredFileContents(fileContents.sort((a, b) => {
            if (a.type === "MissionData" && b.type === "MissionData") {
                return new Date(b.MissionInfo.StartDateTime).getTime() - new Date(a.MissionInfo.StartDateTime).getTime();
            } else {
                return 0;
            }
        }).filter((content) => {
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
            <input type="text" placeholder="Enter folder name" value={folderName} onChange={handleFolderNameChange} />
            <button onClick={fetchData}>Refresh</button>
            <section>
                {filteredFileContents.length > 0 && (
                    <section className='data-container' style={{ backgroundImage: `url('${DrgBg}'` }}>
                        <OverallStats contents={filteredFileContents} />
                    </section>
                )}
                {filteredFileContents.map((content, index) => {
                    if (content.type === 'MissionData') {
                        return (
                            <section key={index} className={`data-container ${content.MissionResult.WasSuccess ? 'success-border' : 'failure-border'}`} style={{ backgroundImage: `url('${biomeImages[content.MissionInfo.Biome]}'` }}>
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
            </section >
        </section >
    )
}

export default MissionList;