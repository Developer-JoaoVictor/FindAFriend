import type { Organization } from "../entities/organization.js";

export interface CreateOrganizationData {
  name: string;
  responsible_name: string;
  email: string;
  password_hash: string;
  cep: string;
  address: string;
  city: string;
  whatsapp: string;
}

export interface OrganizationsRepository {
  create(data: CreateOrganizationData): Promise<Organization>;
  findByEmail(email: string): Promise<Organization | null>;
}
