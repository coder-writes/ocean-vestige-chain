import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: { latitude: number; longitude: number };
  area: number;
  description: string;
  methodology: string;
  startDate: string;
  estimatedCredits: number;
  budget: number;
  status: 'active' | 'verified' | 'pending';
  credits: number;
  ndvi: number;
  lastUpdate: string;
  createdBy?: string;
  organization?: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Indian Blue Carbon Restoration Projects
const initialProjects: Project[] = [
  {
    id: 'IND001',
    name: 'Sundarbans Mangrove Conservation',
    type: 'mangrove',
    location: 'Sundarbans, West Bengal',
    coordinates: { latitude: 21.9497, longitude: 88.7500 },
    area: 2500.0,
    status: 'verified',
    credits: 185000,
    ndvi: 0.92,
    startDate: '2023-01-15',
    lastUpdate: '2024-03-15',
    description: 'World\'s largest mangrove restoration project protecting tiger habitat and coastal communities',
    methodology: 'vcs',
    estimatedCredits: 200000,
    budget: 15000000,
    createdBy: '1',
    organization: 'West Bengal Forest Department'
  },
  {
    id: 'IND002',
    name: 'Gulf of Mannar Seagrass Restoration',
    type: 'seagrass',
    location: 'Gulf of Mannar, Tamil Nadu',
    coordinates: { latitude: 9.0648, longitude: 79.1378 },
    area: 850.0,
    status: 'verified',
    credits: 95000,
    ndvi: 0.88,
    startDate: '2023-04-20',
    lastUpdate: '2024-03-12',
    description: 'Critical seagrass restoration in India\'s first Marine National Park protecting dugong habitat',
    methodology: 'gold_standard',
    estimatedCredits: 110000,
    budget: 8500000,
    createdBy: '2',
    organization: 'Tamil Nadu Forest Department'
  },
  {
    id: 'IND003',
    name: 'Chilika Lake Wetland Conservation',
    type: 'saltmarsh',
    location: 'Chilika Lake, Odisha',
    coordinates: { latitude: 19.7167, longitude: 85.3167 },
    area: 1200.0,
    status: 'active',
    credits: 78000,
    ndvi: 0.85,
    startDate: '2023-09-10',
    lastUpdate: '2024-03-08',
    description: 'Asia\'s largest brackish water lagoon restoration protecting migratory birds and fisheries',
    methodology: 'vcs',
    estimatedCredits: 95000,
    budget: 12000000,
    createdBy: '3',
    organization: 'Odisha Forest Department'
  },
  {
    id: 'IND004',
    name: 'Bhitarkanika Mangrove Sanctuary',
    type: 'mangrove',
    location: 'Bhitarkanika, Odisha',
    coordinates: { latitude: 20.7071, longitude: 86.9220 },
    area: 672.0,
    status: 'verified',
    credits: 125000,
    ndvi: 0.91,
    startDate: '2023-02-28',
    lastUpdate: '2024-03-10',
    description: 'Second largest mangrove ecosystem restoration protecting saltwater crocodiles and marine biodiversity',
    methodology: 'vcs',
    estimatedCredits: 140000,
    budget: 9500000,
    createdBy: '4',
    organization: 'Bhitarkanika National Park'
  },
  {
    id: 'IND005',
    name: 'Pulicat Lake Conservation Project',
    type: 'saltmarsh',
    location: 'Pulicat Lake, Tamil Nadu-Andhra Pradesh',
    coordinates: { latitude: 13.6667, longitude: 80.1833 },
    area: 460.0,
    status: 'active',
    credits: 45000,
    ndvi: 0.79,
    startDate: '2023-11-15',
    lastUpdate: '2024-03-05',
    description: 'Second largest saltwater lagoon restoration protecting flamingo habitat and local livelihoods',
    methodology: 'climate_action_reserve',
    estimatedCredits: 65000,
    budget: 6200000,
    createdBy: '5',
    organization: 'Pulicat Lake Bird Sanctuary'
  },
  {
    id: 'IND006',
    name: 'Pichavaram Mangrove Forest',
    type: 'mangrove',
    location: 'Pichavaram, Tamil Nadu',
    coordinates: { latitude: 11.4500, longitude: 79.7667 },
    area: 115.0,
    status: 'pending',
    credits: 0,
    ndvi: 0.82,
    startDate: '2024-02-01',
    lastUpdate: '2024-03-01',
    description: 'Unique mangrove forest restoration project with backwater tourism integration',
    methodology: 'vcs',
    estimatedCredits: 25000,
    budget: 2800000,
    createdBy: '6',
    organization: 'Tamil Nadu Biodiversity Board'
  },
];

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      getProjectById
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export type { Project };