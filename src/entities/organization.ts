export interface Organization {
  id: string;
  name: string;
  responsible_name: string;
  email: string;
  password_hash: string;
  cep: string;
  address: string;
  city: string;
  whatsapp: string;
  createdAt: Date;
}
