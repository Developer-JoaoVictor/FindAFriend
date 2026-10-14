import type { Pet, PetSize, PetType } from "../entities/pets.js";
import type { PetsRepository } from "../repositories/pets-repository.js";

interface CreatePetRequest {
  name: string;
  about: string;
  type: PetType;
  age: number;
  size: PetSize;
  energy_level: number;
  is_available: boolean;
  independence_level: number;
  environment: string;
  requirements: string[];
  organization_id: string;
}

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    type,
    age,
    size,
    energy_level,
    is_available,
    independence_level,
    environment,
    requirements,
    organization_id,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      type,
      age,
      size,
      energy_level,
      is_available,
      independence_level,
      environment,
      requirements,
      organization_id,
    });

    return { pet };
  }
}
