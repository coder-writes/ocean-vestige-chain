// Blockchain Service for Blue Carbon MRV Platform
// Simulates Web3 integration for carbon credit tokenization and immutable storage

export interface BlockchainConfig {
  networkName: string;
  chainId: number;
  rpcUrl: string;
  contractAddresses: {
    carbonCreditToken: string;
    projectRegistry: string;
    verificationRegistry: string;
    stakeholderRegistry: string;
  };
}

export interface CarbonCreditToken {
  id: string;
  projectId: string;
  amount: number; // tCO2
  vintage: string; // Year of credit generation
  serialNumber: string;
  status: 'active' | 'retired' | 'transferred';
  owner: string;
  issueDate: string;
  metadata: {
    ecosystemType: 'mangrove' | 'seagrass' | 'saltmarsh';
    methodology: string;
    verifier: string;
    gpsCoordinates: { lat: number; lng: number };
    evidenceHash: string; // IPFS hash of supporting documents
  };
  transactionHistory: Array<{
    from: string;
    to: string;
    amount: number;
    timestamp: string;
    transactionHash: string;
    purpose: string;
  }>;
}

export interface PlantationRecord {
  id: string;
  projectId: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    area: number; // hectares
  };
  plantationData: {
    speciesPlanted: string[];
    numberOfSeedlings: number;
    survivalRate: number;
    plantationMethod: string;
    soilConditions: string;
    waterQuality: string;
  };
  evidenceData: {
    photographs: string[]; // IPFS hashes
    droneImagery?: string; // IPFS hash
    fieldNotes: string;
    weatherConditions: string;
  };
  reportedBy: {
    organizationId: string;
    fieldOfficer: string;
    verifiedBy?: string;
    verificationDate?: string;
  };
  blockchainRecord: {
    transactionHash: string;
    blockNumber: number;
    timestamp: string;
    gasUsed: number;
  };
}

export interface MonitoringData {
  id: string;
  projectId: string;
  recordDate: string;
  measurements: {
    biomass: number; // tons per hectare
    carbonStock: number; // tCO2 per hectare
    canopyCover: number; // percentage
    speciesDiversity: number; // Shannon index
    waterQuality: {
      ph: number;
      salinity: number;
      turbidity: number;
    };
    soilHealth: {
      organicCarbon: number;
      nitrogen: number;
      phosphorus: number;
    };
  };
  dataSource: {
    type: 'manual' | 'drone' | 'satellite' | 'sensor';
    deviceId?: string;
    accuracy: number;
    calibrationDate?: string;
  };
  verification: {
    status: 'pending' | 'verified' | 'rejected';
    verifiedBy?: string;
    verificationNotes?: string;
    confidenceScore: number;
  };
  immutableHash: string; // Blockchain hash
}

export interface CreditMetadata {
  ecosystemType: 'mangrove' | 'seagrass' | 'saltmarsh';
  methodology: string;
  verifier: string;
  gpsCoordinates: { lat: number; lng: number };
  evidenceHash: string;
}

export interface ProjectRegistrationData {
  name: string;
  description: string;
  location: { lat: number; lng: number; area: number };
  ecosystemType: 'mangrove' | 'seagrass' | 'saltmarsh';
  organizationId: string;
  targetCarbonSequestration: number;
  timeline: { startDate: string; endDate: string };
  methodology: string;
}

export interface StakeholderRegistrationData {
  name: string;
  organizationType: 'NGO' | 'government' | 'panchayat' | 'private' | 'community';
  walletAddress: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  role: 'validator' | 'implementer' | 'monitor' | 'buyer';
  verificationDocuments: string[]; // IPFS hashes
}

export interface SmartContractInterface {
  // Carbon Credit Token Contract
  mintCarbonCredits: (projectId: string, amount: number, metadata: CreditMetadata) => Promise<string>;
  transferCredits: (from: string, to: string, amount: number, tokenId: string) => Promise<string>;
  retireCredits: (tokenId: string, amount: number, reason: string) => Promise<string>;
  getCreditBalance: (address: string) => Promise<number>;
  getCreditHistory: (tokenId: string) => Promise<CarbonCreditToken>;
  
  // Project Registry Contract
  registerProject: (projectData: ProjectRegistrationData) => Promise<string>;
  updateProjectStatus: (projectId: string, status: string) => Promise<string>;
  addPlantationRecord: (plantationData: PlantationRecord) => Promise<string>;
  addMonitoringData: (monitoringData: MonitoringData) => Promise<string>;
  
  // Verification Registry Contract
  submitForVerification: (recordId: string, evidenceHash: string) => Promise<string>;
  approveVerification: (recordId: string, verifierId: string) => Promise<string>;
  rejectVerification: (recordId: string, reason: string) => Promise<string>;
  
  // Stakeholder Registry Contract
  registerStakeholder: (stakeholderData: StakeholderRegistrationData) => Promise<string>;
  updateStakeholderRole: (address: string, role: string) => Promise<string>;
  verifyStakeholder: (address: string) => Promise<boolean>;
}

