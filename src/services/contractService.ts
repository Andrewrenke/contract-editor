// src/services/contractService.ts
import { Contract, ContractFormData } from '../types/Contract';
import moment from 'moment';

const SERVER_URL = 'http://localhost:4000/contracts';

export const getContracts = async (): Promise<Contract[]> => {
  const response = await fetch(SERVER_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch contracts');
  }
  const data = await response.json();
  return data;
};

export const createContract = async (newContract: Contract): Promise<void> => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContract),
  });

  if (!response.ok) {
    throw new Error('Failed to create contract');
  }
};

export const updateContract = async (
  id: string,
  updatedData: ContractFormData,
  updated: boolean
): Promise<void> => {
  const updatedAt = updated
    ? moment().format('YYYY-MM-DD HH:mm')
    : updatedData.updatedAt;
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...updatedData, updatedAt: updatedAt }),
  });

  if (!response.ok) {
    throw new Error('Failed to update contract');
  }
};

export const deleteContract = async (id: string): Promise<void | boolean> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete contract');
  } else {
    return true;
  }
};
