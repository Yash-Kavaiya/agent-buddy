# Agents Buddy 🤖

A comprehensive platform for building, managing, and optimizing Dialogflow agents with AI-powered tools and enterprise-grade features.

![Agents Buddy](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop&crop=center)

## 🚀 Overview

Agents Buddy is a modern web application that empowers developers and businesses to create exceptional conversational AI experiences. With AI-powered generation tools, comprehensive analytics, and enterprise-grade features, it streamlines the entire Dialogflow development lifecycle.

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App] --> B[Component Library]
        A --> C[State Management]
        A --> D[Routing]
    end
    
    subgraph "Service Layer"
        E[Intent Generation] --> F[AI/ML Services]
        G[Entity Detection] --> F
        H[Playbook Generator] --> F
        I[Analytics Service] --> J[Data Processing]
    end
    
    subgraph "Backend Infrastructure"
        K[Supabase] --> L[PostgreSQL]
        K --> M[Authentication]
        K --> N[Real-time Subscriptions]
        K --> O[Storage]
    end
    
    subgraph "External Integrations"
        P[Dialogflow API]
        Q[Google Cloud AI]
        R[Webhook Endpoints]
        S[Third-party APIs]
    end
    
    A --> E
    A --> G
    A --> H
    A --> I
    E --> K
    G --> K
    H --> K
    I --> K
    
    F --> Q
    E --> P
    G --> P
    H --> P
    
    style A fill:#e1f5fe
    style K fill:#f3e5f5
    style F fill:#e8f5e8
```

## 🔄 User Workflow

```mermaid
journey
    title User Journey: Creating a Dialogflow Agent
    section Getting Started
      Sign up / Login: 5: User
      Choose plan: 4: User
      Access dashboard: 5: User
    section Agent Development
      Create new project: 4: User
      Generate intents: 5: User, AI
      Configure entities: 4: User
      Design flows: 4: User
      Set up webhooks: 3: User
    section Testing & Optimization
      Test conversations: 4: User
      Analyze performance: 5: User, System
      Optimize based on insights: 5: User, AI
    section Deployment
      Deploy to production: 4: User
      Monitor live performance: 5: User, System
      Continuous improvement: 5: User, AI
```

## ✨ Key Features

### 🎯 AI-Powered Generators

```mermaid
flowchart LR
    A[User Input] --> B{Intent Generator}
    B --> C[AI Processing]
    C --> D[Training Phrases]
    C --> E[Entity Extraction]
    C --> F[Response Generation]
    
    G[Text Input] --> H{Entity Detection}
    H --> I[Pattern Matching]
    H --> J[ML Recognition]
    H --> K[Smart Suggestions]
    
    L[User Requirements] --> M{Playbook Generator}
    M --> N[Step Generation]
    M --> O[Goal Definition]
    M --> P[Tool Integration]
    M --> Q[Performance Analysis]
    
    style B fill:#e3f2fd
    style H fill:#f3e5f5
    style M fill:#e8f5e8
```

### 📊 Analytics & Insights
- **Entity Analytics**: Track entity usage and performance metrics
- **Conversation Logs**: Monitor and analyze user interactions
- **Performance Monitoring**: Real-time metrics and optimization suggestions
- **A/B Testing**: Test different conversation variations

### 🛠️ Development Tools
- **Visual Flow Designer**: Drag-and-drop conversation flow creation
- **Testing Suite**: Comprehensive testing tools for agent validation
- **Debugger**: Advanced debugging with flow visualization
- **Version Control**: Git integration for collaborative development

### 🎓 Learning & Support
- **Template Library**: Pre-built templates for common use cases
- **Learning Paths**: Comprehensive training materials
- **Live Support**: Multi-channel support with screen sharing and remote control
- **Documentation**: Interactive guides and API explorer

### 🏢 Enterprise Features
- **Multi-environment Support**: Development, staging, and production environments
- **SSO Integration**: SAML/OAuth authentication
- **Advanced Security**: SOC2, HIPAA, PCI compliance
- **Custom Integrations**: Tailored solutions for enterprise needs
- **Dedicated Support**: 24/7 phone and chat support

## 📊 Database Schema

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string name
        timestamp created_at
        timestamp updated_at
    }
    
    INTENTS {
        uuid id PK
        uuid user_id FK
        string display_name
        text description
        string domain
        string language
        int phrase_count
        timestamp created_at
        timestamp updated_at
    }
    
    TRAINING_PHRASES {
        uuid id PK
        uuid intent_id FK
        text text
        float confidence
        timestamp created_at
    }
    
    PHRASE_ENTITIES {
        uuid id PK
        uuid phrase_id FK
        string entity_type
        string value
        int start_index
        int end_index
        timestamp created_at
    }
    
    ENTITIES {
        uuid id PK
        uuid user_id FK
        string name
        string display_name
        string entity_type
        string category
        text description
        timestamp created_at
        timestamp updated_at
    }
    
    ENTITY_SYNONYMS {
        uuid id PK
        uuid entity_id FK
        string synonym
        string language
        float confidence_score
        boolean auto_generated
        timestamp created_at
    }
    
    CONVERSATION_LOGS {
        uuid id PK
        uuid user_id FK
        text user_input
        json detected_entities
        json missing_entities
        json confidence_scores
        string language
        boolean processed
        timestamp created_at
    }
    
    ENTITY_ANALYTICS {
        uuid id PK
        uuid entity_id FK
        int usage_count
        float accuracy_score
        timestamp last_used_at
        date date_tracked
        json performance_data
        timestamp created_at
    }
    
    USERS ||--o{ INTENTS : creates
    USERS ||--o{ ENTITIES : manages
    USERS ||--o{ CONVERSATION_LOGS : generates
    INTENTS ||--o{ TRAINING_PHRASES : contains
    TRAINING_PHRASES ||--o{ PHRASE_ENTITIES : includes
    ENTITIES ||--o{ ENTITY_SYNONYMS : has
    ENTITIES ||--o{ ENTITY_ANALYTICS : tracks
```