// Demo Implementation (simulating blockchain interactions)
class BlockchainService implements SmartContractInterface {
  private config: BlockchainConfig;
  private demoTransactionDelay = 2000; // Simulate blockchain transaction time

  constructor() {
    this.config = {
      networkName: 'Polygon Mumbai (Testnet)',
      chainId: 80001,
      rpcUrl: 'https://rpc-mumbai.maticvigil.com',
      contractAddresses: {
        carbonCreditToken: '0x1234567890123456789012345678901234567890',
        projectRegistry: '0x2345678901234567890123456789012345678901',
        verificationRegistry: '0x3456789012345678901234567890123456789012',
        stakeholderRegistry: '0x4567890123456789012345678901234567890123'
      }
    };
  }

  // Simulate blockchain transaction with delay
  private async simulateTransaction(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, this.demoTransactionDelay));
    return '0x' + Math.random().toString(16).substring(2, 66); // Mock transaction hash
  }

  async mintCarbonCredits(projectId: string, amount: number, metadata: CreditMetadata): Promise<string> {
    console.log(`🪙 Minting ${amount} carbon credits for project ${projectId}`);
    const txHash = await this.simulateTransaction();
    
    // Store in demo database/state
    const creditToken: CarbonCreditToken = {
      id: `credit-${Date.now()}`,
      projectId,
      amount,
      vintage: new Date().getFullYear().toString(),
      serialNumber: `IN-${projectId}-${Date.now()}`,
      status: 'active',
      owner: '0x' + Math.random().toString(16).substring(2, 42),
      issueDate: new Date().toISOString(),
      metadata: {
        ecosystemType: metadata.ecosystemType,
        methodology: metadata.methodology,
        verifier: metadata.verifier,
        gpsCoordinates: metadata.gpsCoordinates,
        evidenceHash: metadata.evidenceHash
      },
      transactionHistory: [{
        from: '0x0000000000000000000000000000000000000000',
        to: '0x' + Math.random().toString(16).substring(2, 42),
        amount,
        timestamp: new Date().toISOString(),
        transactionHash: txHash,
        purpose: 'Initial minting'
      }]
    };

    this.storeCreditToken(creditToken);
    return txHash;
  }

  async transferCredits(from: string, to: string, amount: number, tokenId: string): Promise<string> {
    console.log(`💸 Transferring ${amount} credits from ${from} to ${to}`);
    return await this.simulateTransaction();
  }

  async retireCredits(tokenId: string, amount: number, reason: string): Promise<string> {
    console.log(`🔥 Retiring ${amount} credits for reason: ${reason}`);
    return await this.simulateTransaction();
  }

  async getCreditBalance(address: string): Promise<number> {
    // Demo balance
    return Math.floor(Math.random() * 10000);
  }

  async getCreditHistory(tokenId: string): Promise<CarbonCreditToken> {
    // Return demo credit token
    return {
      id: tokenId,
      projectId: 'proj-1',
      amount: 1000,
      vintage: '2025',
      serialNumber: `IN-proj-1-${Date.now()}`,
      status: 'active',
      owner: '0x1234567890123456789012345678901234567890',
      issueDate: new Date().toISOString(),
      metadata: {
        ecosystemType: 'mangrove',
        methodology: 'VM0007',
        verifier: 'Quality Council of India',
        gpsCoordinates: { lat: 21.9497, lng: 88.7500 },
        evidenceHash: 'QmX1eVtZy9rQ3mP4nL8kJ6wT2cV5bN7x'
      },
      transactionHistory: []
    };
  }

  async registerProject(projectData: ProjectRegistrationData): Promise<string> {
    console.log(`📋 Registering project: ${projectData.name}`);
    return await this.simulateTransaction();
  }

  async updateProjectStatus(projectId: string, status: string): Promise<string> {
    console.log(`📊 Updating project ${projectId} status to ${status}`);
    return await this.simulateTransaction();
  }

  async addPlantationRecord(plantationData: PlantationRecord): Promise<string> {
    console.log(`🌱 Adding plantation record for project ${plantationData.projectId}`);
    const txHash = await this.simulateTransaction();
    
    // Add blockchain record details
    plantationData.blockchainRecord = {
      transactionHash: txHash,
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
      gasUsed: Math.floor(Math.random() * 100000)
    };

    return txHash;
  }

  async addMonitoringData(monitoringData: MonitoringData): Promise<string> {
    console.log(`📊 Adding monitoring data for project ${monitoringData.projectId}`);
    const txHash = await this.simulateTransaction();
    
    // Generate immutable hash
    monitoringData.immutableHash = txHash;
    
    return txHash;
  }

  async submitForVerification(recordId: string, evidenceHash: string): Promise<string> {
    console.log(`✅ Submitting record ${recordId} for verification`);
    return await this.simulateTransaction();
  }

  async approveVerification(recordId: string, verifierId: string): Promise<string> {
    console.log(`✅ Approving verification for record ${recordId} by ${verifierId}`);
    return await this.simulateTransaction();
  }

  async rejectVerification(recordId: string, reason: string): Promise<string> {
    console.log(`❌ Rejecting verification for record ${recordId}: ${reason}`);
    return await this.simulateTransaction();
  }

  async registerStakeholder(stakeholderData: StakeholderRegistrationData): Promise<string> {
    console.log(`👥 Registering stakeholder: ${stakeholderData.name}`);
    return await this.simulateTransaction();
  }

  async updateStakeholderRole(address: string, role: string): Promise<string> {
    console.log(`🔄 Updating role for ${address} to ${role}`);
    return await this.simulateTransaction();
  }

  async verifyStakeholder(address: string): Promise<boolean> {
    console.log(`🔍 Verifying stakeholder: ${address}`);
    await this.simulateTransaction();
    return Math.random() > 0.2; // 80% verification success rate
  }

  // Helper methods
  private storeCreditToken(token: CarbonCreditToken): void {
    // In a real implementation, this would interact with a database or state management
    console.log(`💾 Storing credit token: ${token.id}`);
  }

  // Utility methods for the platform
  async getNetworkInfo(): Promise<BlockchainConfig> {
    return this.config;
  }

  async getTransactionStatus(txHash: string): Promise<'pending' | 'confirmed' | 'failed'> {
    // Simulate transaction confirmation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.1 ? 'confirmed' : 'pending';
  }

  async estimateGasFee(operation: string): Promise<{ gasLimit: number; gasPrice: string; estimatedCost: string }> {
    const gasLimits: { [key: string]: number } = {
      'mintCredits': 150000,
      'transferCredits': 80000,
      'retireCredits': 100000,
      'registerProject': 200000,
      'addPlantationRecord': 120000,
      'addMonitoringData': 100000
    };

    return {
      gasLimit: gasLimits[operation] || 100000,
      gasPrice: '20 gwei',
      estimatedCost: '₹' + (Math.random() * 10 + 5).toFixed(2)
    };
  }
}

