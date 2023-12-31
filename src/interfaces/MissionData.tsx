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
    MissionType: string;
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
    MissionType: string;
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
    DamageDealt: { [key: string]: number }
    EnemiesKilled: { [key: string]: number } | number;
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
    DamageTaken: number;
    DamageSources: { [key: string]: number };
}

export interface IMissionResult {
    MissionTime: number;
    Credits: { [key: string]: number };
    WasSuccess: boolean
    XP: { [key: string]: number };
    EndscreenResources: { [key: string]: number };
}

export interface IMissionDataInterface {
    type: "MissionData";
    MissionInfo: IMissionInfoNormal | IMissionInfoDeepDive;
    PlayerStats: IPlayerStats;
    MissionResult: IMissionResult;
}