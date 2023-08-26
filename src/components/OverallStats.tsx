import React from 'react';
import '../css/overallStats.css';
import { IJSONError, IMissionDataInterface, IMissionInfoDeepDive, IMissionInfoDeepDiveStage } from '../interfaces/MissionData';
import Expandable from './Expandable';
import { formatTimeSpan, toTitleCase } from '../utils/formatting';
import { SortedStringNumberMap } from '../utils/SortedMap';
import ExpandableTable from './ExpandableTable';

interface IOverallStatsProps {
    contents: (IMissionDataInterface | IJSONError)[]
}

function getExpandableBreakdownTableForMap(map: SortedStringNumberMap, total: number, prefixHeader: string = "", prefixContent: string = ""): JSX.Element {
    return (
        <ExpandableTable
            header={
                <tr className='clickable'>
                    <td>{prefixHeader} {map.getIndex(0)![0]}</td>
                    <td>{map.getIndex(0)![1]}</td>
                    <td className='percentage'>({(map.getIndex(0)![1] / total * 100).toFixed(2)}%)</td>
                </tr>
            }

            content={
                map.getFromIndex(1).map(([key, value]: [string, number]) => {
                    return (
                        <tr key={key}>
                            <td>{prefixContent} {key}</td>
                            <td>{value}</td>
                            <td className='percentage'>({(value / total * 100).toFixed(2)}%)</td>
                        </tr>
                    );
                })
            }
        />
    )
}

function getExpandableBreakdownTableForMapWithTotal(map: SortedStringNumberMap, total: number, totalMissions: number, prefixContent: string = ""): JSX.Element {
    return (
        <ExpandableTable
            header={
                <tr className='sum-breakdown-table-total clickable'>
                    <td>Total</td>
                    <td>{Math.trunc(total)}</td>
                    <td></td>
                    <td>{(total / totalMissions).toFixed(2)} per mission</td>
                </tr>
            }

            content={
                map.getAll().map(([key, value]: [string, number]) => {
                    return (
                        <tr key={key}>
                            <td>{prefixContent} {key}</td>
                            <td>{Math.trunc(value)}</td>
                            <td className='percentage'>({(value / total * 100).toFixed(2)}%)</td>
                            <td>{(value / totalMissions).toFixed(2)} per mission</td>
                        </tr>
                    );
                })
            }
        />
    )
}

