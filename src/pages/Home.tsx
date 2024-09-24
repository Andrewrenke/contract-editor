import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getContracts, deleteContract } from '../services/contractService';
import { Contract } from '../types/Contract';

const Home = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const data = await getContracts();
      setContracts(data);
    };
    fetchContracts();
  }, []);

  const handleDelete = async (id: string) => {
    const deleteRequest = await deleteContract(id);
    if (deleteRequest) {
      setContracts(contracts.filter(contract => contract.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Legal Contracts</h1>
        <Link
          className="bg-green-500 text-white rounded-lg px-4 py-2 mb-4 transition-transform transform hover:scale-105"
          to="/create"
        >
          Create New Contract
        </Link>
        <div className="flex flex-wrap justify-center">
          {contracts.map(contract => (
            <ul
              key={contract.id}
              className="border border-gray-300 rounded-lg p-4 m-2 w-80"
            >
              <li className="mb-2">
                <span className="font-semibold">Entity name:</span>
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {contract.entityName}
                </span>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Author name:</span>
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {contract.author}
                </span>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Description:</span>
                <span className="block break-words">
                  {contract.description}
                </span>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Created at:</span>
                <span className="block overflow-hidden whitespace-normal">
                  {contract.createdAt}
                </span>
              </li>
              <li className="mb-4">
                <span className="font-semibold">Updated at:</span>
                <span className="block overflow-hidden whitespace-normal">
                  {contract.updatedAt || 'no updated yet'}
                </span>
              </li>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 transition-transform transform hover:scale-105"
                  onClick={() => navigate(`/edit/${contract.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded-lg px-4 py-2 transition-transform transform hover:scale-105"
                  onClick={() => handleDelete(contract.id)}
                >
                  Delete
                </button>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
