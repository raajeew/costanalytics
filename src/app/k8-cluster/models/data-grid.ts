export interface DataGridRow {
  clusterId: string;
  memCost: number;
  cpuCost: number;
  networkCost: number;
  storageCost: number;
  gpuCost: number;
  otherCost: number;
  totalCost: number;
  possibleSavings: number;
  trend: number;
}

export interface DataGridColumn {
  title: string;
  key: string;
  visible: boolean;
}

export class DataGrid {
  columns: DataGridColumn[];
  rows: DataGridRow[];
}