// Demo data for blockchain records
export const demoBlockchainRecords = {
  plantationRecords: [
    {
      id: 'plant-001',
      projectId: 'proj-1',
      timestamp: '2025-09-25T10:30:00Z',
      location: { lat: 21.9497, lng: 88.7500, area: 5.2 },
      plantationData: {
        speciesPlanted: ['Rhizophora mucronata', 'Avicennia marina', 'Sonneratia apetala'],
        numberOfSeedlings: 2500,
        survivalRate: 85,
        plantationMethod: 'Direct seeding with community participation',
        soilConditions: 'Muddy tidal flats, pH 7.2',
        waterQuality: 'Saline, 28 ppt salinity'
      },
      evidenceData: {
        photographs: ['QmX1eVtZy9rQ3mP4nL8kJ6wT2cV5bN7x', 'QmY2fWuAz0sR4oQ5oM9lK7xU3dW6cO8y'],
        droneImagery: 'QmZ3gXvBy1tS5pR6pN0mL8yV4eX7dP9z',
        fieldNotes: 'Successful plantation during high tide. Community volunteers actively participated.',
        weatherConditions: 'Clear sky, 28°C, light breeze from southeast'
      },
      reportedBy: {
        organizationId: 'org-3',
        fieldOfficer: 'Rajesh Kumar',
        verifiedBy: 'Dr. Suresh Patel',
        verificationDate: '2025-09-26T14:20:00Z'
      },
      blockchainRecord: {
        transactionHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
        blockNumber: 45782156,
        timestamp: '2025-09-25T10:35:42Z',
        gasUsed: 125000
      }
    }
  ],
  monitoringRecords: [
    {
      id: 'monitor-001',
      projectId: 'proj-1',
      recordDate: '2025-09-20T08:00:00Z',
      measurements: {
        biomass: 45.2,
        carbonStock: 85.6,
        canopyCover: 72,
        speciesDiversity: 2.8,
        waterQuality: { ph: 7.8, salinity: 28, turbidity: 15 },
        soilHealth: { organicCarbon: 3.2, nitrogen: 0.8, phosphorus: 0.15 }
      },
      dataSource: {
        type: 'drone',
        deviceId: 'DJI-MATRICE-001',
        accuracy: 95,
        calibrationDate: '2025-09-01T00:00:00Z'
      },
      verification: {
        status: 'verified',
        verifiedBy: 'Quality Council of India',
        verificationNotes: 'Data quality excellent, measurements within expected range',
        confidenceScore: 96
      },
      immutableHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a'
    }
  ]
};

// Export singleton instance
export const blockchainService = new BlockchainService();

// Utility functions
export const formatTransactionHash = (hash: string): string => {
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
};

export const getExplorerUrl = (txHash: string): string => {
  return `https://mumbai.polygonscan.com/tx/${txHash}`;
};

export const calculateCarbonCredits = (
  area: number, 
  ecosystemType: 'mangrove' | 'seagrass' | 'saltmarsh',
  timeFrame: number
): number => {
  const sequestrationRates = {
    mangrove: 20, // tCO2/ha/year
    seagrass: 15, // tCO2/ha/year
    saltmarsh: 12  // tCO2/ha/year
  };
  
  return area * sequestrationRates[ecosystemType] * timeFrame;
};