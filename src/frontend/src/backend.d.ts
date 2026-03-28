import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Animal {
    id: bigint;
    name: string;
    shortFact: string;
    category: string;
    conservationStatus: string;
    facts: Array<string>;
}
export interface backendInterface {
    getAllAnimals(): Promise<Array<Animal>>;
    getAnimal(id: bigint): Promise<Animal>;
    getAnimalsByCategory(category: string): Promise<Array<Animal>>;
    getCategories(): Promise<Array<string>>;
}
