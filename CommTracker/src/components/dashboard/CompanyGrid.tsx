import React from 'react';
import type { Company, Communication } from '../../types';
import { formatDate } from '../../utils/date';

interface CompanyGridProps {
  companies: Company[];
  communications: Communication[];
  onSelect: (companyId: string) => void;
  selectedCompanies: Set<string>;
}

export function CompanyGrid({ 
  companies, 
  communications, 
  onSelect, 
  selectedCompanies 
}: CompanyGridProps) {
  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter(comm => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextCommunication = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return null;

    const lastComm = communications
      .filter(comm => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return new Date();

    const nextDate = new Date(lastComm.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);
    return nextDate;
  };

  const getRowHighlight = (companyId: string) => {
    const nextComm = getNextCommunication(companyId);
    if (!nextComm) return '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (nextComm < today) return 'bg-red-100';
    if (nextComm.getTime() === today.getTime()) return 'bg-yellow-100';
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Five Communications
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Scheduled
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className={getRowHighlight(company.id)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedCompanies.has(company.id)}
                  onChange={() => onSelect(company.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{company.name}</div>
                <div className="text-sm text-gray-500">{company.location}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {getLastFiveCommunications(company.id).map((comm, index) => (
                    <span
                      key={comm.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      title={comm.notes}
                    >
                      {comm.methodId} - {formatDate(comm.date)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(getNextCommunication(company.id)?.toISOString() || '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}