## 🔄 Intent Generation Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React UI
    participant IG as Intent Generator
    participant AI as AI Service
    participant DB as Database
    
    U->>UI: Configure intent parameters
    UI->>IG: Submit generation request
    IG->>AI: Generate training phrases
    AI-->>IG: Return AI-generated phrases
    IG->>IG: Extract entities from phrases
    IG->>IG: Apply variations & complexity
    IG->>DB: Save intent & phrases
    DB-->>IG: Confirm save
    IG-->>UI: Return generated intent
    UI-->>U: Display results
    
    Note over AI: Uses domain-specific patterns<br/>and tone variations
    Note over IG: Validates and optimizes<br/>generated content
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **React Router** for navigation
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend & Database
- **Supabase** (PostgreSQL) for database
- **Supabase Auth** for authentication
- **Real-time subscriptions** for live updates

### Development Tools
- **Vite** for build tooling
- **ESLint** for code quality
- **TypeScript** for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/agents-buddy.git
   cd agents-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   ```bash
   # Run the SQL migrations in your Supabase dashboard
   # or use the Supabase CLI
   supabase db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── contact/         # Contact and support components
│   ├── entity-detection/# Entity management components
│   ├── intent-generator/# Intent generation tools
│   ├── live-support/    # Live support features
│   ├── playbook-generator/# Playbook creation tools
│   └── ui/             # Base UI components
├── pages/              # Page components
├── services/           # API and business logic
├── types/              # TypeScript type definitions
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── hooks/              # Custom React hooks
```

## 🎯 Usage Examples

### Generate Training Phrases
```typescript
import { generateIntent } from '@/services/intentGenerationService';

const config = {
  intentName: 'book.appointment',
  description: 'User wants to book a medical appointment',
  domain: 'healthcare',
  phraseCount: 15,
  includeEntities: true
};

const intent = await generateIntent(config);
```

### Detect Entities
```typescript
import { detectEntitiesInText } from '@/services/entityDetectionService';

const options = {
  language: 'en',
  minConfidence: 0.7,
  enableSmartSuggestions: true
};

const result = await detectEntitiesInText(userInput, options);
```

### Generate Playbook
```typescript
import { generatePlaybook } from '@/services/playbookGenerationService';

const config = {
  playbookName: 'Customer Support Assistant',
  description: 'Handle customer inquiries professionally',
  scenario: 'Customer contacts support with questions',
  domain: 'customer-support',
  complexity: 'moderate'
};

const playbook = await generatePlaybook(config);
```

## 🔄 Entity Detection Flow

```mermaid
graph TD
    A[User Input Text] --> B{Language Detection}
    B --> C[Preprocessing]
    C --> D[Pattern Matching]
    C --> E[ML Entity Recognition]
    C --> F[Custom Entity Lookup]
    
    D --> G[System Entities]
    E --> H[AI Detected Entities]
    F --> I[Custom Entities]
    
    G --> J[Entity Validation]
    H --> J
    I --> J
    
    J --> K{Confidence Check}
    K -->|High Confidence| L[Confirmed Entities]
    K -->|Low Confidence| M[Smart Suggestions]
    
    L --> N[Save to Database]
    M --> O[User Review]
    O --> P{User Approval}
    P -->|Approved| N
    P -->|Rejected| Q[Update Model]
    
    N --> R[Analytics Update]
    Q --> R
    
    style A fill:#e3f2fd
    style J fill:#fff3e0
    style N fill:#e8f5e8
```

