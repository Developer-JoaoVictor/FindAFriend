import { prisma } from "../../lib/prisma.js";
import type { CreatePetData, PetsRepository } from "../pets-repository.js";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetData) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
