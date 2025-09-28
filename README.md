# EcoSangam - Blockchain-Powered Blue Carbon MRV Platform

A revolutionary **blockchain-based** Monitoring, Reporting, and Verification (MRV) system for India's blue carbon ecosystem restoration projects. This decentralized platform ensures transparency, accuracy, and immutable carbon credit generation through advanced blockchain technology.

## 🚀 **Blockchain-Powered Solution**

**Problem Statement:** Blue carbon ecosystem restoration is gaining importance in India's climate strategy. However, there is no decentralized, verifiable MRV system that ensures transparency, accuracy, and carbon credit generation.

**Our Blockchain Solution:** A comprehensive blockchain registry where:
- ✅ **Verified plantation and restoration data are immutably stored** on blockchain
- ✅ **Carbon credits are tokenized using smart contracts** for transparent trading
- ✅ **NGOs, communities, and coastal panchayats can be onboarded** through blockchain verification
- ✅ **Field data is integrated from apps and drones** with blockchain-verified authenticity

This blockchain-powered platform addresses India's critical need for transparent, decentralized blue carbon monitoring through cutting-edge blockchain technology.

## � **Core Blockchain Features**

### **🔗 Blockchain Infrastructure**
- **Immutable Data Storage**: All plantation and restoration data permanently stored on blockchain
- **Smart Contract Integration**: Automated tokenized carbon credit generation and management
- **Decentralized Verification**: Transparent and tamper-proof verification processes
- **Blockchain-based Transactions**: Secure carbon credit trading through smart contracts

### **💰 Tokenized Carbon Credits**
- **ERC-20 Compatible Tokens**: Standard blockchain tokens for carbon credits
- **Smart Contract Automation**: Automatic credit minting upon verification
- **Blockchain Traceability**: Complete transaction history on blockchain
- **Immutable Ownership**: Blockchain-secured carbon credit ownership

### **📱 Mobile Blockchain Interface**
- **Field Data Collection**: Mobile app for real-time blockchain data uploads
- **GPS Integration**: Blockchain-verified location data with coordinates
- **Offline Capability**: Queue blockchain transactions for later synchronization
- **Photo Evidence**: IPFS-linked images stored on blockchain

### **🛰️ Drone Integration**
- **Aerial Monitoring**: Drone imagery automatically processed and stored on blockchain
- **AI Analysis**: Machine learning results immutably recorded on blockchain
- **Change Detection**: Blockchain-verified temporal analysis of restoration progress
- **Automated Verification**: Smart contract-triggered drone monitoring schedules

### **🏛️ NCCR Admin Tools**
- **National Oversight**: Blockchain-powered compliance monitoring for NCCR
- **Real-time Analytics**: Blockchain data aggregation and reporting
- **Stakeholder Management**: Blockchain-verified organization registration
- **Compliance Tracking**: Immutable audit trails on blockchain

## ✨ **Additional Platform Features**

- **Interactive Google Maps**: Satellite imagery with blockchain-verified project locations
- **Role-Based Access**: Secure authentication for different stakeholder types
- **Real-time Dashboard**: Live blockchain data visualization and monitoring
- **Verification Workflows**: Multi-stage blockchain-based verification processes
- **Carbon Marketplace**: Blockchain-powered trading of tokenized carbon credits

## How can I edit this code?

**Use your preferred IDE**

You can clone this repo and start developing locally.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up Google Maps API (Required for map functionality)
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your Google Maps API key:
# VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
# Get your API key from: https://console.cloud.google.com/apis/credentials

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🚀 Google Maps Setup

1. **Get a Google Maps API Key:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials (API Key)
   - Optionally restrict the API key to your domain

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   
3. **Add your API key to `.env.local`:**
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

## �️ **Blockchain Architecture**

### **Smart Contract Layer**
- **Carbon Credit Token Contract**: ERC-20 tokenization of verified carbon credits
- **Project Registry Contract**: Immutable project registration and management
- **Verification Contract**: Automated verification workflows and approvals
- **Stakeholder Registry**: Blockchain-based organization verification and onboarding

