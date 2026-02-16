// Start the Docker 
docker start java-mongo


//Start the Backend Server
mvn spring-boot:run


//Shell Access
mongosh mongodb://localhost:27018/authdb