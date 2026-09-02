import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "../../../src/app.js";

describe("Create organization (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create an organization", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/orgs",
      payload: {
        name: "Pets Loves",
        responsible_name: "Jonh Doe",
        email: "johndoe@email.com",
        password: "123456",
        cep: "00000000",
        address: "Rua teste",
        city: "São Paulo",
        whatsapp: "11111111111",
      },
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not be able to create an organization with same email", async () => {
    const organizationPayload = {
      name: "Pets Loves",
      responsible_name: "Jonh Doe",
      email: "johndoe@email.com",
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

    const response = await app.inject({
      method: "POST",
      url: "/orgs",
      payload: organizationPayload,
    });

    expect(response.statusCode).toEqual(409);
    expect(response.json()).toEqual({
      message: "E-mail already exists",
    });
  });
});