### **Blockchain Network**
- **Test Network**: Polygon Mumbai for development and testing
- **Gas Optimization**: Efficient smart contract design for minimal transaction costs
- **IPFS Integration**: Decentralized storage for images and documents
- **Oracle Integration**: Real-world data feeds into blockchain contracts

### **Data Integrity**
- **Immutable Records**: All restoration data permanently stored on blockchain
- **Cryptographic Hashing**: Tamper-proof data verification using blockchain hashes
- **Multi-signature Validation**: Enhanced security through blockchain multi-sig wallets
- **Audit Trails**: Complete blockchain transaction history for compliance

## 🇮🇳 **India's Blue Carbon Blockchain Registry**

This blockchain platform specifically targets India's coastal restoration needs:

### **Blockchain-Verified Ecosystems:**
- **Sundarbans Delta** (West Bengal) - Blockchain-monitored mangrove restoration
- **Gulf of Mannar** (Tamil Nadu) - Smart contract-verified seagrass conservation
- **Chilika Lake** (Odisha) - Blockchain-tracked lagoon restoration projects
- **Bhitarkanika** (Odisha) - Immutable mangrove ecosystem monitoring
- **Pulicat Lake** (Tamil Nadu/Andhra Pradesh) - Blockchain-secured saltwater restoration
- **Pichavaram** (Tamil Nadu) - Smart contract-managed waterway conservation

### **Blockchain Stakeholder Onboarding:**
- **NGOs**: Blockchain-verified environmental organizations
- **Coastal Panchayats**: Community-level blockchain participation
- **Government Agencies**: Institutional blockchain integration
- **Private Sector**: Corporate blockchain-based carbon offsetting
- **Research Institutions**: Academic blockchain data access and contribution

### **Localized Blockchain Features:**
- **Rupee-denominated Smart Contracts**: Carbon credits priced in ₹ on blockchain
- **Regional Compliance**: Blockchain adherence to Indian environmental regulations
- **Multi-language Support**: Blockchain interface in local Indian languages
- **Government Integration**: Direct blockchain connectivity with NCCR systems

## 🛠️ **Blockchain Technology Stack**

### **Blockchain & Smart Contracts**
- **Blockchain Network**: Polygon (MATIC) for scalable and cost-effective transactions
- **Smart Contract Language**: Solidity for tokenized carbon credit contracts
- **Web3 Integration**: Ethereum-compatible blockchain interactions
- **IPFS Storage**: Decentralized file storage for blockchain-linked evidence
- **Blockchain SDK**: Custom TypeScript interfaces for smart contract interaction

### **Frontend & User Interface**
- **Frontend Framework**: React 18.3.1 with TypeScript for blockchain UI
- **Build Tool**: Vite 5.4.19 optimized for blockchain application development
- **UI Components**: shadcn/ui + Radix UI for professional blockchain interface
- **Styling**: Tailwind CSS with custom blockchain-themed design
- **Blockchain Wallet Integration**: MetaMask and WalletConnect support

### **Data & Integration**
- **Maps Integration**: Google Maps JavaScript API for blockchain-verified locations
- **Routing**: React Router DOM with blockchain-specific route protection
- **Forms**: React Hook Form with Zod validation for blockchain data entry
- **Charts**: Recharts for blockchain analytics and carbon credit visualization
- **State Management**: React Context API enhanced with blockchain state management

### **Blockchain Services**
- **Smart Contract Service**: Custom TypeScript service for blockchain interactions
- **Drone Integration Service**: Blockchain-connected aerial monitoring system
- **Mobile Data Collection**: Offline-capable blockchain transaction queuing
- **MRV Verification Service**: Automated blockchain-based verification workflows

## � **Blockchain Platform Access**

### **Blockchain Components**
Once the platform is running, access these blockchain-powered features:

- **`/dashboard`** - Main blockchain analytics and project overview
- **`/field-data`** - Mobile blockchain data collection interface
- **`/mrv-verification`** - Comprehensive blockchain MRV verification system
- **`/nccr-admin`** - National blockchain oversight and administration tools
- **`/projects`** - Blockchain-verified project management and tracking
- **`/marketplace`** - Trade tokenized carbon credits on blockchain

