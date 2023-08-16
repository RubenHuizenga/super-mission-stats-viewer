import React from 'react';
import '../css/missionDataContent.css';
import { MissionDataInterface } from '../interfaces/MissionData';
import Expandable from './Expandable';
import { formatTimeSpan, toTitleCase } from '../utils/formatting';

interface MissionDataContentProps {
    object: MissionDataInterface
}

const MissionDataContent: React.FC<MissionDataContentProps> = ({ object }) => {
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
            <section className='mission-info'>
                <h2>Mission Info</h2>
                <table className='mission-info-table'>
                    <tr>
                        <td>Secondary Objectives</td>
                        <td>
                            {Object.entries(object.MissionInfo.Secondaries).map(([_, value]) => (
                                <span>{value}</span>
                            ))}
                        </td>
                    </tr>
                    {object.MissionInfo.Mutator !== "" && (
                        <tr>
                            <td>Mutator</td>
                            <td>{object.MissionInfo.Mutator}</td>
                        </tr>
                    )}
                    <tr>
                        <td>DNA</td>
                        <td>{object.MissionInfo.DNA}</td>
                    </tr>
                    <tr>
                        <td>Global seed</td>
                        <td>{object.MissionInfo.GlobalSeed}</td>
                    </tr>
                    <tr>
                        <td>Seed</td>
                        <td>{object.MissionInfo.Seed}</td>
                    </tr>

                </table>
            </section>
            <section className='mission-result'>
                <h2>Mission Result</h2>
                <table>
                    <tr>
                        <td>Mission time</td>
                        <td>{formatTimeSpan(object.MissionResult.MissionTime)}</td>
                    </tr>
                    <tr>
                        <td>Credits</td>
                        <td>
                            <table className='sum-breakdown-table'>
                                <Expandable
                                    header={
                                        <tr className='sum-breakdown-table-total clickable'>
                                            <td>Total</td>
                                            <td>{totalCredits}</td>
                                        </tr>
                                    }

                                    content={
                                        Object.entries(object.MissionResult.Credits).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                />
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>XP</td>
                        <td>
                            <table className='sum-breakdown-table'>
                                <Expandable
                                    header={
                                        <tr className='sum-breakdown-table-total clickable'>
                                            <td>Total</td>
                                            <td>{totalXP}</td>
                                        </tr>
                                    }

                                    content={
                                        Object.entries(object.MissionResult.XP).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                />
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>End screen resources</td>
                        <td>
                            <table className='sum-breakdown-table'>
                                <Expandable
                                    header={
                                        <tr className='sum-breakdown-table-total clickable'>
                                            <td>Total</td>
                                            <td>{endscreenResources}</td>
                                        </tr>
                                    }

                                    content={
                                        Object.entries(object.MissionResult.EndscreenResources).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                />
                            </table>
                        </td>
                    </tr>
                </table>
            </section>
            <section>
                <h2>Player Stats</h2>
                <table>
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
                        <td>
                            <table className='sum-breakdown-table'>
                                <Expandable
                                    header={
                                        <tr className='sum-breakdown-table-total clickable'>
                                            <td>Total</td>
                                            <td>{Math.trunc(totalDamageDealt)}</td>
                                        </tr>
                                    }

                                    content={
                                        Object.entries(object.PlayerStats.DamageDealt).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{Math.trunc(Number(value))}</td>
                                                    <td className='percentage'>({((Number(value) / totalDamageDealt * 100).toFixed(2))}%)</td>
                                                </tr>
                                            );
                                        })
                                    }
                                />
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>DPS</td>
                        <td>{object.PlayerStats.DPS.toFixed(2) ?? "0"}</td>
                    </tr>
                    <tr>
                        <td>Most single hit damage</td>
                        <td>{object.PlayerStats.MostSingleHitDamage.toFixed(2) ?? "0"}</td>
                    </tr>
                    <tr>
                        <td>Enemies killed</td>
                        <td>
                            {typeof object.PlayerStats.EnemiesKilled === "number" ? object.PlayerStats.EnemiesKilled :
                                <table className='sum-breakdown-table'>
                                    <Expandable
                                        header={
                                            <tr className='sum-breakdown-table-total clickable'>
                                                <td>Total</td>
                                                <td>{totalEnemiesKilled}</td>
                                            </tr>
                                        }

                                        content={Object.entries(object.PlayerStats.EnemiesKilled).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                    <td className='percentage'>({(Number(value) / totalDamageDealt * 100).toFixed(2)}%)</td>
                                                </tr>
                                            );
                                        })
                                        }
                                    />
                                </table>

                            }
                        </td>
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
                </table>
            </section>
        </section>
    );
};

export default MissionDataContent;