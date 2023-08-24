import React from 'react';
import '../css/missionDataHeader.css';
import { IMissionDataInterface } from '../interfaces/MissionData';

interface IMissionDataHeaderProps {
    object: IMissionDataInterface
}

const MissionDataHeader: React.FC<IMissionDataHeaderProps> = ({ object }) => {
    return (
        <section className={`header ${object.MissionResult.WasSuccess ? 'success' : 'failure'}`}>
            <h1 className='title'>{object.MissionInfo.Name}</h1>
            <section className='mission-info'>
                <h3>
                    {object.MissionInfo.Biome}
                    {object.MissionInfo.IsDeepdive
                        ? `${object.MissionInfo.IsElite ? " - Elite " : " - "}Deep Dive`
                        : ` - ${object.MissionInfo.Hazard} `}
                    {object.MissionResult.WasSuccess ? " - Success" : " - Failure"}
                    {object.PlayerStats.IsHost ? " - Host" : " - Client"}
                </h3>
                {!object.MissionInfo.IsDeepdive && <h3>Mission Type: {object.MissionInfo.MissionType}</h3>}
                <h5>Started on {object.MissionInfo.StartDateTime}</h5>
            </section>
        </section >
    );
};

export default MissionDataHeader;