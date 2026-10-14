export type PetType = "DOG" | "CAT";

export type PetSize = "SMALL" | "MEDIUM" | "LARGE";

export interface Pet {
  id: string;
  name: string;
  about: string;
  type: PetType;
  age: number;
  size: PetSize;
  energy_level: number;
  is_available: boolean;
  independence_level: number;
  environment: string;
  requirements: string[];
  created_at: Date;
  organization_id: string;
}
