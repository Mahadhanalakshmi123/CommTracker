// Company Types
export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number; // in days
}

// Communication Method Types
export interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
}

// Communication Types
export interface Communication {
  id: string;
  companyId: string;
  methodId: string;
  date: string;
  notes: string;
  completed: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  companyId: string;
  communicationId: string;
  type: 'overdue' | 'due';
  date: string;
}