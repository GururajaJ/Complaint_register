# Complaint Service

A microservice for managing complaints in the Village Portal system.

## Overview

This service handles all complaint-related operations including:
- Creating new complaints
- Retrieving complaints by user
- Updating complaint status
- Searching and filtering complaints
- Complaint statistics

## Technology Stack

- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **PostgreSQL**
- **Spring Security**
- **Java 24**

## Database Setup

### 1. Create Database
```sql
CREATE DATABASE Complaint_DB;
```

### 2. Run Setup Script
```bash
psql -U postgres -d Complaint_DB -f database_setup.sql
```

### 3. Database Configuration
The service uses port **5433** for its database:
- **Database:** Complaint_DB
- **Port:** 5433
- **Username:** postgres
- **Password:** Guru@123

## Running the Service

### Prerequisites
- Java 24
- PostgreSQL running on port 5433
- Maven

### Start the Service
```bash
cd Backend/Complaint-service
mvn spring-boot:run
```

The service will start on **port 8082**.

## API Endpoints

### Base URL
```
http://localhost:8082/api/complaints
```

### Endpoints

#### Create Complaint
```
POST /api/complaints
Content-Type: application/json

{
  "title": "Water Supply Issues",
  "description": "No water supply for 2 days",
  "category": "water",
  "priority": "high",
  "userId": 1,
  "location": "{\"address\": \"Main Street\", \"lat\": 28.6139, \"lng\": 77.2090}"
}
```

#### Get All Complaints (Admin)
```
GET /api/complaints
GET /api/complaints?status=pending&category=water&priority=high
```

#### Get Complaints by User
```
GET /api/complaints/user/{userId}
```

#### Get Complaint by ID
```
GET /api/complaints/{id}
```

#### Update Complaint Status
```
PUT /api/complaints/{id}/status
Content-Type: application/json

{
  "status": "in_progress"
}
```

#### Update Complaint
```
PUT /api/complaints/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "category": "electricity",
  "priority": "medium",
  "status": "resolved"
}
```

#### Delete Complaint
```
DELETE /api/complaints/{id}
```

#### Get Complaints by Status
```
GET /api/complaints/status/{status}
```

#### Get Complaints by Category
```
GET /api/complaints/category/{category}
```

#### Get Complaints by Priority
```
GET /api/complaints/priority/{priority}
```

#### Search Complaints
```
GET /api/complaints/user/{userId}/search?searchTerm=water
```

#### Get Complaint Statistics
```
GET /api/complaints/user/{userId}/stats
```

## Data Model

### Complaint Entity
```java
{
  "id": 1,
  "title": "Water Supply Issues",
  "description": "No water supply for 2 days",
  "category": "water",
  "priority": "high",
  "status": "pending",
  "userId": 1,
  "location": "{\"address\": \"Main Street\", \"lat\": 28.6139, \"lng\": 77.2090}",
  "photos": ["url1", "url2"],
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

## Status Values
- `pending` - Complaint submitted, waiting for review
- `in_progress` - Work has started on the complaint
- `resolved` - Complaint has been resolved
- `rejected` - Complaint has been rejected

## Priority Values
- `low` - Low priority issue
- `medium` - Medium priority issue
- `high` - High priority issue

## Category Values
- `infrastructure` - Road, building, etc.
- `water` - Water supply, drainage
- `electricity` - Power, street lights
- `public-services` - Garbage collection, etc.

## Microservices Architecture

This service is part of a microservices architecture:

```
Frontend (React) → API Gateway → Complaint Service (Port 8082)
                                    ↓
                              PostgreSQL (Port 5433)
```

## Integration with Other Services

- **User Service** (Port 8080): For user authentication and user data
- **Admin Service** (Port 8081): For admin operations
- **Frontend** (Port 5173): React application

## Testing

### Test the Service
```bash
# Test if service is running
curl http://localhost:8082/api/complaints

# Create a test complaint
curl -X POST http://localhost:8082/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Complaint",
    "description": "This is a test complaint",
    "category": "infrastructure",
    "priority": "medium",
    "userId": 1
  }'
```

## Error Handling

The service returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a message:
```json
{
  "error": "Complaint not found with id: 999"
}
``` 