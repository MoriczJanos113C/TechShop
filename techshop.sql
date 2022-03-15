-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 15. 17:56
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
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `contactInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contactInfo`)),
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `contactInfo`, `items`) VALUES
(34, '{\"contactInfo\":{\"address\":\"Nagy utca 45/3\",\"firstname\":\"Kovács\",\"lastname\":\"Lajos\",\"cardNumber\":\"42141241ABDASCA131\",\"email\":\"asd@gmail.com\"}}', '{\"items\":[92,93,94,92,93]}'),
(35, '{\"contactInfo\":{\"address\":\"arok utca\",\"firstname\":\"Kis \",\"lastname\":\"János\",\"cardNumber\":\"3123123dasasd213\",\"email\":\"gh@gmail.com\"}}', '{\"items\":[92,93,94]}');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `image` varchar(500) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `cost`, `name`, `description`, `image`) VALUES
(92, 1000, 'scarlett', 'asdsda', 'Aaxc0ESSHSekFutIzOOZa.jpeg'),
(93, 32, 'dasdasd', 'dasasd', 'xf5qKJ85uJFCLL4fWUGn5.jpeg'),
(94, 32, 'fgh', 'ds', 'F81xQzrMCsXhTvbzS375m.jpeg');

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
(34, 'asd', '$2a$10$AXgfi3j0iZ6Vvo.w5zUxRecNHglFMd33HjLI/tXpWVNutKL9hOLzq', 'admin'),
(35, 'dsa', '$2a$10$3ODQat.f0fkDU1pKDKehSeTJayLFJzz9aaApGsP49bKVv2UDD6D5y', ''),
(36, 'zui', '$2a$10$nkqyLPLlSt3WLxmMOgGWgurIL7w2kJrrL1GFnmX4GZuZ.XxbvSUIO', ''),
(37, 'user', '$2a$10$FHfEBH7qzfQc3lXw.slqAu44EsVjVWJQ//LVI2WB8Uj7peoixXmCu', ''),
(38, 'asdasddsa', '$2a$10$qCHZsIXH3bSGXl7TENUaeueFJoKo3CtIhVtcIFCXavo15Z9lrRF2e', ''),
(39, 'uj', '$2a$10$3y5Iemcan7AE6N7tH9V8EOQWDP.KQEZUmWO9TgZtQHqwlt.n6wCVW', '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
