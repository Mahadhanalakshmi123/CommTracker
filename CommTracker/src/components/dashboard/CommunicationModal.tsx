import React from 'react';
import type { Company, CommunicationMethod } from '../../types';

interface CommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { methodId: string; date: string; notes: string }) => void;
  selectedCompanies: Company[];
  communicationMethods: CommunicationMethod[];
}

export function CommunicationModal({
  isOpen,
  onClose,
  onSubmit,
  selectedCompanies,
  communicationMethods,
}: CommunicationModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      methodId: formData.get('methodId') as string,
      date: formData.get('date') as string,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-medium mb-4">Log Communication</h2>
        
        <div className="mb-4">
          <h3 className="font-medium text-sm text-gray-700 mb-2">Selected Companies:</h3>
          <ul className="text-sm text-gray-600">
            {selectedCompanies.map(company => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="methodId" className="block text-sm font-medium text-gray-700">
              Communication Method
            </label>
            <select
              name="methodId"
              id="methodId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {communicationMethods
                .sort((a, b) => a.sequence - b.sequence)
                .map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}