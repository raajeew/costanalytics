export interface TfSnapshot {
    title: string;
    cost: string;
    deltaCost: string;
    comment: string;
}

export interface TfGraphDataset {
    data: number[];
    label: string;
}

export interface TfGraph {
    lebel: string[];
    dataset: TfGraphDataset[];
}

export class TotalVsForecast {
    snapshot: TfSnapshot[];
    graph: TfGraph;
}
