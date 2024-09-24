// src/pages/CreateContract.tsx
import { useNavigate } from 'react-router-dom';
import ContractForm from '../components/ContractForm';
import { createContract } from '../services/contractService';
import { Contract, ContractFormData } from '../types/Contract';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const CreateContract = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: ContractFormData) => {
    const newContract: Contract = {
      id: uuidv4(),
      author: data.author || '',
      entityName: data.entityName || '',
      description: data.description || '',
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    await createContract(newContract);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Contract</h1>
        <ContractForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateContract;
