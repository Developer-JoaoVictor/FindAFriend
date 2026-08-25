export interface Organization {
  name:  string
  responsibleName: string
  email: string  
  passwordHash: string
  cep: string
  address: string
  city: string
  whatsapp: string
  createdAt: Date
}