export interface IUnknownObject {
    [key: string]: number | string;
}

export interface IJSONError {
    type: "JSONError";
    error: string;
}

export interface IMissionInfoNormal {
    Seed: number;
    GlobalSeed: number;
    Biome: string;
    Name: string;
    Complexity: number;
    Duration: number;
    Mutator: string;
    DNA: string;
    Structure: string;
    Primary: string;
    Warnings: [string]
    Secondaries: [string]
    Hazard: string;
    StartDateTime: string;
    IsDeepdive: false;
}

export interface IMissionInfoDeepDiveStage {
    Seed: number;
    Complexity: number;
    Duration: number;
    Mutator: string;
    DNA: string;
    Structure: string;
    Primary: string;
    Warnings: [string]
    Secondaries: [string]
    Hazard: number;
}

export interface IMissionInfoDeepDive {
    "0": IMissionInfoDeepDiveStage;
    "1"?: IMissionInfoDeepDiveStage;
    "2"?: IMissionInfoDeepDiveStage;
    GlobalSeed: number;
    Biome: string;
    Name: string;
    StartDateTime: string;
    IsElite: boolean;
    IsDeepdive: true;
}

export interface IPlayerStats {
    IsHost: boolean
    Name: string;
    Hero: string;
    PlayerRank: number;
    HeroLevel: number;
    Promotions: number;
    TotalDeaths: number;
    TotalRevives: number;
    TotalTimeDown: number;
    DamageDealt: IUnknownObject
    EnemiesKilled: IUnknownObject | number;
    FlaresThrown: number;
    Jumps: number;
    Pings: number;
    LookedAtMap: number;
    Salutes: number;

    TimesResupplied: number;
    LongestTimeAlive: number
    MostSingleHitDamage: number;
    DPS: number;
    Title: string;
}

export interface IMissionResult {
    MissionTime: number;
    Credits: IUnknownObject;
    WasSuccess: boolean
    XP: IUnknownObject;
    EndscreenResources: IUnknownObject;
}

export interface IMissionDataInterface {
    type: "MissionData";
    MissionInfo: IMissionInfoNormal | IMissionInfoDeepDive;
    PlayerStats: IPlayerStats;
    MissionResult: IMissionResult;
}