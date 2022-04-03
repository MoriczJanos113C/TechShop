-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 03. 12:02
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
-- Tábla szerkezet ehhez a táblához `entries`
--

CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `title` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(400) COLLATE utf8_hungarian_ci NOT NULL,
  `image` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `entries`
--

INSERT INTO `entries` (`id`, `user_id`, `username`, `title`, `description`, `image`) VALUES
(48, 85, 'adminvok', '21123133', 'dasasdasda', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `contactInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contactInfo`)),
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `itemName` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `totalCost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `username`, `email`, `contactInfo`, `items`, `itemName`, `totalCost`) VALUES
(65, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,95]}', '', 0),
(66, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,93]}', '', 0),
(67, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,93]}', '', 0),
(68, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,95]}', '', 0),
(69, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,93,95]}', '', 0),
(70, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,95]}', '', 3254),
(71, 65, 'normal', 'norm@gmail.com', '{\"contactInfos\":{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}}', '{\"products\":[93,93,93]}', '', 96),
(72, 65, 'normal', 'norm@gmail.com', '{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}', '[93,93]', '', 64),
(73, 65, 'normal', 'norm@gmail.com', '{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}', '[93,93,93,95,93,93]', '[\"asd\",\"asd\",\"asd\",\"asd\",\"asd\",\"asd\"]', 3382),
(74, 65, 'normal', 'norm@gmail.com', '{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}', '[96,95]', '[\"uj\",\"asd\"]', 3254),
(75, 70, 'ujvok', 'asd', '{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}', '[93,93]', '[\"asd\",\"asd\"]', 64),
(76, 73, 'ujfelh', 'ujemail@gmail.com', '{\"address\":\"f\",\"firstname\":\"f\",\"lastname\":\"f\",\"cardNumber\":\"f\",\"email\":\"f\"}', '[93,93]', '[\"uj93\",\"uj93\"]', 64),
(77, 73, 'ujfelh', 'ujemail@gmail.com', '{\"address\":\"asdddd\",\"firstname\":\"fas\",\"lastname\":\"asd\",\"cardNumber\":\"asd1234123\"}', '[93,93]', '[\"uj93\",\"uj93\"]', 64),
(78, 84, 'ujfelhasznalo', 'asd@gmail.com', '{\"address\":\"asd123asd\",\"firstname\":\"asd\",\"lastname\":\"asd\",\"cardNumber\":\"asdsasda123\"}', '[100,100]', '[\"sadasdsadads\",\"sadasdsadads\"]', 2147483647),
(79, 84, 'ujfelhasznalo', 'asd@gmail.com', '{\"address\":\"asdasdasdasdasd\",\"firstname\":\"asdasda\",\"lastname\":\"asdasdasdasd\",\"cardNumber\":\"asdasdasdads\"}', '[99,99,99,99,99]', '[\"asdsd\",\"asdsd\",\"asdsd\",\"asdsd\",\"asdsd\"]', 116160),
(80, 87, 'normalfelhasznalo', 'a@gmail.com', '{\"address\":\"asdddd\",\"firstname\":\"asd\",\"lastname\":\"asd\",\"cardNumber\":\"asdasd21321\"}', '[108,108,107]', '[\"ujtermek2\",\"ujtermek2\",\"ujas\"]', 325332312),
(81, 87, 'normalfelhasznalo', 'a@gmail.com', '{\"address\":\"asadsasdáááá\",\"firstname\":\"dasdasáááá\",\"lastname\":\"adssdáá\",\"cardNumber\":\"asdasd213123123112asd\"}', '[107,107,107]', '[\"ujas\",\"ujas\",\"ujas\"]', 963996936),
(82, 125, 'asddad23321', 'asdasd32123@g.com', '{\"address\":\"asdadsadsasdads\",\"firstname\":\"daasdsdasdasd\",\"lastname\":\"sdaasdasdasdads\",\"cardNumber\":\"asdasdasdadsadsasd231\"}', '[110,110,110]', '[\"kategoriastermek\",\"kategoriastermek\",\"kategoriastermek\"]', 2147483647),
(83, 126, 'tesztelek', 'teszt@gmail.com', '{\"address\":\"asdasdasdasdasd\",\"firstname\":\"dsaasdasdasd\",\"lastname\":\"asdasdasdads\",\"cardNumber\":\"sadsdaasdadsadsasdasd\"}', '[110,110]', '[\"kategoriastermekas\",\"kategoriastermekas\"]', 2147483647),
(84, 126, 'tesztelek', 'teszt@gmail.com', '{\"address\":\"asdasdadsasd\",\"firstname\":\"dasdasadsasd\",\"lastname\":\"asdadsadsads\",\"cardNumber\":\"dasadsadsadsdasasad\"}', '[110,110,111]', '[\"kategoriastermekas\",\"kategoriastermekas\",\"ujkatsercss\"]', 2147483647),
(85, 126, 'tesztelek', 'teszt@gmail.com', '{\"address\":\"asdasdasdads\",\"firstname\":\"sdadasasd\",\"lastname\":\"dasadsads\",\"cardNumber\":\"adsadsadsadsadsasd\"}', '[110,110,110]', '[\"kategoriastermekas\",\"kategoriastermekas\",\"kategoriastermekas\"]', 2147483647);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `category` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `image` varchar(500) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `cost`, `category`, `name`, `description`, `image`) VALUES
(110, 2147483647, 'telefon', 'kategoriastermekas', 'asdasdadsasd', 'SIMFLmJOsQuUqnfCw3QLb.jpeg'),
(111, 20000, 'számítógép', 'ujkatsercss', 'sadasadsadsasdads', 'CIewaDkHVOJOHcIvBd6HD.jpeg'),
(112, 2147483647, 'asdasdadsads', 'dasdasdas', 'sdasdadasasddas', 'n6yrwHfCqauuJE94LuqZd.jpeg'),
(113, 213132123, 'asdasdasddas', 'sdadasd', 'sdaasdasdasd', 'AZ5m7Ed2UJN3QcMKplq3g.jpeg'),
(114, 2147483647, '312213312132dsaasddsa', 'sdadasasdasd', 'asdasdasdasdads', 'wPIhkax_8Mybcgh-hssYQ.jpeg');

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
(55, 49, 93, 'asd', 4, 'vel'),
(57, 53, 93, 'rtz', 3, 'asd'),
(58, 53, 93, 'rtz', 4, 'asd'),
(61, 58, 95, 'fgh', 5, 'jó féle'),
(62, 65, 97, 'normal', -2147483648, 'dasdas'),
(63, 73, 93, 'ujfelh', 3, 'asd'),
(64, 73, 93, 'ujfelh', 0, ''),
(65, 73, 93, 'ujfelh', 1, 'asd'),
(67, 84, 99, 'ujfelhasznalo', 1, 'asd'),
(68, 87, 108, 'normalfelhasznalo', 2, 'asd'),
(69, 126, 111, 'tesztelek', 2, 'dasadsasd');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `role` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(85, 'adminvok', 'a@g.com', '$2a$10$7j4Wgq/8K.EE3Q/uV6jdW.ec0KYX8rBbl36pyrSarMev6yXSskuRS', 'admin'),
(131, 'teszt', 't@t.com', '$2a$10$HwECLPPOfS5tcnl93ivf3.yUD0Gq9BvRHsZ0YiDTBkOqKT8XUUB36', 'normal'),
(132, 'tesztelek', 't@g.com', '$2a$10$9c7M3jQmLTYadZe2ZPQd.OtDXvQaSFKisIA3rKCux7McTIDucd7.W', 'normal'),
(133, 'tessztelek', 'ts@g.com', '$2a$10$0yZJxjaM2GZ3ZEAl39X6neTz/ZGbsl1EYAm2gyUMtJTTSdgYZTxKi', 'normal');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT a táblához `entries`
--
ALTER TABLE `entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
