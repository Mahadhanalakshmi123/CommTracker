import React from 'react';
import { CompanyForm } from '../components/admin/CompanyForm';
import { CommunicationMethodForm } from '../components/admin/CommunicationMethodForm';
import type { Company, CommunicationMethod } from '../types';

export function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<'companies' | 'methods'>('companies');
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [methods, setMethods] = React.useState<CommunicationMethod[]>([]);

  const handleAddCompany = (company: Partial<Company>) => {
    // TODO: Implement company creation logic
    console.log('Adding company:', company);
  };

  const handleAddMethod = (method: Partial<CommunicationMethod>) => {
    // TODO: Implement method creation logic
    console.log('Adding method:', method);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'companies'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'methods'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Communication Methods
          </button>
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg">
        {activeTab === 'companies' ? (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Company</h2>
            <CompanyForm onSubmit={handleAddCompany} />
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Companies</h3>
              {companies.length === 0 ? (
                <p className="text-gray-500">No companies added yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {companies.map(company => (
                    <li key={company.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{company.name}</h4>
                          <p className="text-sm text-gray-500">{company.location}</p>
                        </div>
                        {/* Add edit/delete buttons here */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Communication Method</h2>
            <CommunicationMethodForm onSubmit={handleAddMethod} />
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Methods</h3>
              {methods.length === 0 ? (
                <p className="text-gray-500">No methods added yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {methods.map(method => (
                    <li key={method.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{method.name}</h4>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                        {/* Add edit/delete buttons here */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}