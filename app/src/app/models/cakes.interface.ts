export interface Cakes {
    id: string;
    name: string;
    price: number;
    parts: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CakesResponse {
    cakes: Cakes[];
}