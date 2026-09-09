import { compare } from "bcryptjs";
import type { Organization } from "../entities/organization.js";
import type { OrganizationsRepository } from "../repositories/organizations-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";

interface AuthenticateOrganizationRequest {
  email: string;
  password: string;
}

interface AuthenticateOrganizationResponse {
  organization: Organization;
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    );

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}
