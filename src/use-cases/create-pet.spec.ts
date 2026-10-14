import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pet-repository.js";
import { CreatePetsUseCase } from "./create-pet.js";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetsUseCase;

describe("Create Pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetsUseCase(petsRepository);
  });

  it("should be able to create pet with organization relationship", async () => {
    const organizationId = randomUUID();

    const { pet } = await sut.execute({
      name: "doguinho",
      about: "pet de teste",
      age: 2,
      energy_level: 4,
      environment: "Nenhum",
      independence_level: 5,
      is_available: true,
      organization_id: organizationId,
      requirements: ["come pouco", "espaço grande"],
      size: "MEDIUM",
      type: "DOG",
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("doguinho");
    expect(pet.type).toEqual("DOG");
    expect(pet.organization_id).toEqual(organizationId);
    expect(petsRepository.items).toHaveLength(1);
  });
});
