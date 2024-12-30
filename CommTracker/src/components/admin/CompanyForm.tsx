import React from 'react';
import { Plus, Trash } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyFormProps {
  onSubmit: (company: Partial<Company>) => void;
  initialData?: Company;
}

export function CompanyForm({ onSubmit, initialData }: CompanyFormProps) {
  const [emails, setEmails] = React.useState<string[]>(initialData?.emails || ['']);
  const [phoneNumbers, setPhoneNumbers] = React.useState<string[]>(initialData?.phoneNumbers || ['']);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      linkedinProfile: formData.get('linkedinProfile') as string,
      emails: emails.filter(Boolean),
      phoneNumbers: phoneNumbers.filter(Boolean),
      comments: formData.get('comments') as string,
      communicationPeriodicity: Number(formData.get('communicationPeriodicity')),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
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
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          defaultValue={initialData?.location}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          name="linkedinProfile"
          id="linkedinProfile"
          defaultValue={initialData?.linkedinProfile}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
        <div className="space-y-2">
          {emails.map((email, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...emails];
                  newEmails[index] = e.target.value;
                  setEmails(newEmails);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setEmails([...emails, ''])}
                className="inline-flex items-center p-2 text-indigo-600 hover:text-indigo-900"
              >
                <Plus className="h-5 w-5" />
              </button>
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                  className="inline-flex items-center p-2 text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        <div className="space-y-2">
          {phoneNumbers.map((phone, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...phoneNumbers];
                  newPhones[index] = e.target.value;
                  setPhoneNumbers(newPhones);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setPhoneNumbers([...phoneNumbers, ''])}
                className="inline-flex items-center p-2 text-indigo-600 hover:text-indigo-900"
              >
                <Plus className="h-5 w-5" />
              </button>
              {phoneNumbers.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))}
                  className="inline-flex items-center p-2 text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          name="comments"
          id="comments"
          rows={3}
          defaultValue={initialData?.comments}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="communicationPeriodicity" className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          name="communicationPeriodicity"
          id="communicationPeriodicity"
          min="1"
          defaultValue={initialData?.communicationPeriodicity || 14}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Company' : 'Add Company'}
        </button>
      </div>
    </form>
  );
}