## 💼 Pricing Plans

| Feature | Free | Developer ($29/mo) | Team ($99/mo) | Enterprise |
|---------|------|-------------------|---------------|------------|
| Intent Generations | 1,000 | 25,000 | 100,000 | Unlimited |
| Entity Extractions | 500 | 15,000 | 75,000 | Unlimited |
| Team Members | 1 | 1 | 10 | Unlimited |
| Support | Community | Email | Priority | 24/7 Phone |
| Advanced Features | ❌ | ✅ | ✅ | ✅ |

## 🔄 Support Channel Flow

```mermaid
graph TB
    A[User Issue] --> B{Issue Type}
    B -->|General Question| C[Community Forum]
    B -->|Technical Issue| D[Email Support]
    B -->|Urgent/Complex| E[Live Chat]
    B -->|Critical/Enterprise| F[Phone Support]
    
    C --> G[Community Response]
    D --> H[Support Ticket]
    E --> I[Real-time Chat]
    F --> J[Immediate Phone Call]
    
    H --> K{Escalation Needed?}
    I --> K
    K -->|Yes| L[Technical Specialist]
    K -->|No| M[Resolution]
    
    L --> N[Engineering Team]
    N --> O[Product Team]
    O --> M
    
    G --> P[Issue Resolved]
    M --> P
    J --> P
    
    style A fill:#ffebee
    style P fill:#e8f5e8
    style F fill:#fff3e0
```

## 🛡️ Security & Compliance

- **SOC2 Type II** certified
- **GDPR & CCPA** compliant
- **End-to-end encryption** for data in transit and at rest
- **Regional data residency** options
- **SSO integration** with SAML/OAuth
- **Audit logging** for enterprise customers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

```mermaid
gitgraph
    commit id: "Initial"
    branch develop
    commit id: "Feature A"
    commit id: "Feature B"
    branch feature/new-feature
    commit id: "Work in progress"
    commit id: "Feature complete"
    checkout develop
    merge feature/new-feature
    commit id: "Integration tests"
    checkout main
    merge develop tag: "v1.0.0"
```

### Code Quality

- Run `npm run lint` to check code style
- Run `npm run type-check` to verify TypeScript types
- Follow the existing code conventions
- Write tests for new features

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Component Library](docs/components.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🗺️ Roadmap

```mermaid
timeline
    title Product Roadmap
    
    section Q1 2024
        Advanced A/B testing framework : Multi-variant testing
                                      : Performance comparison
        Multi-language entity detection : 125+ language support
                                       : Regional customization
        Enhanced analytics dashboard : Real-time metrics
                                    : Custom reporting
        Mobile app for iOS and Android : Cross-platform support
                                      : Offline capabilities
    
    section Q2 2024
        Voice conversation testing : Speech recognition
                                  : Voice synthesis
        Advanced webhook debugging : Real-time monitoring
                                 : Error tracking
        Custom ML model integration : Model marketplace
                                   : Training pipelines
        White-label solutions : Custom branding
                             : Domain configuration
    
    section Q3 2024
        Enterprise SSO enhancements : Advanced RBAC
                                   : Multi-tenant support
        Advanced compliance features : Audit trails
                                    : Data governance
        Custom deployment options : On-premise
                                  : Private cloud
        Advanced API rate limiting : Usage analytics
                                  : Dynamic scaling
```

## 🆘 Support

### Community Support
- [Discord Community](https://discord.gg/agents-buddy)
- [GitHub Discussions](https://github.com/your-org/agents-buddy/discussions)
- [Documentation](https://docs.agents-buddy.com)

### Professional Support
- Email: support@agents-buddy.com
- Enterprise customers: Get 24/7 phone support
- Response times: 15 minutes (Critical) to 24 hours (Low)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Database and auth powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosting on [Vercel](https://vercel.com/)

---

<div align="center">
  <strong>Made with ❤️ by the Agents Buddy team</strong>
  <br />
  <a href="https://agents-buddy.com">Website</a> •
  <a href="https://docs.agents-buddy.com">Documentation</a> •
  <a href="https://agents-buddy.com/contact">Contact</a>
</div>
