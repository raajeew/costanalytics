export interface CostItem {
    title: string;
    cost: number;
    variation?: number;
    data: CostItem[];
}

export interface CostGroup {
    groupby: string;
    data: CostItem[];
}

export class Cost {
    monthlySavings: number;
    data: CostGroup[];
}
