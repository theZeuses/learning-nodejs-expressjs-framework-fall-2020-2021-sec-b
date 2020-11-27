-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2020 at 05:17 PM
-- Server version: 8.0.22-0ubuntu0.20.04.2
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `midassignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `bookid` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  `category` varchar(30) NOT NULL,
  `details` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`bookid`, `name`, `author`, `price`, `quantity`, `category`, `details`, `picture`) VALUES
(1, 'The Kite Runner', 'Khaled Hosseini', 196, 1, 'Novel', 'English Novel.', '1606315654397c0e192e5c_53062.jpg'),
(2, 'Nishad', 'Humayun Ahmed', 150, 5, 'Novel', 'This is a novel.', '1606234609303Nishad-By-Humayun-Ahmed.jpg'),
(3, 'Haradhoner Dwip', 'Hemendrokumar Roy', 110, 3, 'Novel', 'This is a novel.', '1606235146426Haradhaner-Dwip-249x300-185x278.jpg'),
(4, 'Academic Writing', 'D. Zemach, L. Ghulldu', 500, 10, 'Academic', 'How to be good at academic writing? Here is the solution.', '1606316527607414AAEBIB9L._SX258_BO1,204,203,200_.jpg'),
(5, 'Loving Literature', 'Deidre Shauna Lynch', 350, 10, 'Literature', 'A cultural History.', '16063166640849780226598390.jpg'),
(7, 'The Rings of Saturn', 'Isaac Asimov', 400, 5, 'Sci-fi', 'Hardcopy.', '160639752713340-coolest-sci-fi-book-covers-3-1556673620-CHAr-column-width-inline.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`userid`, `password`, `type`) VALUES
('shamil1', 'shamil1', 'Admin'),
('shamil2', 'shamil1', 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int NOT NULL,
  `userid` varchar(255) NOT NULL,
  `total` int NOT NULL,
  `quantity` int NOT NULL,
  `date` varchar(12) NOT NULL,
  `payment` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `userid`, `total`, `quantity`, `date`, `payment`, `city`) VALUES
(1, 'shamil1', 1000, 4, '27/11/2020', 'Done. By Card.', 'Jessore'),
(2, 'shamil2', 1200, 2, '26/11/2020', 'On delivery', 'Khulna');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobileno` varchar(11) NOT NULL,
  `bio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fullname`, `email`, `mobileno`, `bio`, `picture`, `type`) VALUES
('shamil1', 'Md Shamil hossain', 'shamil@email.com', '01718827347', 'Some Bio..', '160640285573440-coolest-sci-fi-book-covers-3-1556673620-CHAr-column-width-inline.jpg', 'Admin'),
('shamil2', 'Md Shamil Hossain', 'alsanysamil@gmail.com', '01718827347', 'Bio updated', '1606404123940Nishad-By-Humayun-Ahmed.jpg', 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`bookid`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `bookid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
