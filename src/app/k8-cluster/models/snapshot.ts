export interface Party {
    title: string;
    cost: string;
}

export interface Trend {
    title: string;
    cost: string;
    deltaCost: string;
    comment: string;
}
export interface Comparison {
    parties: Party[];
}

export class Snapshot {
    id: string;
    viewType: string;
    values: Trend|Comparison;
}