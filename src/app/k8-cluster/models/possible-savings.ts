export interface PosSavItemData {
    title: string;
    cost: number;
    data: any[];
}

export interface PosSavItem {
    groupby: string;
    data: PosSavItemData[];
}
export class PossibleSavings {
    monthlySavings: number;
    data: PosSavItem[];
}
