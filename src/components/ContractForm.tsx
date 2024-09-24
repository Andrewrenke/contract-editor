import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Contract, ContractFormData } from '../types/Contract';

interface ContractFormProps {
  initialData?: Contract;
  onSubmit: (data: Contract | ContractFormData) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContractFormData>({
    author: initialData?.author || '',
    entityName: initialData?.entityName || '',
    description: initialData?.description || '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center w-full max-w-xs">
        <label htmlFor="author" className="font-bold text-xl">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <div className="flex flex-col items-center w-full max-w-xs">
        <label htmlFor="entityName" className="font-bold text-xl">
          Legal Entity Name
        </label>
        <input
          type="text"
          id="entityName"
          name="entityName"
          value={formData.entityName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <div className="flex flex-col items-center w-full max-w-xs">
        <label htmlFor="description" className="font-bold text-xl">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2 transition-transform transform hover:scale-105"
      >
        Save Contract
      </button>
    </form>
  );
};

export default ContractForm;
