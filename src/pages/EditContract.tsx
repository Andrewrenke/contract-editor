import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContracts, updateContract } from '../services/contractService';
import { Contract, ContractFormData } from '../types/Contract';

const EditContract = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contractValues, setContactValues] = useState<ContractFormData>();
  const [contract, setContract] = useState<ContractFormData>({
    author: '',
    entityName: '',
    description: '',
  });

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await getContracts();
        const existingContract = data.find(
          (contract: Contract) => contract.id === id
        );
        if (existingContract) {
          setContract(existingContract);
          setContactValues(existingContract);
        }
      } catch (error) {
        console.error('Failed to fetch contract', error);
      }
    };

    fetchContract();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContract(prevContract => ({ ...prevContract, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = contractValues !== contract;
      await updateContract(id as string, contract, updated);
      navigate('/');
    } catch (error) {
      console.error('Failed to update contract', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Contract</h1>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Author:</label>
          <input
            type="text"
            name="author"
            value={contract.author || ''}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">
            Entity Name:
          </label>
          <input
            type="text"
            name="entityName"
            value={contract.entityName || ''}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">
            Description:
          </label>
          <textarea
            name="description"
            value={contract.description || ''}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 transition-transform transform hover:scale-105"
          >
            Update Contract
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContract;