const OverallStats: React.FC<IOverallStatsProps> = ({ contents }) => {
    let totalMissions = 0;
    let totalGames = 0;
    let winRate = 0;
    let totalMissionTime = 0;
    let regions = new SortedStringNumberMap();
    let mainObjectives = new SortedStringNumberMap();
    let secondaryObjectives = new SortedStringNumberMap();
    let hazardLevels = new SortedStringNumberMap();
    let credits = new SortedStringNumberMap();
    let xp = new SortedStringNumberMap();
    let endscreenResources = new SortedStringNumberMap();
    let heros = new SortedStringNumberMap();
    let titles = new SortedStringNumberMap();
    let damageDealt = new SortedStringNumberMap();
    let enemiesKilled = new SortedStringNumberMap();
    let totalEnemiesKilledClient = 0;
    let DPS = 0;
    let MostSingleHitDamage = 0;
    let FlaresThrown = 0;
    let LookedAtMap = 0;
    let Jumps = 0;
    let Salutes = 0;
    let Pings = 0;
    let TotalRevives = 0;
    let TotalDeaths = 0;
    let TotalTimeDown = 0;
    let TimesResupplied = 0;
    let LongestTimeAlive = 0;
    let totalGamesHost = 0;
    let totalGamesClient = 0;
    let totalDeepDives = 0;
    let totalEliteDeepDives = 0;
    let deepDivesWon = 0;
    let eliteDeepDivesWon = 0;
    let damageTaken = 0;

    contents.map((content) => {
        if (content.type === "MissionData") {
            // Mission Data
            if (content.MissionInfo.IsDeepdive) {
                content.MissionInfo.IsElite ? totalEliteDeepDives++ : totalDeepDives++;
                if (content.MissionResult.WasSuccess) content.MissionInfo.IsElite ? eliteDeepDivesWon++ : deepDivesWon++;

                const deepDiveStages: (keyof IMissionInfoDeepDive)[] = ["0", "1", "2"];

                for (const s of deepDiveStages) {
                    if (s in content.MissionInfo) {
                        totalMissions++;
                        winRate++;
                        const missionInfo = content.MissionInfo[s] as IMissionInfoDeepDiveStage;
                        mainObjectives.increment(missionInfo.Primary);
                        missionInfo.Secondaries.forEach((value) => secondaryObjectives.increment(value));
                        hazardLevels.increment(missionInfo.Hazard.toString());
                    }
                }

                if (!content.MissionResult.WasSuccess) winRate--;
            } else {
                totalMissions++;
                winRate += content.MissionResult.WasSuccess ? 1 : 0;
                mainObjectives.increment(content.MissionInfo.Primary);
                content.MissionInfo.Secondaries.forEach((value) => secondaryObjectives.increment(value));
                hazardLevels.increment(content.MissionInfo.Hazard.toString());
            }

            totalGames++;
            regions.increment(content.MissionInfo.Biome);

            // Mission Result
            totalMissionTime += content.MissionResult.MissionTime;
            Object.entries(content.MissionResult.Credits).forEach(([key, value]: [string, string | number]) => { credits.increment(key.replace(/^.*[Xx]/g, ""), Number(value)); });
            Object.entries(content.MissionResult.XP).forEach(([key, value]: [string, string | number]) => { xp.increment(key.replace(/^.*[Xx]/g, ""), Number(value)); });
            Object.entries(content.MissionResult.EndscreenResources).forEach(([key, value]: [string, string | number]) => { endscreenResources.increment(key, Number(value)); });

            // Player Stats
            heros.increment(toTitleCase(content.PlayerStats.Hero));
            titles.increment(content.PlayerStats.Title ?? "None");
            Object.entries(content.PlayerStats.DamageDealt).forEach(([key, value]: [string, string | number]) => { damageDealt.increment(key, Number(value)); });
            if (typeof content.PlayerStats.EnemiesKilled === "number") totalEnemiesKilledClient += content.PlayerStats.EnemiesKilled;
            else Object.entries(content.PlayerStats.EnemiesKilled).forEach(([key, value]: [string, string | number]) => { enemiesKilled.increment(key, Number(value)); });
            DPS += content.PlayerStats.DPS ?? 0;
            if (content.PlayerStats.MostSingleHitDamage > MostSingleHitDamage) MostSingleHitDamage = content.PlayerStats.MostSingleHitDamage;
            FlaresThrown += content.PlayerStats.FlaresThrown ?? 0;
            LookedAtMap += content.PlayerStats.LookedAtMap ?? 0;
            Salutes += content.PlayerStats.Salutes ?? 0;
            Jumps += content.PlayerStats.Jumps ?? 0;
            Pings += content.PlayerStats.Pings ?? 0;
            TotalRevives += content.PlayerStats.TotalRevives ?? 0;
            TotalDeaths += content.PlayerStats.TotalDeaths ?? 0;
            TotalTimeDown += content.PlayerStats.TotalTimeDown ?? 0;
            TimesResupplied += content.PlayerStats.TimesResupplied ?? 0;
            if (content.PlayerStats.LongestTimeAlive > LongestTimeAlive) LongestTimeAlive = content.PlayerStats.LongestTimeAlive;
            content.PlayerStats.IsHost ? totalGamesHost++ : totalGamesClient++;
            damageTaken += content.PlayerStats.DamageTaken ?? 0;
        }
    })

    enemiesKilled.set("Client Kills (unknown)", totalEnemiesKilledClient);

    return (
        <section className='overall-stats'>
            <Expandable
                header={
                    <section className='header'>
                        <h1 className='title'>Overall Mission Stats</h1>
                        <h3>Win rate: {(winRate / totalMissions * 100).toFixed(2)}% ({winRate} / {totalMissions})</h3>
                        <h3>Average mission time: {formatTimeSpan(totalMissionTime / totalMissions)} (total {formatTimeSpan(totalMissionTime)})</h3>
                    </section >
                }
                content={
                    <section className='content'>
                        <section className='mission-info'>
                            <h2>Mission Info</h2>
                            <table className='mission-info-table'>
                                <tbody>
                                    <tr>
                                        <td>Biomes</td>
                                        <td>{getExpandableBreakdownTableForMap(regions, totalGames)}</td>
                                    </tr>
                                    <tr>
                                        <td>Main Objectives</td>
                                        <td>{getExpandableBreakdownTableForMap(mainObjectives, totalMissions)}</td>
                                    </tr>
                                    <tr>
                                        <td>Secondary Objectives</td>
                                        <td>{getExpandableBreakdownTableForMap(secondaryObjectives, secondaryObjectives.getTotal())}</td>
                                    </tr>
                                    <tr>
                                        <td>Hazard Levels</td>
                                        <td>{getExpandableBreakdownTableForMap(hazardLevels, totalMissions)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className='mission-result'>
                            <h2>Mission Result</h2>
                            <table className='mission-info-table'>
                                <tbody>
                                    <tr>
                                        <td>Credits</td>
                                        <td>{getExpandableBreakdownTableForMapWithTotal(credits, credits.getTotal(), totalMissions)}</td>
                                    </tr>
                                    <tr>
                                        <td>XP</td>
                                        <td>{getExpandableBreakdownTableForMapWithTotal(xp, xp.getTotal(), totalMissions)}</td>
                                    </tr>
                                    <tr>
                                        <td>End screen resources</td>
                                        <td>{getExpandableBreakdownTableForMapWithTotal(endscreenResources, endscreenResources.getTotal(), totalMissions)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section>
                            <h2>Deep Dives</h2>
                            <table className='mission-info-table'>
                                <tbody>
                                    <tr>
                                        <td>Deep Dive Win Rate</td>
                                        <td>
                                            {totalDeepDives > 0
                                                ? `${(deepDivesWon / totalDeepDives * 100).toFixed(2)}% (${deepDivesWon} / ${totalDeepDives})`
                                                : "N.A."
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Elite Deep Dive Win Rate</td>
                                        <td>
                                            {totalEliteDeepDives > 0
                                                ? `${(eliteDeepDivesWon / totalEliteDeepDives * 100).toFixed(2)}% (${eliteDeepDivesWon} / ${totalEliteDeepDives})}`
                                                : "N.A."
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className='player-stats'>
                            <h2>Player Stats</h2>
                            <table className='player-stats-table'>
                                <tbody>
                                    <tr>
                                        <td>Games hosted</td>
                                        <td>{totalGamesHost} (client {totalGamesClient} times)</td>
                                    </tr>
                                    <tr>
                                        <td>Classes</td>
                                        <td>{getExpandableBreakdownTableForMap(heros, totalGames)}</td>
                                    </tr>
                                    <tr>
                                        <td>Titles</td>
                                        <td>{getExpandableBreakdownTableForMap(titles, totalGames)}</td>
                                    </tr>
                                    <tr>
                                        <td>Damage Dealt</td>
                                        <td>{getExpandableBreakdownTableForMapWithTotal(damageDealt, damageDealt.getTotal(), totalMissions)}</td>
                                    </tr>
                                    <tr>
                                        <td>DPS</td>
                                        <td>{(DPS / totalMissions).toFixed(2) ?? "0"}</td>
                                    </tr>
                                    <tr>
                                        <td>Most single hit damage</td>
                                        <td>{MostSingleHitDamage.toFixed(2) ?? "0"}</td>
                                    </tr>
                                    <tr>
                                        <td>Enemies Killed</td>
                                        <td>{getExpandableBreakdownTableForMapWithTotal(enemiesKilled, enemiesKilled.getTotal(), totalMissions)}</td>
                                    </tr>
                                    <tr>
                                        <td>Damage Taken</td>
                                        <td>{damageTaken.toFixed(2) ?? "0"} ({(damageTaken / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Flares thrown</td>
                                        <td>{FlaresThrown ?? "0"} ({(FlaresThrown / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Jumps</td>
                                        <td>{Jumps ?? "0"} ({(Jumps / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Times looked at the map</td>
                                        <td>{LookedAtMap ?? "0"} ({(LookedAtMap / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Times pinged</td>
                                        <td>{Pings ?? "0"} ({(Pings / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Times Rock & Stoned</td>
                                        <td>{Salutes ?? "0"} ({(Salutes / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Times resupplied</td>
                                        <td>{TimesResupplied ?? "0"} ({(TimesResupplied / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Times died</td>
                                        <td>{TotalDeaths ?? "0"} ({(TotalDeaths / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Total time down</td>
                                        <td>{TotalTimeDown ? formatTimeSpan(TotalTimeDown / 1000) : ""} ({formatTimeSpan(TotalTimeDown / totalMissions / 1000)} per mission)</td>
                                    </tr>
                                    <tr>
                                        <td>Longest time alive</td>
                                        <td>{formatTimeSpan(LongestTimeAlive / 1000)}</td>
                                    </tr>
                                    <tr>
                                        <td>Times revived other players</td>
                                        <td>{TotalRevives ?? "0"} ({(TotalRevives / totalMissions).toFixed(2)} per mission)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </section>
                }
            />
        </section>
    );
};

export default OverallStats;