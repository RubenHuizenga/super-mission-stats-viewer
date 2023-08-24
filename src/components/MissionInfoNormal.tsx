import React from 'react';
import '../css/missionDataContent.css';
import { IMissionInfoNormal } from '../interfaces/MissionData';

interface IMissionInfoNormalProps {
    missionInfo: IMissionInfoNormal
}

const MissionInfoNormal: React.FC<IMissionInfoNormalProps> = ({ missionInfo }) => {
    return (!missionInfo.IsDeepdive &&
        <section className='mission-info'>
            <h2>Mission Info</h2>
            <table className='mission-info-table'>
                <tbody>
                    <tr>
                        <td>Primary Objective</td>
                        <td>{missionInfo.Primary}</td>
                    </tr>
                    <tr>
                        <td>Secondary Objectives</td>
                        <td>
                            {Object.entries(missionInfo.Secondaries).map(([key, value]) => (
                                <React.Fragment>
                                    <span key={key}>{value}</span><br />
                                </React.Fragment>
                            ))}
                        </td>
                    </tr>
                    {missionInfo.Mutator !== "" && (
                        <tr>
                            <td>Mutator</td>
                            <td>{missionInfo.Mutator}</td>
                        </tr>
                    )}
                    {missionInfo.Warnings.length > 0 && (
                        <tr>
                            <td>Warnings</td>
                            <td>
                                {Object.entries(missionInfo.Warnings).map(([key, value]) => (
                                    <React.Fragment>
                                        <span key={key}>{value}</span><br />
                                    </React.Fragment>
                                ))}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>DNA</td>
                        <td>{missionInfo.DNA}</td>
                    </tr>
                    <tr>
                        <td>Global seed</td>
                        <td>{missionInfo.GlobalSeed}</td>
                    </tr>
                    <tr>
                        <td>Seed</td>
                        <td>{missionInfo.Seed}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default MissionInfoNormal;