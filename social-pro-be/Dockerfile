##### Dockerfile #####
# Stage 1: Build the application
FROM maven:3.9.8-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy only the necessary files for building
COPY pom.xml .
COPY src ./src

# Build the application and skip tests
RUN mvn clean install -DskipTests

# Stage 2: Create the final runtime image
FROM eclipse-temurin:21-jre-alpine

# Set timezone (optional, adjust as needed)
RUN apk add --no-cache tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

# Set non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Set working directory
WORKDIR /app

# Expose the application port
EXPOSE 8080

# Configure JVM options (can be overridden via environment variables)
ENV JAVA_OPTS="-Xmx2048m -Xms256m"

# Run the application
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]