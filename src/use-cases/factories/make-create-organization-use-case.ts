import { PrismaOrganizationRepository } from "../../repositories/prisma/prisma-organization-repository.js";
import { CreateOrganizationUseCase } from "../create-organization.js";

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository();
  const organizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  );

  return organizationUseCase;
}
