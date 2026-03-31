import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DinosaurInput {
    era: string;
    period: string;
    diet: string;
    name: string;
    description: string;
    length: string;
    interestingFact: string;
}
export interface Dinosaur {
    id: bigint;
    era: string;
    period: string;
    diet: string;
    name: string;
    description: string;
    length: string;
    interestingFact: string;
}
export interface backendInterface {
    addDinosaur(input: DinosaurInput): Promise<void>;
    getAllDinosaurs(): Promise<Array<Dinosaur>>;
    getDinosaurById(id: bigint): Promise<Dinosaur>;
    getDinosaursByEra(era: string): Promise<Array<Dinosaur>>;
    getQuickFunFacts(): Promise<Array<string>>;
}
