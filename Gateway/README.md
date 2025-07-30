# Eureka Server

A service discovery server for the Village Portal microservices architecture.

## Overview

This Eureka Server provides service discovery for the microservices:
- **User-Service** (Port: 8080)
- **Complaint-Service** (Port: 8082)

## Technology Stack

- **Spring Boot 3.5.4**
- **Spring Cloud Netflix Eureka Server**
- **Java 24**

## Running the Eureka Server

### Prerequisites
- Java 24
- Maven

### Start the Server
```bash
cd Backend/Gateway
mvn spring-boot:run
```

The Eureka Server will start on **port 8761**.

## Accessing Eureka Dashboard

Once the server is running, you can access the Eureka dashboard at:
```
http://localhost:8761
```

## Service Registration

### User-Service Registration
- **Service Name:** User-service
- **Port:** 8080
- **URL:** http://localhost:8080

### Complaint-Service Registration
- **Service Name:** Complaint-service
- **Port:** 8082
- **URL:** http://localhost:8082

## Configuration

### application.properties
```properties
spring.application.name=Eureka-Server
server.port=8761

# Eureka Server Configuration
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
eureka.server.wait-time-in-ms-when-sync-empty=0

# Eureka Server UI Configuration
eureka.server.enable-self-preservation=false
eureka.instance.hostname=localhost
```

## Microservices Architecture

```
┌─────────────────┬─────────────────┐
│   User-Service  │ Complaint-Service│
│   (Port: 8080)  │  (Port: 8082)  │
└─────────────────┴─────────────────┘
         ↓                ↓
    Eureka Server (Port: 8761)
         ↓
    Frontend (Port: 5173)
```

## Testing

### 1. Start Eureka Server
```bash
cd Backend/Gateway
mvn spring-boot:run
```

### 2. Start User-Service
```bash
cd Backend/User-service
mvn spring-boot:run
```

### 3. Start Complaint-Service
```bash
cd Backend/Complaint-service
mvn spring-boot:run
```

### 4. Check Eureka Dashboard
Visit `http://localhost:8761` to see registered services.

## Service Discovery Benefits

1. **Automatic Registration:** Services automatically register with Eureka
2. **Health Monitoring:** Eureka monitors service health
3. **Load Balancing:** Can be used for load balancing
4. **Fault Tolerance:** Handles service failures gracefully

## Next Steps

After setting up Eureka Server:
1. **Test service registration**
2. **Connect frontend** to use service discovery
3. **Add API Gateway** for centralized routing
4. **Implement inter-service communication**

## Troubleshooting

### Service Not Registering
- Check if Eureka Server is running on port 8761
- Verify service configuration in application.properties
- Check network connectivity

### Dashboard Not Loading
- Ensure port 8761 is not blocked
- Check firewall settings
- Verify application is running

### Service Discovery Issues
- Check service URLs in Eureka dashboard
- Verify service health status
- Check service logs for errors 