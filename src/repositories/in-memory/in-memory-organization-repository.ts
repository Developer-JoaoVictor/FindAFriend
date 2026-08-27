import { randomUUID } from "node:crypto";
import type { Organization } from "../../entities/organization.js";
import type {
  CreateOrganizationData,
  OrganizationsRepository,
} from "../organizations-repository.js";

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async create(data: CreateOrganizationData) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      responsible_name: data.responsible_name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      address: data.address,
      city: data.city,
      whatsapp: data.whatsapp,
      createdAt: new Date(),
    };

    this.items.push(organization);

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email);

    return organization ?? null;
  }
}
