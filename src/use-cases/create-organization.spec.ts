import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization.js";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists.js";
import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository.js";
import { compare } from "bcryptjs";

let organizationRepository: InMemoryOrganizationRepository;
let sut: CreateOrganizationUseCase;

describe("Create Organization Use Case", () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationUseCase(organizationRepository);
  });

  it("should be able to create organization", async () => {
    const { organization } = await sut.execute({
      name: "Pets Loves",
      responsibleName: "Jonh Doe",
      email: "johndoe@email.com",
      password: "123456",
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to register an organization with the same email twice", async () => {
    const email = "johndoe@email.com";

    await sut.execute({
      name: "Pets Loves",
      responsibleName: "Jonh Doe",
      email,
      password: "123456",
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    });

    await expect(
      sut.execute({
        name: "Pets Loves",
        responsibleName: "Jonh Doe",
        email,
        password: "123456",
        cep: "00000000",
        address: "Rua teste",
        city: "São Paulo",
        whatsapp: "11111111111",
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });

  it("should hash organization password upon registration", async () => {
    const { organization } = await sut.execute({
      name: "Pets Loves",
      responsibleName: "Jonh Doe",
      email: "johndoe@email.com",
      password: "123456",
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      organization.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
