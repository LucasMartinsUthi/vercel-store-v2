# GitLab Project Store V2

A modern Next.js application for GitLab data analysis and visualization, providing interactive dashboards for projects, groups, and users.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MUI](https://img.shields.io/badge/Material--UI-7.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-teal)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Technologies](#technologies)

## Overview

GitLab Project Analytics is a web application that provides comprehensive analytics and visualizations for GitLab instances. The application offers interactive dashboards for monitoring projects, groups, development activities, and performance metrics.

### Key Features

- **Analytics Dashboard**: Global overview with key metrics and trends
- **Project Management**: Detailed analysis of individual projects
- **Group Management**: Group monitoring and activity tracking
- **User Analytics**: Contributor and member statistics
- **Responsive Interface**: Adaptive design for different devices
- **Secure Authentication**: Keycloak integration via NextAuth
- **Customizable Theme**: Dark and light mode support

## Features

### Main Dashboard

- Global metrics (projects, groups, users, commits)
- Monthly activity charts
- Trend analysis and growth tracking
- Issue resolution rate
- Development summary

### Project Management

- **Project List**: Responsive grid with pagination and search
- **Project Details**:
  - Basic information and metrics
  - Temporal statistics charts
  - Member management
  - Configurable date filters

### Group Management

- **Group List**: Organized view with informative cards
- **Group Details**:
  - Performance metrics
  - Recent activities
  - Pipeline analysis
  - Member management

### User Analytics

- Contributor analysis per project
- Role distribution
- Top collaborator activity
- Engagement metrics

## Architecture

### Frontend Architecture

```any
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   React Query   │    │   Material-UI   │
│   (App Router)  │◄──►│    (Cache)      │◄──►│   Components    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   NextAuth.js   │    │   Axios HTTP    │    │   TailwindCSS   │
│ (Authentication)│    │     Client      │    │    (Styling)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Structure

```any
src/
├── app/                     # App Router (Next.js 13+)
│   ├── api/                 # API Routes
│   ├── components/          # Page-specific components
│   ├── dashboard.tsx        # Main dashboard
│   ├── projects/           # Project routes
│   ├── groups/             # Group routes
│   └── layout.tsx          # Main layout
├── components/             # Reusable components
├── hooks/                  # Custom hooks
├── lib/                    # Libraries and utilities
├── dtos/                   # Data Transfer Objects
├── config/                 # Configurations
└── utils/                  # Utility functions
```

### Data Flow

```any
GitLab API ──► BFF Service ──► Next.js App ──► React Query ──► Components
     │              │              │              │              │
     └─ Auth ◄──────┴─ JWT ◄───────┴─ Session ◄───┴─ Context ◄───┘
```

## Prerequisites

- **Node.js**: version 20 or higher
- **npm**: version 9 or higher
- **Docker**: for containerization
- **Keycloak**: for authentication
- **AWS CLI**: for deployment (optional)
- **kubectl**: for Kubernetes management (optional)

## Local Setup

### 1. Clone Repository

```bash
git clone https://gitlab.com/nalej/gitlab-project-store-v2.git
cd gitlab-project-store-v2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Keycloak Configuration

#### Run Keycloak Locally

```bash
docker run --name keycloak_server -p 8180:8180 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=password \
  quay.io/keycloak/keycloak:21.1.1 \
  start-dev \
  --http-port=8180
```

#### Configure Keycloak Client

1. Access [http://localhost:8180](http://localhost:8180)
2. Login with `admin` / `password`
3. Create a new client:
   - **Client ID**: `store`
   - **Client authentication**: ✅
   - **Valid redirect URIs**: `*`

#### Configure Token Audience

1. Navigate to **Clients** → `store` → **Client Scopes**
2. Select `store-dedicated` → **Add mapper** → **By configuration**
3. Add an **Audience Mapper**:
   - **Mapper Type**: `Audience`
   - **Name**: `aud-store`
   - **Included Client Audience**: `store`

#### Get Client Secret

1. Go to **Clients** → `store` → **Credentials**
2. Copy the **Client Secret**

### 4. Environment Configuration

Create `.env.local` file in the project root:

```bash
# Keycloak Configuration
KEYCLOAK_CLIENT_ID=store
KEYCLOAK_ISSUER=http://localhost:8180/realms/master
KEYCLOAK_CLIENT_SECRET=your-client-secret-here

# NextAuth Configuration
AUTH_SECRET=your-auth-secret-here
NEXTAUTH_URL=http://localhost:3000

# API Configuration
API_BASE_URL=http://localhost:8080

# Auth Timeout (optional)
AUTH_TIMEOUT=30000
```

#### Generate Auth Secret

```bash
npx next-auth secret
```

### 5. Run Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Local Docker Deployment

#### 1. Build Image

```bash
docker build -t gitlab-project-store-v2:latest .
```

#### 2. Run Container

```bash
docker run -p 3000:3000 \
  -e KEYCLOAK_CLIENT_ID=store \
  -e KEYCLOAK_CLIENT_SECRET=your-secret \
  -e KEYCLOAK_ISSUER=http://localhost:8180/realms/master \
  -e AUTH_SECRET=your-auth-secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  gitlab-project-store-v2:latest
```

### Kubernetes Deployment

#### 1. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Application Configuration
APP_NAME=gitlab-project-store-v2
IMAGE_TAG=latest
NAMESPACE=default
BFF_APP_NAME=gitlab-bff
DOMAIN_NAME=example.com

# AWS Configuration
ECR_REGISTRY=123456789012.dkr.ecr.us-east-1.amazonaws.com
AWS_PROFILE=default
AWS_REGION=us-east-1
CLUSTER_NAME=my-eks-cluster
HOSTED_ZONE_ID=Z123456789

# Keycloak Configuration
KEYCLOAK_CLIENT_ID=store
KEYCLOAK_CLIENT_SECRET=your-secret
KEYCLOAK_ISSUER=https://auth.example.com/realms/master
AUTH_SECRET=your-auth-secret
NEXTAUTH_URL=https://gitlab-project-store-v2.example.com
AUTH_TIMEOUT=30000
```

#### 2. Full Deployment

```bash
# Validate environment
make validate-environment

# Complete deployment (build, push, deploy, cname)
make all
```

#### 3. Step-by-Step Deployment

```bash
# 1. Build Docker image
make image

# 2. Push to ECR
make push

# 3. Update kubeconfig
make kubeconfig

# 4. Deploy to Kubernetes
make deploy

# 5. Configure CNAME in Route53
make cname
```

#### 4. Verify Deployment

```bash
# Check pods
kubectl get pods -n $NAMESPACE

# Check services
kubectl get svc -n $NAMESPACE

# Check ingress
kubectl get ingress -n $NAMESPACE

# Application logs
kubectl logs -f deployment/$APP_NAME -n $NAMESPACE
```

### Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2023-12-07T10:30:00.000Z",
  "uptime": 3600.123,
  "environment": "production"
}
```

## Project Structure

```any
gitlab-project-store-v2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/[...nextauth]/   # NextAuth endpoints
│   │   │   └── health/               # Health check
│   │   ├── components/               # Page components
│   │   ├── dashboard.tsx             # Main dashboard
│   │   ├── projects/                 # Project routes
│   │   │   ├── [id]/                 # Project details
│   │   │   │   └── users/            # Project users
│   │   │   └── page.tsx              # Project list
│   │   ├── groups/                   # Group routes
│   │   │   ├── [id]/                 # Group details
│   │   │   └── page.tsx              # Group list
│   │   ├── layout.tsx                # Main layout
│   │   └── page.tsx                  # Home page
│   ├── components/                   # Reusable components
│   │   ├── AuthGuard.tsx             # Route protection
│   │   ├── Sidebar.tsx               # Side menu
│   │   ├── TopBar.tsx                # Top bar
│   │   └── ...                       # Other components
│   ├── hooks/                        # Custom hooks
│   │   ├── analytics/                # Analytics hooks
│   │   ├── projects/                 # Project hooks
│   │   ├── groups/                   # Group hooks
│   │   └── users/                    # User hooks
│   ├── lib/                          # Libraries
│   │   ├── auth.ts                   # NextAuth configuration
│   │   ├── analytics/                # Analytics services
│   │   ├── projects/                 # Project services
│   │   └── groups/                   # Group services
│   ├── dtos/                         # Data Transfer Objects
│   ├── config/                       # Configurations
│   │   ├── axios.ts                  # HTTP client
│   │   └── queryClient.ts            # React Query
│   ├── context/                      # React Contexts
│   │   └── theme.tsx                 # Theme context
│   └── utils/                        # Utilities
│       ├── constants/                # Constants
│       ├── functions/                # Helper functions
│       └── types/                    # TypeScript types
├── deployments/                      # Kubernetes manifests
│   ├── deployment.yaml               # Deployment
│   ├── service.yaml                  # Service
│   ├── ingress.yaml                  # Ingress
│   └── cname.json                    # Route53 CNAME
├── public/                           # Static assets
├── Dockerfile                        # Containerization
├── Makefile                          # Deployment automation
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # TailwindCSS config
├── next.config.ts                    # Next.js config
└── README.md                         # This documentation
```

## API Endpoints

### Authentication

- `GET|POST /api/auth/[...nextauth]` - NextAuth endpoints

### Health Check Endpoint

- `GET /api/health` - Application status

### Main Pages

- `/` - Main dashboard
- `/projects` - Project list
- `/projects/[id]` - Project details
- `/projects/[id]/users` - Project users
- `/groups` - Group list
- `/groups/[id]` - Group details

## Available Scripts

```bash
# Development
npm run dev          # Start in development mode
npm run build        # Build for production
npm start           # Start production application

# Code Quality
npm run lint         # Run ESLint
npm run format      # Format code with Prettier

# Deployment (via Makefile)
make help           # List available commands
make all            # Complete deployment
make image          # Build Docker image
make push           # Push to ECR
make deploy         # Deploy to Kubernetes
make cname          # Configure CNAME
```

## Technologies

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Static typing
- **Material-UI 7.2.0** - UI components
- **TailwindCSS 4.1.10** - CSS framework
- **React Query 5.81.2** - Server state management

### Authentication Tools

- **NextAuth.js 4.24.11** - Authentication
- **Keycloak** - Identity provider

### HTTP & APIs

- **Axios 1.10.0** - HTTP client
- **Moment.js 2.30.1** - Date manipulation

### Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

### Infrastructure

- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **AWS ECR** - Image registry
- **AWS EKS** - Managed Kubernetes
- **AWS Route53** - DNS
- **Nginx Ingress** - Load balancer
- **Let's Encrypt** - SSL certificates

## Security

- **OAuth2/OIDC Authentication** via Keycloak
- **JWT Tokens** with automatic refresh
- **HTTPS** mandatory in production
- **SSL Certificates** via Let's Encrypt
- **Non-privileged container** in Docker
- **Health checks** for monitoring
