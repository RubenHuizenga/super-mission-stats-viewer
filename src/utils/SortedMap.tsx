export class SortedStringNumberMap {
    private entries: [string, number][] = [];

    constructor(initialEntries: [string, number][] = []) {
        this.entries = initialEntries.slice().sort((a, b) => Number(b[1]) - Number(a[1]));
    }

    set(key: string, value: number): void {
        const existingIndex = this.entries.findIndex(([existingKey]) => existingKey === key);
        if (existingIndex !== -1) {
            this.entries[existingIndex][1] = value;
        } else {
            this.entries.push([key, value]);
        }

        this.entries.sort((a, b) => Number(b[1]) - Number(a[1]));
    }

    increment(key: string, value: number = 1): void {
        if (this.get(key)) {
            this.set(key, this.get(key)! + value);
        } else {
            this.set(key, value);
        }
    }

    get(key: string): number | undefined {
        const entry = this.entries.find(([existingKey]) => existingKey === key);
        return entry ? entry[1] : undefined;
    }

    getIndex(index: number): [string, number] | undefined {
        return this.entries[index];
    }

    getFromIndex(index: number): [string, number][] {
        return this.entries.slice(index);
    }

    getAll(): [string, number][] {
        return this.entries;
    }

    getTotal(): number {
        let total = 0;
        this.entries.forEach(value => total += value[1]);
        return total;
    }
}