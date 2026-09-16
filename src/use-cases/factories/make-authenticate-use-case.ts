import { PrismaOrganizationRepository } from "../../repositories/prisma/prisma-organization-repository.js";
import { AuthenticateOrganizationUseCase } from "../authenticate-organization.js";

export function MakeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository();
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  );

  return authenticateOrganizationUseCase;
}
