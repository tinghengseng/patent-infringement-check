# Patent Infringement Checker Application
## Documentation

### Overview
The Patent Infringement Checker Application is a dockerized web application that helps users check for potential patent infringements. The application consists of a React frontend and a Flask backend, orchestrated using Docker containers.

### System Architecture
- **Frontend**: React.js (running on port 3000)
- **Backend**: Flask (Python) (running on port 5001)
- **Containerization**: Docker
- **API Integration**: OpenAI API

### Prerequisites
- Docker Desktop
- OpenAI API Key
- Git
- Web Browser
- Internet Connection

### Installation and Setup

#### 1. System Requirements
- Operating System: Windows/MacOS/Linux
- Minimum RAM: 4GB (recommended 8GB)
- Disk Space: At least 2GB free space

#### 2. Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/tinghengseng/patent-infringement-check.git
   cd patent-infringement-check
   ```

2. **Configure Environment Variables**
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key
     ```

3. **Build and Run with Docker**
   ```bash
   docker-compose up --build
   ```

### Usage Guide

#### Accessing the Application
- Frontend Interface: `http://localhost:3000`
- Backend API: `http://localhost:5001`

#### Basic Operations
1. Start the application
2. Access the frontend interface

### API Documentation

#### Backend Endpoints

- `POST /check`: Patent infringement check endpoint
  - Request body: json
{
"patentID": "US12345678",
"companyName": "Example Company Inc."
}
  - Response: 
 json
{
"product": "Product Name 2",
"reason": "Analysis for second product, including:\n- Technical similarities\n- Relevant patent claims\n- Potential infringement points"
}

### Docker Configuration
The application uses Docker Compose to manage multiple containers:
- Frontend Container
  - Node.js environment
  - React application
- Backend Container
  - Python environment
  - Flask server

### Troubleshooting

#### Common Issues and Solutions
1. **Docker Daemon Not Running**
   - Solution: Start Docker Desktop
   - Verify Docker is running with `docker --version`

2. **API Key Issues**
   - Verify `.env` file exists
   - Check API key format
   - Ensure API key is valid

3. **Port Conflicts**
   - Check if ports 3000 or 5001 are already in use
   - Stop conflicting services or modify port mappings

### Maintenance

#### Stopping the Application
