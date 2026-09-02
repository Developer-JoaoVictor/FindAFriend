import { prisma } from "../../lib/prisma.js";
import type {
  CreateOrganizationData,
  OrganizationsRepository,
} from "../organizations-repository.js";

export class PrismaOrganizationRepository implements OrganizationsRepository {
  async create(data: CreateOrganizationData) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }
}
