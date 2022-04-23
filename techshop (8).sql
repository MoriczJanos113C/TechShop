-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 23. 16:50
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
CREATE DATABASE IF NOT EXISTS `techshop` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `techshop`;

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
(52, 2, 'postmantest', 'postmantest', 'postmantest', ''),
(53, 144, 'testelek123', 'asda123', '112313 asddasdas', ''),
(54, 2, 'postmantest', 'postmantest', 'postmantest', ''),
(55, 2, 'postmantest', 'postmantest', 'postmantest', '');

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
(85, 126, 'tesztelek', 'teszt@gmail.com', '{\"address\":\"asdasdasdads\",\"firstname\":\"sdadasasd\",\"lastname\":\"dasadsads\",\"cardNumber\":\"adsadsadsadsadsasd\"}', '[110,110,110]', '[\"kategoriastermekas\",\"kategoriastermekas\",\"kategoriastermekas\"]', 2147483647),
(86, 136, 'dsasdaasd', 'dasadsasdsd@g.com', '{\"address\":\"asdasdasdasd\",\"firstname\":\"dassdaasdasd\",\"lastname\":\"dasasdasdasd\",\"cardNumber\":\"asdasdasdasdasda\"}', '[111,111]', '[\"ujnecv\",\"ujnecv\"]', 40000),
(88, 2, 'postmantest', 'postmantest@postmantest.com', '{\"firstname\":\"postmantest\",\"lastname\":\"postmantest\",\"address\":\"postmantest\",\"cardNumber\":\"postmantest\"}', '[10,10]', '[\"postmantest\",\"postmantest\"]', 999),
(89, 146, 'dwasdsadasddasd', 'dasasdadsads@g.com', '{\"address\":\"asddasasd sdaasdasd312313.,\",\"firstname\":\"asddasasdasd\",\"lastname\":\"asdasdasdasd\",\"cardNumber\":\"sdadasdasasdda -\"}', '[112,112]', '[\"test\",\"test\"]', 246),
(90, 2, 'postmantest', 'postmantest@postmantest.com', '{\"firstname\":\"postmantest\",\"lastname\":\"postmantest\",\"address\":\"postmantest\",\"cardNumber\":\"postmantest\"}', '[10,10]', '[\"postmantest\",\"postmantest\"]', 999),
(91, 2, 'postmantest', 'postmantest@postmantest.com', '{\"firstname\":\"postmantest\",\"lastname\":\"postmantest\",\"address\":\"postmantest\",\"cardNumber\":\"postmantest\"}', '[10,10]', '[\"postmantest\",\"postmantest\"]', 999);

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
  `image` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `cost`, `category`, `name`, `description`, `image`) VALUES
