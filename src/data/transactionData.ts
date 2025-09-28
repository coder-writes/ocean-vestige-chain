// Transaction and Project Data for India's Blue Carbon Platform

export interface Organization {
  id: string;
  name: string;
  type: 'ngo' | 'panchayat' | 'government' | 'research' | 'verifier' | 'community' | 'private';
  location: {
    state: string;
    district: string;
  };
  registrationNumber: string;
  contactPerson: string;
  email: string;
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'mangrove' | 'seagrass' | 'saltmarsh';
  location: {
    state: string;
    district: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  area: number; // in hectares
  owner: Organization;
  developer: Organization;
  verifier: Organization;
  status: 'active' | 'completed' | 'under_verification' | 'pending';
  startDate: string;
  completionDate?: string;
  totalCreditsIssued: number;
  availableCredits: number;
  pricePerCredit: number; // in INR
  certificationStandard: string;
  methodology: string;
  annualSequestration: number; // tCO2/year
  images: string[];
  documents: {
    name: string;
    url: string;
    type: string;
  }[];
  monitoring: {
    lastUpdated: string;
    carbonStock: number;
    biodiversityIndex: number;
    communityBenefit: number;
  };
}

export interface Transaction {
  id: string;
  transactionHash: string;
  timestamp: string;
  fromOrganization: Organization;
  toOrganization: Organization;
  project: Project;
  creditAmount: number;
  pricePerCredit: number;
  totalAmount: number; // in INR
  status: 'completed' | 'pending' | 'failed';
  transactionType: 'purchase' | 'transfer' | 'retirement';
  purpose?: string;
  notes?: string;
}

// Sample Organizations
export const organizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Tata Power Company Limited',
    type: 'private',
    location: { state: 'Maharashtra', district: 'Mumbai' },
    registrationNumber: 'L40100MH1919PLC000371',
    contactPerson: 'Dr. Praveer Sinha',
    email: 'sustainability@tatapower.com'
  },
  {
    id: 'org-2', 
    name: 'Adani Green Energy Limited',
    type: 'private',
    location: { state: 'Gujarat', district: 'Ahmedabad' },
    registrationNumber: 'L40100GJ2015PLC082007',
    contactPerson: 'Mr. Sagar Adani',
    email: 'carbonoffset@adanigreen.com'
  },
  {
    id: 'org-3',
    name: 'Sundarbans Panchayat',
    type: 'panchayat',
    location: { state: 'West Bengal', district: 'South 24 Parganas' },
    registrationNumber: 'WB-PAN-2019-001',
    contactPerson: 'Amit Mondal',
    email: 'panchayat@sundarbans.gov.in'
  },
  {
    id: 'org-4',
    name: 'India Mangrove Alliance',
    type: 'ngo',
    location: { state: 'Tamil Nadu', district: 'Chennai' },
    registrationNumber: 'TN-NGO-2018-456',
    contactPerson: 'Priya Sharma',
    email: 'ngo@mangrovealliance.org'
  },
  {
    id: 'org-5',
    name: 'Quality Council of India',
    type: 'verifier',
    location: { state: 'Delhi', district: 'New Delhi' },
    registrationNumber: 'DL-VER-2020-001',
    contactPerson: 'Dr. Suresh Patel',
    email: 'verifier@qci.org.in'
  },
  {
    id: 'org-6',
    name: 'Godrej & Boyce Manufacturing',
    type: 'private',
    location: { state: 'Maharashtra', district: 'Mumbai' },
    registrationNumber: 'L29100MH1988PLC048001',
    contactPerson: 'Ms. Nisaba Godrej',
    email: 'sustainability@godrej.com'
  }
];

