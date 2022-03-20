-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 20. 17:46
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
  `user_id` int(11) NOT NULL,
  `username` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `contactInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contactInfo`)),
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `username`, `contactInfo`, `items`) VALUES
(49, 48, 'normal', '{\"contactInfo\":{\"address\":\"sad\",\"firstname\":\"v\",\"lastname\":\"k\",\"cardNumber\":\"3211321\",\"email\":\"e\"}}', '{\"products\":[93,93,95,96]}'),
(50, 48, 'normal', '{\"contactInfos\":{\"address\":\"asdasd\",\"firstname\":\"v\",\"lastname\":\"k\",\"cardNumber\":\"32123\"}}', '{\"products\":[93,93,95]}'),
(52, 51, 'ujkiiras', '{\"contactInfos\":{\"address\":\"l\",\"firstname\":\"v\",\"lastname\":\"k\",\"cardNumber\":\"3112\",\"email\":\"e\"}}', '{\"products\":[93,95,96]}'),
(53, 52, 'ehhe', '{\"contactInfos\":{\"address\":\"l\",\"firstname\":\"v\",\"lastname\":\"k\",\"cardNumber\":\"31321\",\"email\":\"e\"}}', '{\"products\":[93,95]}'),
(54, 52, 'ehhe', '{\"contactInfos\":{\"address\":\"e\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"d\",\"email\":\"f\"}}', '{\"products\":[93,95]}');

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
(93, 32, 'asd', 'asd', 'xf5qKJ85uJFCLL4fWUGn5.jpeg'),
(95, 3222, 'asd', 'asdasd', 'Oc38XA5Q2ymLdcDVrDlnL.jpeg'),
(96, 32, 'uj', 'dasasd', 'exqeWJYz9u1AB8DzeIhNv.jpeg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `username` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `description` varchar(250) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `username`, `rating`, `description`) VALUES
(51, 43, 95, 'admin', 2, 'sda'),
(53, 43, 95, 'admin', 2, 'sda'),
(54, 49, 93, 'asd', 2, 'das'),
(55, 49, 93, 'asd', 4, 'vel');

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
(49, 'normal', '$2a$10$0gV1.f1yv7MITCh6aUJr/O3jr.Oag61790ZwiOIEBn8Dw.78pF14y', 'norm'),
(50, 'admin', '$2a$10$9idbwNv9wNkaa3xkSc7HFOv0aO7GIlqQeDTdzGAOfDvY4LEQgWsZa', 'admin'),
(51, 'ujkiiras', '$2a$10$LAk2WWn2/kygzEhJ6M3xuOd7/eMBNR0wKjRXUbkv9ynzM0WjoDgHm', 'normal'),
(52, 'ehhe', '$2a$10$rsIyomcRV1Cufb6q3Rg9x.DF4vE37/VQebdNuUb7s98J7pJARELyC', 'normal'),
(53, 'rtz', '$2a$10$uu1Nl8UGrdnuyrD/zLXAt.k70rBpNLNXcP31vwRkx9Ig9sOZMvReO', 'normal');

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
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
