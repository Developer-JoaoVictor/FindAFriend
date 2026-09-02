import { hash } from "bcryptjs";
import type { Organization } from "../entities/organization.js";
import type { OrganizationsRepository } from "../repositories/organizations-repository.js";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists.js";

interface CreateOrganizationRequest {
  name: string;
  responsible_name: string;
  email: string;
  password: string;
  cep: string;
  address: string;
  city: string;
  whatsapp: string;
}

interface CreateOrganizationResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    responsible_name,
    email,
    password,
    cep,
    address,
    city,
    whatsapp,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email);

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError();
    }

    const password_hash = await hash(password, 12);

    const organization = await this.organizationsRepository.create({
      name,
      responsible_name,
      email,
      password_hash,
      cep,
      address,
      city,
      whatsapp,
    });

    return { organization };
  }
}
