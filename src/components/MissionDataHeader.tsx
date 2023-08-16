import React from 'react';
import '../css/missionDataHeader.css';
import { MissionDataInterface } from '../interfaces/MissionData';

interface MissionDataHeaderProps {
    object: MissionDataInterface
}

const MissionDataHeader: React.FC<MissionDataHeaderProps> = ({ object }) => {
    return (
        <section className={`header ${object.MissionResult.WasSuccess ? 'success' : 'failure'}`}>
            <h1 className='title'>{object.MissionInfo.Name}</h1>
            <section className='mission-info'>
                <h3>{object.MissionInfo.Biome} - Hazard {object.MissionInfo.Hazard} - {object.MissionResult.WasSuccess ? "Success" : "Failure"} - {object.PlayerStats.IsHost ? "Host" : "Client"}</h3>
                <h3>Main Objective: {object.MissionInfo.Primary}</h3>
                <h5>Started on {object.MissionInfo.StartDateTime}</h5>
            </section>
        </section >
    );
};

export default MissionDataHeader;