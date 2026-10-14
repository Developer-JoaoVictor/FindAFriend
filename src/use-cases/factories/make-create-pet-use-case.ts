import { CreatePetsUseCase } from "../create-pet.js";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.js";

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetsRepository();
  const createPetUseCase = new CreatePetsUseCase(petRepository);

  return createPetUseCase;
}
