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