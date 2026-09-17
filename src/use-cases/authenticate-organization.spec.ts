import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization.js";
import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository.js";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";

let organizationRepository: InMemoryOrganizationRepository;
let sut: AuthenticateOrganizationUseCase;

describe("Authenticate Organization Use Case", () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new AuthenticateOrganizationUseCase(organizationRepository);
  });

  it("should be able to authenticate an organization", async () => {
    await organizationRepository.create({
      name: "Pets Loves",
      responsible_name: "Jonh Doe",
      email: "johndoe@email.com",
      password_hash: await hash("123456", 6),
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    });

    const { organization } = await sut.execute({
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
    expect(organization.email).toEqual("johndoe@email.com");
  });

  it("should not be able to authenticate with a non-existing email", async () => {
    await expect(
      sut.execute({ email: "invalid@email.com", password: "123456" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with a wrong password", async () => {
    await organizationRepository.create({
      name: "Pets Loves",
      responsible_name: "Jonh Doe",
      email: "johndoe@email.com",
      password_hash: await hash("123456", 6),
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    });

    await expect(
      sut.execute({ email: "johndoe@email.com", password: "111111" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
