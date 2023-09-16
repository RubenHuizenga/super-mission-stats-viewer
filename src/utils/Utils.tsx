import { families } from "./familiesList";

export function formatTimeSpan(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = minutes > 0 ? `${minutes}m` : '';
    const secondsText = remainingSeconds > 0 ? `${Math.trunc(remainingSeconds)}s` : '';

    return `${hoursText} ${minutesText} ${secondsText}`.trim();
}

export function toTitleCase(input: string): string {
    return input.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
}

export function DivideCreaturesInCategories(list: { [key: string]: number }): { [key: string]: { [key: string]: number } } {
    let result: { [key: string]: { [key: string]: number } } = {};

    for (const enemy in list) {
        let found = false;
        for (const family in families) {
            if (found) break;
            for (const member in families[family]) {
                if (families[family][member] === enemy) {
                    if (!result[family]) result[family] = {};
                    result[family][enemy] = list[enemy]
                    found = true;
                    break;
                }
            }
        }

        if (found) continue;
        if (!result["Other"]) result["Other"] = {};
        result["Other"][enemy] = list[enemy]
    }

    return result;
}