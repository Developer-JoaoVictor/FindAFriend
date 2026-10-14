import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "../../../src/app.js";
import { prisma } from "../../../src/lib/prisma.js";

describe("Create pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should not be able to create a pet without authentication", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/pets",
      payload: {
        name: "Rex",
        about: "Friendly dog",
        type: "DOG",
        age: 2,
        size: "MEDIUM",
        energy_level: 3,
        is_available: true,
        independence_level: 2,
        environment: "House with yard",
        requirements: [],
      },
    });

    expect(response.statusCode).toEqual(401);
  });

  it("should create a pet linked to the authenticated organization", async () => {
    const organizationPayload = {
      name: "Pets Loves",
      responsible_name: "John Doe",
      email: "pet-creation@email.com",
      password: "123456",
      cep: "00000000",
      address: "Rua teste",
      city: "São Paulo",
      whatsapp: "11111111111",
    };

    await app.inject({
      method: "POST",
      url: "/orgs",
      payload: organizationPayload,
    });

    const authResponse = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: organizationPayload.email,
        password: organizationPayload.password,
      },
    });

    const { token } = authResponse.json<{ token: string }>();
    const organization = await prisma.organization.findUniqueOrThrow({
      where: { email: organizationPayload.email },
    });

    const petPayload = {
      name: "Rex",
      about: "Friendly dog",
      type: "DOG",
      age: 2,
      size: "MEDIUM",
      energy_level: 3,
      is_available: true,
      independence_level: 2,
      environment: "House with yard",
      requirements: [],
    };

    const invalidPayloadResponse = await app.inject({
      method: "POST",
      url: "/pets",
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: {
        ...petPayload,
        age: 2.5,
      },
    });

    expect(invalidPayloadResponse.statusCode).toEqual(400);

    const response = await app.inject({
      method: "POST",
      url: "/pets",
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: petPayload,
    });

    expect(authResponse.statusCode).toEqual(200);
    expect(response.statusCode).toEqual(201);

    const pet = await prisma.pet.findFirstOrThrow({
      where: { name: "Rex", organization_id: organization.id },
    });

    expect(pet.organization_id).toEqual(organization.id);
  });
});
