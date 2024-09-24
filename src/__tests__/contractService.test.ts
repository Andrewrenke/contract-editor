import {
  getContracts,
  createContract,
  updateContract,
  deleteContract,
} from '../services/contractService';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe('Contract Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getContracts should fetch contracts', async () => {
    const mockContracts = [
      {
        id: '1',
        author: 'Author 1',
        entityName: 'Entity 1',
        description: 'Description 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-02',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContracts,
    });

    const contracts = await getContracts();
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/contracts');
    expect(contracts).toEqual(mockContracts);
  });

  test('getContracts should throw an error on fetch failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(getContracts()).rejects.toThrow('Failed to fetch contracts');
  });

  test('createContract should create a new contract', async () => {
    const newContract = {
      id: uuidv4(),
      author: 'Author 1',
      entityName: 'Entity 1',
      description: 'Description 1',
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    mockFetch.mockResolvedValueOnce({ ok: true });

    await createContract(newContract);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContract),
    });
  });

  test('createContract should throw an error on create failure', async () => {
    const newContract = {
      id: uuidv4(),
      author: 'Author 1',
      entityName: 'Entity 1',
      description: 'Description 1',
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(createContract(newContract)).rejects.toThrow(
      'Failed to create contract'
    );
  });

  test('updateContract should update an existing contract', async () => {
    const updatedContract = { 
      author: 'Updated Author', 
      entityName: 'Updated Entity', 
      description: 'Updated Description' 
    };
  
    mockFetch.mockResolvedValueOnce({ ok: true });
  
    await updateContract('1', updatedContract, true);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/contracts/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...updatedContract, 
        updatedAt: moment().format('YYYY-MM-DD HH:mm') 
      }),
    });
  });
  
  

  test('updateContract should throw an error on update failure', async () => {
    const updatedContract = {
      author: 'Updated Author',
      entityName: 'Updated Entity',
      description: 'Updated Description',
    };

    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(updateContract('1', updatedContract, true)).rejects.toThrow(
      'Failed to update contract'
    );
  });

  test('deleteContract should delete an existing contract', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await deleteContract('1');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/contracts/1',
      {
        method: 'DELETE',
      }
    );
  });

  test('deleteContract should throw an error on delete failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(deleteContract('1')).rejects.toThrow(
      'Failed to delete contract'
    );
  });
});
