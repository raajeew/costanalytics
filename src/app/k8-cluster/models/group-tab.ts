export interface Priority1 {
    id: string;
    title: string;
    count: number;
}

export interface Priority2 {
    id: string;
    title: string;
    count: number;
}

export interface Priority3 {
    id: string;
    title: string;
    count: number;
}

export class GroupTab {
    priority1: Priority1[];
    priority2: Priority2[];
    priority3: Priority3[];
}
