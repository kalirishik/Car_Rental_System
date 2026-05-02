-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: car_rental
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `car_id` bigint DEFAULT NULL,
  `car_name` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,2,'Toyota Innova','2026-05-04','2026-05-03','PENDING','kali@gmail.com'),(2,2,'Toyota Innova','2026-05-04','2026-05-03','REJECTED','kali@gmail.com'),(3,10,'Tata Punch','2026-05-05','2026-05-02','APPROVED','surjith@gmail.com');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available` tinyint(1) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price_per_day` double DEFAULT NULL,
  `seats` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,0,'Hyundai','Petrol','https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80','Hyundai Creta',2500,5),(2,1,'Toyota','Diesel','https://imgd.aeplcdn.com/642x336/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-3.png?isig=0&q=80','Toyota Innova',3500,7),(3,1,'Mahindra','Diesel','https://offers.caimahindra.com/uploads/product/Thar%20Aqua%20Marine.png','Mahindra Thar',4000,4),(4,1,'Honda','Petrol','https://imgd.aeplcdn.com/1920x1080/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.png?isig=0&q=80&q=80','Honda City',2200,5),(5,1,'Kia','Petrol','https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80','Kia Seltos',2600,5),(6,1,'Maruti','Petrol','https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.png?isig=0&q=80','Maruti Swift',1800,5),(7,0,'Tata','Petrol','https://imgd.aeplcdn.com/1920x1080/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-79.png?isig=0&q=80&q=80','Tata Nexon',2400,5),(8,1,'BMW','Petrol','https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140591/x1-exterior-right-front-three-quarter-8.png?isig=0&q=80&q=80','BMW X1',6500,5),(9,1,'Audi','Petrol','https://imgd.aeplcdn.com/1920x1080/n/cw/ec/51909/a4-exterior-right-front-three-quarter-80.png?isig=0&q=80&q=80','Audi A4',7000,5),(10,1,'Tata','Petrol','https://images.91wheels.com/assets/c_images/gallery/tata/punch/tata-punch-0-1769487768.png?w=850&q=40','Tata Punch',2000,5),(11,1,'Ford','Petrol','https://images.91wheels.com/assets/c_images/gallery/ford/ecosport/ford-ecosport-0-1766589289.png?w=850&q=40','Ford EcoSport',2300,5),(13,1,'Skoda ','Petrol','https://www.v3cars.com/media/model-imgs/018705slavia.png','Skoda Slavia',2800,5),(14,1,'Land Rover','Petrol','https://imgd.aeplcdn.com/642x336/n/cw/ec/107719/range-rover-exterior-right-front-three-quarter-47.png?isig=0&q=80','Range Rover',10000,5);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `license_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKku9tp2fuk9n37gfoq27j02ji3` (`license_number`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'kali@gmail.com','4567','cgvhbjnkml','kali'),(28,'surjith@gmail.com','fcgvhbjnk','tfcygvuhbijn','surjith');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-02 16:39:14
