export interface Duration {
  start: string;
  end: string;
}

export interface Filter {
  keyId: string;
  ValuId: string;
}
export class Query {
  primaryGroup: string;
  duration: Duration;
  filter: Filter[];
  subGroup: string[];
  metric: string[];
  granularity: string;
}