(111, 1000099, 'tablagép', 'postManPutTest123', 'postManPutTest', 'VykBUuHZrc3do1mhNxvh1.jpeg'),
(112, 123, 'asdasdadsads', 'testelek1232312321231132312', 'sdasdadasasddas    asd  ', 'n6yrwHfCqauuJE94LuqZd.jpeg'),
(113, 213132123, 'asdasdasddas', 'sdadasd', 'sdaasdasdasd', 'AZ5m7Ed2UJN3QcMKplq3g.jpeg'),
(114, 2147483647, '312213312132dsaasddsa', 'sdadasasdasd', 'asdasdasdasdads', 'wPIhkax_8Mybcgh-hssYQ.jpeg'),
(115, 123, 'asdasd', 'test123', 'asddas asdasd', 'ufl9MWusmZ6qji97RNZI1.jpeg'),
(116, 213132, 'asdasdasd', 'dsaasddasdas', 'dasdasasdads', 'fLRyDUQbg_jkNYOF_WsCc.jpeg'),
(117, 2147483647, 'asdasdadsads', 'dssdadas', 'sdaadsasdsadasd', 'vVYpYsE9dm7aQXvHIFuK5.jpeg'),
(119, 2147483647, 'dasasdasdadsads', 'dassdadasasda', 'dsaasdasddsaasd', 'Jl-oaGRzkzuA9McGZ06Id.jpeg'),
(120, 2147483647, 'dasadsasdasdads', 'ujtestvvvv', 'dasasdasdasdasd', 'YCAHVxZwxPMJaW_LMCZ3G.jpeg'),
(121, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', 'MVjSRD0SJUrpBqska0xYl.jpeg'),
(123, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', 'TZTthJKgB6i_H_VxqCgZ3.jpeg'),
(124, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', 'BgrqbjRLAqzycph-cue8z.jpeg'),
(125, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', '_k0R4ftb0HlSCj30p7gec.jpeg'),
(126, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', 'AfZrsOf-PeNbZATCyc8Vf.jpeg'),
(127, 1000099, 'tablagép', 'testelek123', 'postManPostTest123', 'NHr1uP_bLQVsqQprGDVS4.jpeg'),
(128, 1000099, 'tablagép', 'postManPostTest123', 'postManPostTest123', 'xn884RAeY_IH-JLUwEqw5.jpeg'),
(129, 32131312, 'sdaasdasdads', 'dsasddas', 'sdaadsasdasd', 'tXVNhjEiw9SH-Woh_Mm1I.jpeg'),
(130, 321132321, 'saddasdasasd', 'ujtermel0423', 'asddasdasasd', '871uXBKpO1dH8bYwTSW74.jpeg');

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
(70, 136, 110, 'dsasdaasd', 2, 'asddasdasasd'),
(71, 2, 2, 'normal', 2, 'postmantest'),
(73, 2, 2, 'normal', 2, 'postmantest'),
(74, 2, 2, 'normal', 2, 'postmantest'),
(75, 146, 112, 'dwasdsadasddasd', 1, 'asddasads- dasadsads++!'),
(76, 2, 2, 'normal', 2, 'postmantest'),
(77, 2, 2, 'normal', 2, 'postmantest'),
(78, 2, 2, 'normal', 2, 'postmantest'),
(79, 2, 2, 'normal', 2, 'postmantest'),
(80, 2, 2, 'normal', 2, 'postmantest'),
(81, 2, 2, 'normal', 2, 'postmantest');

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
(132, 'testtest', 't@g.com', '$2a$10$kJByi0IaYfkANpE4SjEEC.f0HBQB0miexF8U9jZ7wkTbDNzTkO6ya', 'normal'),
(133, 'tessztelek', 'ts@g.com', '$2a$10$0yZJxjaM2GZ3ZEAl39X6neTz/ZGbsl1EYAm2gyUMtJTTSdgYZTxKi', 'normal'),
(134, 'normal123', 'asdasd@gmail.com', '$2a$10$h6Ie8cRw90SOVdr4kJje3utjomarubfrXoc7VDqwLH3BDixPZsqgu', 'normal'),
(135, 'zertzu', 'asd@g.com', '$2a$10$JJWhWgf2PIWK5HvfEIHO1u00qL4yTUGMRdETqV9b4iZhBiDf7jn7S', 'normal'),
(136, 'dsasdaasd', 'dasadsasdsd@g.com', '$2a$10$fQLWGlEvKAl9Resg7j1.Behda8El/rIIX.Zib1AIIzOYTcJN8smVy', 'normal'),
(137, 'postmantest', 'postmantest@postmantest.com', '$2a$10$H4nUmh6ksLnq1XBqBIqeh.W84gpYd4cea83rztKcdcfBoD/SG0CjK', 'normal'),
(139, 'postmantest123', 'postmantest123@postmantest.com', '$2a$10$E0Oi3ry8RfyDmsj8PmHsZuZNmx95P/Q/dzfwONvHWwXKcCj9yGn5i', 'normal'),
(140, 'asdasdasasdas', 'asddasasdasdasdasd@g.com', '$2a$10$y84FehNnAciO/iEgzEco4uVueI/3Fg82LA9PartbyAZz8fbwoL7kW', 'normal'),
(141, 'ujtest', 'asdasdasd@g.com', '$2a$10$1.tFKFjY6rHptlfD2GDPPO4hQeXQC.CzLJTbe25dvQoYcn9Q14./W', 'normal'),
(142, 'dasasdasddas', 'asdasdadsasd@g.com', '$2a$10$B04bdlGEB/loFMKeqBZhY.F7MeufttAMuy6H/bgG0DeaP2ZdfmUVq', 'normal'),
(143, 'admin123', 'adm@g.com', '$2a$10$q5tY95dfUO4Nk0FLtewbhuX.lTi8W4QGthC5tfiWN/ZTUGUFFvl6C', 'admin'),
(144, 'testelek123', 'te@g.com', '$2a$10$nnIWGljOR00ggX5c8inhJutW6ersx915n.YT38qu4BeleHSi9vOLm', 'admin'),
(145, 'asddasads', 'asdasdasddasasd@g.vom', '$2a$10$c/DTQPk9KRpSHU.x0nTj2uHo9uvrFJgi8oolz2Je8JlXJbeCetLk.', 'normal'),
(146, 'dwasdsadasddasd', 'dasasdadsads@g.com', '$2a$10$4XUesiPqJpp6Gbti0oITjuH7j5hD7OsDoGzEOPKpN1.bdxidUBZ6a', 'normal'),
(147, 'dasasdasd', 'asdadsadsads@g.com', '$2a$10$ls0FGIO0a/1iwOKic08YjuOPEH2rlMctoVxRQEewKIMRD4.o3AaWq', 'normal'),
(148, 'asdsaads', 'asdasdads@g.com', '$2a$10$ZizkA8RlA1i3ilZc87kTzOnwWCY9c6b4FgTA7pHYg1LzOeZGn8rdS', 'normal'),
(149, 'dasdasadsdasadsasas', 'dasasddasasd@g.com', '$2a$10$fOum4iGHt9B5C8IBKzb7u./TNDNBtQx/4hTX8PBcPy1RvGKk88TpC', 'normal');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
