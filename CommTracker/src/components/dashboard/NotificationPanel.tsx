import React from 'react';
import { Bell } from 'lucide-react';
import type { Company, Communication, Notification } from '../../types';
import { formatDate } from '../../utils/date';

interface NotificationPanelProps {
  notifications: Notification[];
  companies: Company[];
  communications: Communication[];
}

export function NotificationPanel({ 
  notifications,
  companies,
  communications
}: NotificationPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const overdueNotifications = notifications.filter(n => n.type === 'overdue');
  const dueNotifications = notifications.filter(n => n.type === 'due');

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown Company';
  };

  const getCommunicationDetails = (communicationId: string) => {
    return communications.find(c => c.id === communicationId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            
            {overdueNotifications.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-600">Overdue Communications</h4>
                <div className="mt-2 space-y-2">
                  {overdueNotifications.map(notification => (
                    <div key={notification.id} className="p-2 bg-red-50 rounded-md">
                      <p className="text-sm font-medium text-gray-900">
                        {getCompanyName(notification.companyId)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {formatDate(notification.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dueNotifications.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-yellow-600">Due Today</h4>
                <div className="mt-2 space-y-2">
                  {dueNotifications.map(notification => (
                    <div key={notification.id} className="p-2 bg-yellow-50 rounded-md">
                      <p className="text-sm font-medium text-gray-900">
                        {getCompanyName(notification.companyId)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {formatDate(notification.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {notifications.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">No notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}