// Sample Projects
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Sundarbans Mangrove Restoration',
    description: 'Large-scale mangrove restoration project in the Sundarbans delta, focusing on native species plantation and community-based conservation.',
    type: 'mangrove',
    location: {
      state: 'West Bengal',
      district: 'South 24 Parganas',
      coordinates: { lat: 21.9497, lng: 88.4297 }
    },
    area: 2500,
    owner: organizations[2], // Sundarbans Panchayat
    developer: organizations[3], // India Mangrove Alliance
    verifier: organizations[4], // Quality Council of India
    status: 'active',
    startDate: '2022-01-15',
    totalCreditsIssued: 125000,
    availableCredits: 45000,
    pricePerCredit: 850,
    certificationStandard: 'VCS (Verified Carbon Standard)',
    methodology: 'VM0007: REDD+ Methodology Framework',
    annualSequestration: 50000,
    images: ['/images/sundarbans-1.jpg', '/images/sundarbans-2.jpg'],
    documents: [
      { name: 'Project Design Document', url: '/docs/sundarbans-pdd.pdf', type: 'PDF' },
      { name: 'Verification Report', url: '/docs/sundarbans-verification.pdf', type: 'PDF' }
    ],
    monitoring: {
      lastUpdated: '2025-09-15',
      carbonStock: 2850,
      biodiversityIndex: 8.7,
      communityBenefit: 9.2
    }
  },
  {
    id: 'proj-2',
    name: 'Gujarat Coastal Salt Marsh Conservation',
    description: 'Restoration and protection of salt marsh ecosystems along Gujarat\'s coast, integrating traditional knowledge with modern conservation techniques.',
    type: 'saltmarsh',
    location: {
      state: 'Gujarat',
      district: 'Kutch',
      coordinates: { lat: 23.0225, lng: 68.8397 }
    },
    area: 1800,
    owner: organizations[1], // Adani Green Energy
    developer: organizations[3], // India Mangrove Alliance
    verifier: organizations[4], // Quality Council of India
    status: 'under_verification',
    startDate: '2023-03-10',
    totalCreditsIssued: 75000,
    availableCredits: 75000,
    pricePerCredit: 920,
    certificationStandard: 'Gold Standard',
    methodology: 'GS-AFOLU: Wetland Conservation',
    annualSequestration: 35000,
    images: ['/images/gujarat-saltmarsh-1.jpg', '/images/gujarat-saltmarsh-2.jpg'],
    documents: [
      { name: 'Environmental Impact Assessment', url: '/docs/gujarat-eia.pdf', type: 'PDF' },
      { name: 'Monitoring Plan', url: '/docs/gujarat-monitoring.pdf', type: 'PDF' }
    ],
    monitoring: {
      lastUpdated: '2025-09-20',
      carbonStock: 1950,
      biodiversityIndex: 7.8,
      communityBenefit: 8.5
    }
  },
  {
    id: 'proj-3',
    name: 'Tamil Nadu Seagrass Meadow Restoration',
    description: 'Comprehensive seagrass restoration program in Palk Bay, focusing on Cymodocea serrulata and Halophila ovalis species.',
    type: 'seagrass',
    location: {
      state: 'Tamil Nadu',
      district: 'Ramanathapuram',
      coordinates: { lat: 9.2647, lng: 79.1319 }
    },
    area: 1200,
    owner: organizations[3], // India Mangrove Alliance
    developer: organizations[3], // India Mangrove Alliance
    verifier: organizations[4], // Quality Council of India
    status: 'active',
    startDate: '2022-08-20',
    totalCreditsIssued: 60000,
    availableCredits: 22000,
    pricePerCredit: 780,
    certificationStandard: 'VCS (Verified Carbon Standard)',
    methodology: 'VM0033: Methodology for Tidal Wetland Restoration',
    annualSequestration: 28000,
    images: ['/images/tamilnadu-seagrass-1.jpg', '/images/tamilnadu-seagrass-2.jpg'],
    documents: [
      { name: 'Baseline Study Report', url: '/docs/tamilnadu-baseline.pdf', type: 'PDF' },
      { name: 'Species Inventory', url: '/docs/tamilnadu-species.pdf', type: 'PDF' }
    ],
    monitoring: {
      lastUpdated: '2025-09-10',
      carbonStock: 1680,
      biodiversityIndex: 9.1,
      communityBenefit: 8.8
    }
  }
];

