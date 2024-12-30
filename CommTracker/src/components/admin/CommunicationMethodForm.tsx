import React from 'react';
import type { CommunicationMethod } from '../../types';

interface CommunicationMethodFormProps {
  onSubmit: (method: Partial<CommunicationMethod>) => void;
  initialData?: CommunicationMethod;
}

export function CommunicationMethodForm({ onSubmit, initialData }: CommunicationMethodFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      sequence: Number(formData.get('sequence')),
      isMandatory: formData.get('isMandatory') === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Method Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          defaultValue={initialData?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="sequence" className="block text-sm font-medium text-gray-700">
          Sequence
        </label>
        <input
          type="number"
          name="sequence"
          id="sequence"
          min="1"
          defaultValue={initialData?.sequence}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="isMandatory" className="block text-sm font-medium text-gray-700">
          Is Mandatory
        </label>
        <select
          name="isMandatory"
          id="isMandatory"
          defaultValue={initialData?.isMandatory ? 'true' : 'false'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Method' : 'Add Method'}
        </button>
      </div>
    </form>
  );
}