export interface UnknownObject {
    [key: string]: number | string;
}

export interface JSONError {
    type: "JSONError";
    error: string;
}

export interface MissionDataInterface {
    type: "MissionData";
    MissionInfo: {
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
        Hazard: number;
        StartDateTime: string;
    };
    PlayerStats: {
        IsHost: boolean
        Name: string;
        Hero: string;
        PlayerRank: number;
        HeroLevel: number;
        Promotions: number;
        TotalDeaths: number;
        TotalRevives: number;
        TotalTimeDown: number;
        DamageDealt: UnknownObject
        EnemiesKilled: UnknownObject | number;
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
    };
    MissionResult: {
        MissionTime: number;
        Credits: UnknownObject;
        WasSuccess: boolean
        XP: UnknownObject;
        EndscreenResources: UnknownObject;
    };
}