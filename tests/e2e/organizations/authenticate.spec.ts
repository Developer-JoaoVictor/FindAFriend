import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "../../../src/app.js";

describe("Authenticate organization (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate an organization", async () => {
    await app.inject({
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

    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: "johndoe@email.com",
        password: "123456",
      },
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({
      token: expect.any(String),
    });
  });

  it("should not be able to authenticate with an invalid payload", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: "invalid-email",
        password: "",
      },
    });

    expect(response.statusCode).toEqual(400);
  });

  it("should not be able to authenticate with an invalid email", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: "invalid-email",
        password: "123456",
      },
    });

    expect(response.statusCode).toEqual(400);
  });

  it("should not be able to authenticate with a wrong password", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: "johndoe@email.com",
        password: "wrong-password",
      },
    });

    expect(response.statusCode).toEqual(401);
  });

  it("should not be able to authenticate with a non-existing email", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/sessions",
      payload: {
        email: "not-found@email.com",
        password: "123456",
      },
    });

    expect(response.statusCode).toEqual(401);
  });
});
