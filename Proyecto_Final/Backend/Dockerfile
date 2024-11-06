# Etapa de construcción
FROM maven:3.8.5-openjdk-11 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=build /app/target/banco-backend-1.0.0.war app.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.war"]