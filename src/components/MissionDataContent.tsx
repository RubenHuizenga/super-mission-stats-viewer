import React from 'react';
import '../css/missionDataContent.css';
import { IMissionDataInterface } from '../interfaces/MissionData';
import { DivideCreaturesInCategories, formatTimeSpan, toTitleCase } from '../utils/Utils';
import MissionInfoNormal from './MissionInfoNormal';
import MissionInfoDeepDive from './MissionInfoDeepDive';
import SumBreakDownTable from './SumBreakDownTable';

interface IMissionDataContentProps {
    object: IMissionDataInterface
}

const MissionDataContent: React.FC<IMissionDataContentProps> = ({ object }) => {
    let totalCredits = 0;
    Object.entries(object.MissionResult.Credits).map(([_, value]: [string, string | number]) => {
        if (typeof value === 'number') totalCredits += value;
    });

    let totalXP = 0;
    Object.entries(object.MissionResult.XP).map(([_, value]: [string, string | number]) => {
        if (typeof value === 'number') totalXP += value;
    });

    let endscreenResources = 0;
    Object.entries(object.MissionResult.EndscreenResources).map(([_, value]: [string, string | number]) => {
        if (typeof value === 'number') endscreenResources += value;
    });

    let totalDamageDealt = 0;
    Object.entries(object.PlayerStats.DamageDealt).map(([_, value]: [string, string | number]) => {
        if (typeof value === 'number') totalDamageDealt += value;
    });

    let totalEnemiesKilled = 0;
    if (typeof object.PlayerStats.EnemiesKilled === "number") {
        totalEnemiesKilled = object.PlayerStats.EnemiesKilled;
    } else {
        Object.entries(object.PlayerStats.EnemiesKilled).map(([_, value]: [string, string | number]) => {
            if (typeof value === 'number') totalEnemiesKilled += value;
        });
    }

    return (
        <section className='content'>
            {
                object.MissionInfo.IsDeepdive
                    ? <MissionInfoDeepDive missionInfo={object.MissionInfo} />
                    : <MissionInfoNormal missionInfo={object.MissionInfo} />
            }

            <section className='mission-result'>
                <h2>Mission Result</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Mission time</td>
                            <td>{formatTimeSpan(object.MissionResult.MissionTime)}</td>
                        </tr>
                        <tr>
                            <td>Credits</td>
                            <td><SumBreakDownTable totalSum={totalCredits} array={Object.entries(object.MissionResult.Credits)} includePercentage={false} /></td>
                        </tr>
                        <tr>
                            <td>XP</td>
                            <td><SumBreakDownTable totalSum={totalXP} array={Object.entries(object.MissionResult.XP)} includePercentage={false} /></td>
                        </tr>
                        <tr>
                            <td>End screen resources</td>
                            <td><SumBreakDownTable totalSum={endscreenResources} array={Object.entries(object.MissionResult.EndscreenResources)} includePercentage={false} /></td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className='player-stats'>
                <h2>Player Stats</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Player</td>
                            <td>{object.PlayerStats.Name} {object.PlayerStats.Title ? `"${object.PlayerStats.Title}"` : ""} Rank {object.PlayerStats.PlayerRank}</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>{toTitleCase(object.PlayerStats.Hero)} (Promoted {object.PlayerStats.Promotions} times, Level {object.PlayerStats.HeroLevel})</td>
                        </tr>
                        <tr>
                            <td>Damage dealt</td>
                            <td><SumBreakDownTable totalSum={Math.trunc(totalDamageDealt)} array={Object.entries(object.PlayerStats.DamageDealt)} includePercentage={true} /></td>
                        </tr>
                        <tr>
                            <td>DPS</td>
                            <td>{object.PlayerStats.DPS?.toFixed(2) ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Most single hit damage</td>
                            <td>{object.PlayerStats.MostSingleHitDamage?.toFixed(2) ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Enemies killed</td>

                            <td>{
                                typeof object.PlayerStats.EnemiesKilled === "number"
                                    ? object.PlayerStats.EnemiesKilled
                                    : <SumBreakDownTable totalSum={totalEnemiesKilled} array={Object.entries(object.PlayerStats.EnemiesKilled)} includePercentage={true} />
                            }
                            </td>
                        </tr>
                        <tr>
                            <td>Damage Taken</td>
                            <td>{object.PlayerStats.DamageTaken?.toFixed(2) ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Flares thrown</td>
                            <td>{object.PlayerStats.FlaresThrown ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Jumps</td>
                            <td>{object.PlayerStats.Jumps ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Times looked at the map</td>
                            <td>{object.PlayerStats.LookedAtMap ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Times pinged</td>
                            <td>{object.PlayerStats.Pings ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Times Rock & Stoned</td>
                            <td>{object.PlayerStats.Salutes ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Times resupplied</td>
                            <td>{object.PlayerStats.TimesResupplied ?? "0"}</td>
                        </tr>
                        <tr>
                            <td>Times died</td>
                            <td>{object.PlayerStats.TotalDeaths ?? "0"} {object.PlayerStats.TotalTimeDown ? `(total time down ${formatTimeSpan(object.PlayerStats.TotalTimeDown / 1000)})` : ""}</td>
                        </tr>
                        <tr>
                            <td>Longest time alive</td>
                            <td>{formatTimeSpan(object.PlayerStats.LongestTimeAlive / 1000)}</td>
                        </tr>
                        <tr>
                            <td>Times revived other players</td>
                            <td>{object.PlayerStats.TotalRevives ?? "0"}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section >
    );
};

export default MissionDataContent;