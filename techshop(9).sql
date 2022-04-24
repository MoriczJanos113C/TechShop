-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 24. 15:23
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 7.3.27

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
(91, 2, 'postmantest', 'postmantest@postmantest.com', '{\"firstname\":\"postmantest\",\"lastname\":\"postmantest\",\"address\":\"postmantest\",\"cardNumber\":\"postmantest\"}', '[10,10]', '[\"postmantest\",\"postmantest\"]', 999),
(92, 151, 'Levialap', 'levlev333@gmail.com', '{\"address\":\"4400, Nyíregyháza tulipán-köz 7.\",\"firstname\":\"Lévai\",\"lastname\":\"Levente\",\"cardNumber\":\"1111222233334444\"}', '[131,136,141]', '[\"SAMSUNG UE 55 TU7022KXXH Crystal UHD 4K Smart TV\",\"HP 250 G8 27K19EA laptop (15,6\\\" FHD/Celeron/4GB/256 GB SSD/Win10H)\",\"APPLE iPhone 13 Pro Max Grafit 128 GB Kártyafüggetlen Okostelefon\"]', 740997);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `category` varchar(250) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(500) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_hungarian_ci NOT NULL,
  `image` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `cost`, `category`, `name`, `description`, `image`) VALUES
(131, 154999, 'Televízió', 'SAMSUNG UE 55 TU7022KXXH Crystal UHD 4K Smart TV', 'Képernyő átmérő (cm / inch): 138 cm / 55 col\r\nFelbontás: 3840 x 2160 pixel\r\nKijelző típusa: LED SMART TV: Igen\r\nSzín: Fekete\r\nCsatlakozók: 2x HDMI, USB, Digitális audio kimenet (optikai), CI slot Termék típusa: UHD Smart LED Televízió', 'Al6QgIiXe4XlERZZUb2i2.png'),
(132, 79887, 'Televízió', 'STRONG 42FC5433U FHD Android Smart LED televízió, 105cm', 'Képernyő átmérő (cm / inch): 105 cm / 42 col\r\nFelbontás: 1920 x 1080 pixel\r\nKijelző típusa: LED SMART TV: Igen\r\nSzín: Fekete, Ezüst\r\nBluetooth: Igen\r\nCsatlakozók: 2x HDMI, 2x USB, AV bemenet, RJ-45, Digitális audio kimenet (optikai), Fejhallgató kimenet, CI slot', 'm6aiyClGGvCOhuLaJPBec.png'),
(133, 84999, 'Televízió', 'SAMSUNG UE 32 T4302AKXXH SMART LED Televízió, 80 cm', 'Képernyő átmérő (cm / inch): 80 cm / 32 col\r\nFelbontás: 1366 x 768 pixel\r\nKijelző típusa: LED\r\nSMART TV: Igen\r\nSzín: Fekete\r\nCsatlakozók: 2x HDMI, 1x USB, Komponens bemenet, Kompozit bemenet, RJ-45, Digitális audio kimenet (optikai), Ci slot\r\nTermék típusa: LED Tv', 'u1POu8l5H8RbiE8dU7ml-.png'),
(134, 54997, 'Televízió', 'OK. ODL 32721HH-DB HD Led televízió, 81 cm', 'Képernyő átmérő (cm / inch): 81.28 cm / 32 col\r\nFelbontás: 1366 x 768 pixel\r\nKijelző típusa: LED\r\nSMART TV: Nem\r\nSzín: Fekete\r\nCsatlakozók: 2x HDMI, USB, Kompozit bemenet, Digitális audio kimenet (koax), Fejhallgató kimenet, PC audio bemenet\r\nTermék típusa: LED Televízió', '4yTkYsiwYRROUeHggxulv.png'),
(135, 379898, 'Notebook', 'APPLE MacBook Air 2020 13\" Retina asztroszürke Apple M1 (8C/7C)/8GB/256 GB SSD (mgn63mg/a)', 'Processzor: Apple® M1 processzor\r\nKépernyő átmérő (cm / inch): 33.02 cm / 13 col\r\nFelbontás: 2560 x 1600 pixel\r\nMemóriaméret: 8 GB\r\nMerevlemez kapacitása: 256 GB\r\nVideókártya: Apple M1 (hétmagos)\r\nOperációs rendszer: macOS', 'mTw2-V393fDso9PGviXor.png'),
(136, 135999, 'Laptop', 'HP 250 G8 27K19EA laptop (15,6\" FHD/Celeron/4GB/256 GB SSD/Win10H)', 'Processzor: Intel® Celeron® Processor N4020\r\nKépernyő átmérő (cm / inch): 39.6 cm / 15.6 col\r\nFelbontás: 1920 x 1080 pixel\r\nMemóriaméret: 4 GB\r\nMerevlemez kapacitása: 256 GB\r\nVideókártya: Intel UHD Graphics\r\nOperációs rendszer: Windows 10 Home', '1Zq659Zsoc-0_cgrH-aAB.png'),
(137, 179999, 'Laptop', 'ASUS VivoBook X515FA-BQ060T Szürke laptop (15,6\" FHD/Core i3/8GB/256 GB SSD/Win10H)', 'Processzor: Intel® Core™ i3-10110U processzor\r\nKépernyő átmérő (cm / inch): 39.6 cm / 15.6 col\r\nFelbontás: 1920 x 1080 pixel\r\nMemóriaméret: 8 GB\r\nMerevlemez kapacitása: 256 GB\r\nVideókártya: Intel UHD Graphics\r\nOperációs rendszer: Windows 10 Home', 'vE27_HcCtoeO5_iRwIiHF.png'),
(138, 439989, 'Laptop', 'MSI Katana GF66 11UE 9S7-158112-411 Gamer laptop (15,6\" FHD/Core i5/16GB/512 GB SSD/RTX3060 6GB/NoOS)', 'Processzor: Intel® Core™ i5-11400H processzor\r\nKépernyő átmérő (cm / inch): 39.6 cm / 15.6 col\r\nFelbontás: 1920 x 1080 pixel\r\nMemóriaméret: 16 GB\r\nMerevlemez kapacitása: 512 GB\r\nVideókártya: NVIDIA GeForce RTX 3060\r\nVideókártya memória: 6 GB', 'FzB-QDahRrRSioid_qs-7.png'),
(139, 50998, 'Okostelefon', 'SAMSUNG GALAXY A12 3/32 GB DualSIM Kék Kártyafüggetlen Okostelefon ( SM-A127 )', 'Szín: Kék\r\nTermék típusa: Okostelefon\r\nOperációs rendszer: Android 10\r\nProcesszor: Exynos 850, nyolcmagos\r\nProcesszor sebesség: 4x2.0 GHz Cortex-A55 & 4x2.0 GHz Cortex-A55\r\nKapacitás: 32 GB\r\nMemóriakártya foglalat: Igen', '8pFxsaYFxtA7_lLNUv__j.png'),
(140, 72999, 'Okostelefon', 'XIAOMI REDMI NOTE 10 5G 4/128 GB DualSIM Kék Kártyafüggetlen Okostelefon', 'Processzor: MediaTek MT6833 Dimensity 700 5G, nyolcmagos\r\nKapacitás: 128 GB\r\nMemóriaméret: 4 GB\r\nKijelző mérete cm / inch: 16.51 cm / 6.5 col\r\nFelbontás (Ma x Szé): 2400 x 1080 pixel\r\nDual SIM: Igen\r\nUjjlenyomat olvasó: Igen', 'UE5HMoXWWx_GylaGU95Bx.png'),
(141, 449999, 'Okostelefon', 'APPLE iPhone 13 Pro Max Grafit 128 GB Kártyafüggetlen Okostelefon', 'Szín: Szürke (Grafit)\r\nTermék típusa: Okostelefon\r\nOperációs rendszer: iOS 15\r\nProcesszor: Apple A15 Bionic, hatmagos\r\nKapacitás: 128 GB\r\nMemóriakártya foglalat: Nem\r\nMemóriaméret: 6 GB', 'd52sIiu0t0sWMdEbVMXl8.png'),
(142, 104999, 'Okostelefon', 'XIAOMI REDMI NOTE 10 PRO 6/128 GB DualSIM Kék Kártyafüggetlen Okostelefon', 'Processzor: Qualcomm SM7150 Snapdragon 732G, nyolcmagos\r\nKapacitás: 128 GB\r\nMemóriaméret: 6 GB\r\nKijelző mérete cm / inch: 16.33 cm / 6.67 col\r\nFelbontás (Ma x Szé): 2400 x 1080 pixel\r\nDual SIM: Igen\r\nUjjlenyomat olvasó: Igen', 'bqXWBy2yA3ZeYHOLTJxFT.png');

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
(81, 2, 2, 'normal', 2, 'postmantest'),
(82, 151, 131, 'Levialap', 4, 'Jó a képminősége. Hiányolom a falraszerelhetőség lehetőségét.');

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
(149, 'dasdasadsdasadsasas', 'dasasddasasd@g.com', '$2a$10$fOum4iGHt9B5C8IBKzb7u./TNDNBtQx/4hTX8PBcPy1RvGKk88TpC', 'normal'),
(150, 'Adminlevi', 'levlev324@gmail.com', '$2a$10$YxKN5dw56P7Dyw/c8kDAk.by9sM.AfZno5TTuL5QEYS2ij1JK03ii', 'admin'),
(151, 'Levialap', 'levlev333@gmail.com', '$2a$10$dTEU5AIYZeltW9Ka8QoolubXq0H8CboH5XA0cU57MQ49AdXNRtheC', 'normal');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