### **Blockchain User Roles**
- **Admin**: Full blockchain system access and smart contract management
- **NGO**: Blockchain project creation and carbon credit earning
- **Government**: Blockchain compliance monitoring and national oversight  
- **Panchayat**: Community-level blockchain participation and verification
- **Verifier**: Blockchain-based verification and quality assessment

## �🎯 **Blockchain Platform Usage**

### **For NGOs and Communities**
1. **Blockchain Registration**: Register organization on blockchain through verification process
2. **Project Creation**: Create restoration projects with blockchain-immutable data
3. **Mobile Data Upload**: Use mobile app to upload field data directly to blockchain
4. **Carbon Credit Earning**: Automatically receive tokenized credits via smart contracts

### **For Government (NCCR)**
1. **Admin Dashboard**: Access blockchain-powered national oversight tools
2. **Compliance Monitoring**: Real-time blockchain-based compliance tracking
3. **Verification Management**: Approve and verify projects through blockchain workflows
4. **National Analytics**: View aggregated blockchain data across all projects

### **For Verifiers**
1. **MRV Dashboard**: Access blockchain verification queue and tools
2. **Evidence Review**: Examine blockchain-stored proof and documentation
3. **Smart Contract Triggers**: Approve verifications that automatically mint carbon tokens
4. **Quality Assessment**: Rate data quality with blockchain-recorded scores

## 🚀 **Blockchain Platform Deployment**

### **Development Deployment**
```bash
# Clone the blockchain MRV platform
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install blockchain dependencies
npm install

# Configure blockchain environment
cp .env.example .env.local
# Add your blockchain network configuration:
# VITE_BLOCKCHAIN_NETWORK=polygon-mumbai
# VITE_SMART_CONTRACT_ADDRESS=0x...
# VITE_GOOGLE_MAPS_API_KEY=your_api_key

# Start blockchain development server
npm run dev
```

### **Production Blockchain Deployment**
```bash
# Build blockchain application
npm run build

# Deploy to blockchain-compatible hosting
# Supports: Vercel, Netlify, AWS, Azure
# Ensure environment variables include blockchain configuration
```

### **Smart Contract Deployment**
```bash
# Deploy smart contracts to blockchain network
npm run deploy:contracts

# Verify contracts on blockchain explorer
npm run verify:contracts

# Configure blockchain network in application
npm run configure:blockchain
```

## 📊 **Blockchain Platform Statistics**

- **🔗 Smart Contracts**: 4+ deployed contracts for complete MRV system
- **📱 Mobile Interface**: Offline-capable blockchain transaction support  
- **🛰️ Drone Integration**: Automated blockchain data recording from aerial monitoring
- **🏛️ Admin Tools**: Comprehensive NCCR blockchain oversight capabilities
- **💰 Token Economy**: ERC-20 carbon credit tokenization system
- **🔒 Security**: Multi-signature blockchain wallets and encrypted data storage
- **🌐 Decentralization**: Fully decentralized verification and carbon credit registry
- **📈 Scalability**: Polygon blockchain for high-throughput, low-cost transactions

## 🌍 **Blockchain Impact & Future**

### **Environmental Impact Through Blockchain**
- **Transparency**: Blockchain ensures complete transparency in restoration projects
- **Accountability**: Immutable blockchain records prevent fraud and greenwashing
- **Efficiency**: Smart contracts automate verification and reduce administrative costs
- **Scalability**: Blockchain technology enables national-scale MRV implementation

### **Blockchain Innovation in Climate Action**
- **First-of-its-kind**: India's pioneering blockchain-based blue carbon MRV system
- **Global Standard**: Blockchain architecture designed for international replication
- **Technology Leadership**: Demonstrates India's blockchain innovation in climate solutions
- **Sustainable Development**: Blockchain-powered approach to UN SDG achievement

### **Future Blockchain Enhancements**
- **Cross-chain Integration**: Multi-blockchain support for global carbon markets
- **AI-Blockchain Fusion**: Enhanced automation through AI-powered smart contracts
- **IoT Blockchain Sensors**: Real-time environmental data streaming to blockchain
- **Global Blockchain Network**: International blue carbon blockchain consortium

---

**🚀 Ready to revolutionize blue carbon restoration with blockchain technology? Start building the future of decentralized environmental monitoring today!**
