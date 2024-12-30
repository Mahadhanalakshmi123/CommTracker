import React from 'react';
import { CompanyGrid } from '../components/dashboard/CompanyGrid';
import { CommunicationModal } from '../components/dashboard/CommunicationModal';
import { NotificationPanel } from '../components/dashboard/NotificationPanel';
import type { Company, Communication, CommunicationMethod, Notification } from '../types';

export function DashboardPage() {
  const [selectedCompanies, setSelectedCompanies] = React.useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [communications, setCommunications] = React.useState<Communication[]>([]);
  const [communicationMethods, setCommunicationMethods] = React.useState<CommunicationMethod[]>([]);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const handleCompanySelect = (companyId: string) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  const handleCommunicationSubmit = (data: { methodId: string; date: string; notes: string }) => {
    // TODO: Implement communication creation logic
    console.log('Adding communication:', data);
    setIsModalOpen(false);
  };

  const selectedCompanyObjects = React.useMemo(() => {
    return companies.filter(company => selectedCompanies.has(company.id));
  }, [companies, selectedCompanies]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <NotificationPanel
            notifications={notifications}
            companies={companies}
            communications={communications}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={selectedCompanies.size === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log Communication
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <CompanyGrid
          companies={companies}
          communications={communications}
          onSelect={handleCompanySelect}
          selectedCompanies={selectedCompanies}
        />
      </div>

      <CommunicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommunicationSubmit}
        selectedCompanies={selectedCompanyObjects}
        communicationMethods={communicationMethods}
      />
    </div>
  );
}