// Sample Transactions
export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    transactionHash: '0x8f7a9c2d1e5b4a8f6c3d9e2a7b1c5f8d4e9a2c6b',
    timestamp: '2025-09-25T14:30:00Z',
    fromOrganization: organizations[2], // Sundarbans Panchayat
    toOrganization: organizations[0], // Tata Power
    project: projects[0], // Sundarbans Mangrove
    creditAmount: 15000,
    pricePerCredit: 850,
    totalAmount: 12750000, // 1.275 Crores
    status: 'completed',
    transactionType: 'purchase',
    purpose: 'Corporate carbon neutrality initiative for Q3 2025',
    notes: 'Bulk purchase for offset requirements under Tata Group sustainability goals'
  },
  {
    id: 'txn-002',
    transactionHash: '0x4b2f8a1c9d6e3b7f2a5c8d1e4b9a6c3f7e2d5a8b',
    timestamp: '2025-09-22T10:15:00Z',
    fromOrganization: organizations[3], // India Mangrove Alliance
    toOrganization: organizations[5], // Godrej & Boyce
    project: projects[2], // Tamil Nadu Seagrass
    creditAmount: 8500,
    pricePerCredit: 780,
    totalAmount: 6630000, // 66.3 Lakhs
    status: 'completed',
    transactionType: 'purchase',
    purpose: 'Godrej Nature\'s Basket carbon footprint reduction',
    notes: 'Supporting seagrass conservation while meeting ESG commitments'
  },
  {
    id: 'txn-003',
    transactionHash: '0x7e3a9b2f5c8d1a4e7b2c6f9a3d5e8b1c4f7a2d6e',
    timestamp: '2025-09-20T16:45:00Z',
    fromOrganization: organizations[1], // Adani Green Energy
    toOrganization: organizations[0], // Tata Power
    project: projects[1], // Gujarat Salt Marsh
    creditAmount: 12000,
    pricePerCredit: 920,
    totalAmount: 11040000, // 1.104 Crores
    status: 'pending',
    transactionType: 'purchase',
    purpose: 'Inter-corporate carbon credit exchange agreement',
    notes: 'Strategic partnership for renewable energy carbon offset portfolio'
  },
  {
    id: 'txn-004',
    transactionHash: '0x2d8c5a1f4b7e9c3a6d2f8b5e1a4c7d9b3f6e2a8c',
    timestamp: '2025-09-18T09:20:00Z',
    fromOrganization: organizations[2], // Sundarbans Panchayat
    toOrganization: organizations[1], // Adani Green Energy
    project: projects[0], // Sundarbans Mangrove
    creditAmount: 20000,
    pricePerCredit: 850,
    totalAmount: 17000000, // 1.7 Crores
    status: 'completed',
    transactionType: 'purchase',
    purpose: 'Green energy portfolio carbon neutrality',
    notes: 'Large-scale mangrove credits for renewable energy expansion projects'
  },
  {
    id: 'txn-005',
    transactionHash: '0x9a6f2c5d8b1e4a7c3f9d6b2e5a8c1f4d7b9e3a6c',
    timestamp: '2025-09-15T13:10:00Z',
    fromOrganization: organizations[3], // India Mangrove Alliance
    toOrganization: organizations[5], // Godrej & Boyce
    project: projects[2], // Tamil Nadu Seagrass
    creditAmount: 6000,
    pricePerCredit: 780,
    totalAmount: 4680000, // 46.8 Lakhs
    status: 'completed',
    transactionType: 'retirement',
    purpose: 'Voluntary carbon retirement for CSR activities',
    notes: 'Credits retired for Godrej Good & Green sustainability program'
  }
];

// Helper function to get organization by ID
export const getOrganizationById = (id: string): Organization | undefined => {
  return organizations.find(org => org.id === id);
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(proj => proj.id === id);
};

// Helper function to get transactions by organization
export const getTransactionsByOrganization = (organizationId: string): Transaction[] => {
  return transactions.filter(txn => 
    txn.fromOrganization.id === organizationId || 
    txn.toOrganization.id === organizationId
  );
};

// Helper function to format currency in Indian format
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function to format date for Indian locale
export const formatIndianDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};