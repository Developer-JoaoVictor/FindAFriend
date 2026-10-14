import type { Pet, PetSize, PetType } from "../entities/pets.js";

export interface CreatePetData {
  name: string;
  about: string;
  age: number;
  size: PetSize;
  energy_level: number;
  type: PetType;
  is_available: boolean;
  independence_level: number;
  environment: string;
  requirements: string[];
  organization_id: string;
}

export interface PetsRepository {
  create(data: CreatePetData): Promise<Pet>;
}
