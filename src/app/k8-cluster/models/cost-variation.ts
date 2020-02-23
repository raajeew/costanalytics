export interface CostVariationItem {
    title: string;
    cost: number;
    lastMonthCost: number;
    budgetedCost: number;
    variation: number;
}
export class CostVariation {
    groupby: string;
    data: CostVariationItem[];
}
