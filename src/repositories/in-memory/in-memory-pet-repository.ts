import { randomUUID } from "node:crypto";
import type { Pet } from "../../entities/pets.js";
import type { CreatePetData, PetsRepository } from "../pets-repository.js";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: CreatePetData) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      type: data.type,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      is_available: data.is_available,
      independence_level: data.independence_level,
      environment: data.environment,
      requirements: data.requirements,
      organization_id: data.organization_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
