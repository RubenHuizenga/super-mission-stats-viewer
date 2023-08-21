import React from 'react';
import '../css/missionDataContent.css';
import { IMissionInfoDeepDive, IMissionInfoDeepDiveStage } from '../interfaces/MissionData';
import Expandable from './Expandable';
import ExpandableTable from './ExpandableTable';

interface IMissionInfoDeepDiveProps {
    missionInfo: IMissionInfoDeepDive
}

const MissionInfoDeepDive: React.FC<IMissionInfoDeepDiveProps> = ({ missionInfo }) => {
    const deepDiveStages: (keyof IMissionInfoDeepDive)[] = ["0", "1", "2"];

    return (missionInfo.IsDeepdive &&
        <section className='mission-info'>
            <h2>Mission Info</h2>
            <table className='mission-info-table'>
                <tbody>
                    <tr>
                        <td>Global seed</td>
                        <td>{missionInfo.GlobalSeed}</td>
                    </tr>
                    {deepDiveStages.map((key, _) => {
                        if (key in missionInfo) {
                            const stageInfo = missionInfo[key] as IMissionInfoDeepDiveStage;
                            return (
                                <React.Fragment key={key}>
                                    <tr>
                                        <td>Stage {Number(key) + 1}</td>
                                        <td>
                                            <ExpandableTable
                                                header={
                                                    <tr className='clickable'>
                                                        <td>Details</td>
                                                    </tr>
                                                }

                                                content={
                                                    <React.Fragment>
                                                        <tr>
                                                            <td>Secondary Objectives</td>
                                                            <td>
                                                                {Object.entries(stageInfo.Secondaries).map(([_, value]) => (
                                                                    <span key={value}>{value}</span>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        {
                                                            stageInfo.Mutator !== "" && (
                                                                <tr>
                                                                    <td>Mutator</td>
                                                                    <td>{stageInfo.Mutator}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        <tr>
                                                            <td>DNA</td>
                                                            <td>{stageInfo.DNA}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Seed</td>
                                                            <td>{stageInfo.Seed}</td>
                                                        </tr>
                                                    </React.Fragment>}
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default MissionInfoDeepDive;