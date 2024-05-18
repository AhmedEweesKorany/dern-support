-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2024 at 08:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dern-support`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(20, 'Hardware'),
(34, 'system management'),
(38, 'software');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'in progress',
  `label` varchar(255) DEFAULT 'low',
  `priority` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `service_name`, `title`, `status`, `label`, `priority`, `user_email`, `price`, `createdAt`, `updatedAt`) VALUES
(8, 'Front-end', 'dsa', 'done', 'Develop New', 'low', 'ahmed.azoz26@yahoo.com', 30, '2024-05-18 10:29:13', '2024-05-18 11:20:41'),
(11, 'Backend', 'my frist feedback ya 3m', 'canceled', 'Develop New', 'low', 'sayed@gmial.com', 55, '2024-05-18 11:37:31', '2024-05-18 11:47:31'),
(12, 'Front-end', 'fdfffffff', 'done', 'Develop New', 'low', 'sayed@gmial.com', 30, '2024-05-18 11:38:00', '2024-05-18 11:55:59'),
(13, 'Mobile Application', 'i need to solve issue in m application', 'done', 'bug', 'medium', 'ahmed.azoz26@yahoo.com', 783, '2024-05-18 12:04:13', '2024-05-18 12:04:52');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` varchar(4096) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `service_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_description`, `category_name`, `service_price`) VALUES
(4, 'Backend', 'dsada ', 'system management', 55),
(7, 'Front-end', 'Create Frontend Applications with modern Technologies', 'system management', 30),
(8, 'Mobile Application', 'create and edit on mobile applications', 'software', 522);

-- --------------------------------------------------------

--
-- Table structure for table `Testimonial`
--

CREATE TABLE `Testimonial` (
  `id` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testmonail`
--

CREATE TABLE `testmonail` (
  `id` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testmonail`
--

INSERT INTO `testmonail` (`id`, `feedback`, `user_name`, `bio`, `user_id`) VALUES
(3, 'sad', 'ahmed ewees koranay', 'updated bio ', 15),
(4, 'سيد العجل', 'ahmed ewees koranay', 'updated bio ', 15),
(5, 'good service', 'Sayed Ashraf aaa', 'my name is syaed !! a', 19),
(6, 'nice website', 'ahmed ewees koranay', 'updated bio ', 15);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `account_type` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `bio`, `isAdmin`, `account_type`, `password`, `email`) VALUES
(15, 'ahmed ewees koranay', 'updated bio ', 1, 'Business', '$2b$10$9LgdzBMXhfQQHRi9T2qerekxk8p5ALrBUmlxwS9SCSIxRoSCTIgl6', 'ahmed.azoz26@yahoo.com'),
(19, 'Sayed Ashraf aaa', 'my name is syaed !! a', 1, 'Individual', '$2b$10$7Jx/zwMfIyhC4TcgjhDAPei/FECSKz.fpWbhfPj8ovmK7.U938GCy', 'sayed@gmial.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `categor_id` (`category_name`);

--
-- Indexes for table `Testimonial`
--
ALTER TABLE `Testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testmonail`
--
ALTER TABLE `testmonail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Testimonial`
--
ALTER TABLE `Testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testmonail`
--
ALTER TABLE `testmonail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
