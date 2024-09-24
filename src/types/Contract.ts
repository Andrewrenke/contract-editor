export interface Contract {
  id: string;
  author: string;
  entityName: string;
  description: string;
  createdAt: string;
  updatedAt?: string | null;
}

export type ContractFormData = Omit<Contract, 'id' | 'createdAt'>;
