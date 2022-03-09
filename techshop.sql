-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 09. 16:08
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `techshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `image` varchar(250) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `cost`, `name`, `description`, `image`) VALUES
(64, 100, 'TESZT', 'TESZTELEK', NULL),
(65, 32, 'dasasd', 'dasads', NULL),
(66, 32, 'dasasd', 'dasads', NULL),
(67, 32, 'sdaasdsda', 'sdasdadas', NULL),
(68, 32, 'sdaasdsda', 'sdasdadas', NULL),
(69, 32, 'sdaasd', 'sdaasd', NULL),
(70, 32, 'sdaasd', 'sdaasd', NULL),
(71, 32, 'sdaasdas', 'asddasasd', NULL),
(72, 32, 'sdaasdas', 'asddasasd', NULL),
(73, 2, 'sdasad', 'asdsda', NULL),
(74, 2, 'sdasad', 'asdsda', NULL),
(75, 32, 'sdasad', 'asdads', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `role` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
(32, 'Jani', '$2a$10$NsfxKpAYEUmGEE5130StfOgSLiBBoFEBsBKArdnJk9TY.CmlL/vZG', 'admin'),
(33, 'Andras', '$2a$10$hMi23wv08MUTXOBLqhG23.8M3v3a7gaeuGCzlqbQC4ayxDRi7SXMS', 'admin');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
