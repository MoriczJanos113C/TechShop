-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 27. 21:34
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
  `username` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `description` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `entries`
--

INSERT INTO `entries` (`id`, `user_id`, `username`, `title`, `description`) VALUES
(64, 160, 'Admin1', 'Egy magyar cég az animációkészítés élvonalában - így dolgozhatsz akár te is a Ubisoft játékain!', 'A gamerek számára a grafika és látványvilág meghatározó élményt jelent egy-egy játék során. Fejlesztésük rendkívül összetett feladat, és komoly szakmai háttértudást igényel. Ahhoz, hogy valakiből megfelelő szakember válhasson, az animációkészítés alapjait érdemes már felsőoktatási körülmények közt elsajátítani, ami után akár olyan komoly cégeknél lehet elhelyezkedni és tovább fejleszteni a szakmai tudást, mint a DIGIC Pictures.\n\nInterjúnk során arról beszélgettünk velük, hogy milyen technológiákat és eszközöket használnak, hogy hazai cégként nemzetközi produkciókon dolgozhassanak, mire figyeljen egy pályakezdő és miért is izgalmas terület az animációkészítés.'),
(65, 160, 'Admin1', 'Az Overwatch 2 fejlesztőit is zavarták a csúszások, nem ez volt a terv', 'A 2019-es BlizzConon jelentette be a Blizzard először, hogy nekiugrik az Overwatch folytatásának, és mivel az az első részre építik fel, a közösség arra számított, hogy nem lehet olyan messze a megjelenés.\n\nMost, közel 2 és fél évvel később még mindig nem játszottunk az Overwatch 2-vel, és ennek nagyrészt az újabb és újabb csúsztatások lettek az okai. A PVP részleg bétája jövő héten indul, így a fejlesztők is kicsit beszédesebbek már, mint a korábbi években.\n\nGeoff Goodman, a vezető karaktertervező adott egy interjút a USA Today újságíróinak, ahol mesélt a csapat helyzetéről és a fejlesztés folyamatáról.'),
(66, 161, 'Admin2', 'Snoop Dogg az egyik legismertebb e-sport szervezet tagja lett', 'Az elmúlt évtizedben kétségtelenül sokat fejlődött az e-sport, így mára már gyakorlatilag teljesen normális dolognak számít, ha valaki kompetitív videojátékozással keresi a kenyerét. A korábbi viszonylatokhoz képest mostanra igencsak komoly anyagi háttérrel rendelkeznek a szcénában tevékenykedő szervezetek, gyakran egyszerre több népszerű játékban is van aktív csapatunk, és az sem elképzelhetetlen, hogy az ismert szponzorokon felül olykor egy-egy híresség is beszáll a buliba.\n\nHabár valószínűleg nagyon távol áll a professzionális szinttől, az már eddig is egyértelmű lehetett, hogy Snoop Dogg eléggé csípi a videojátékokat, és a 2016-os E3 óta sokat is fejlődhetett a célzása. A jövőben pedig még többet lóghat gamerekkel, ugyanis hivatalosan is a FaZe Clan tagja lett, és a szervezet vezetői tanácsát fogja erősíteni a jövőben.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `contactInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contactInfo`)),
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `itemName` varchar(125) COLLATE utf8_hungarian_ci NOT NULL,
  `totalCost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `username`, `email`, `contactInfo`, `items`, `itemName`, `totalCost`) VALUES
(97, 158, 'Jani', 'jani@gmail.com', '{\"address\":\"Nyíregyháza, Nagy utca 5/13\",\"firstname\":\"Móricz\",\"lastname\":\"János\",\"cardNumber\":\"1231231231231231\"}', '[132,134]', '[\"STRONG 42FC5433U FHD Android Smart LED televízió, 105cm\",\"OK. ODL 32721HH-DB HD Led televízió, 81 cm\"]', 134884),
(98, 159, 'Levi', 'levi@gmail.com', '{\"address\":\"4400, Nyíregyháza, Kis utca 5/12\",\"firstname\":\"Lévai\",\"lastname\":\"Levente\",\"cardNumber\":\"1231231231231231\"}', '[131,133,132]', '[\"SAMSUNG UE 55 TU7022KXXH Crystal UHD 4K Smart TV\",\"SAMSUNG UE 32 T4302AKXXH SMART LED Televízió, 80 cm\",\"STRONG 42FC5433U F', 319885),
(99, 159, 'Levi', 'levi@gmail.com', '{\"address\":\"4400, Nyíregyháza, Kis utca 5/12\",\"firstname\":\"Lévai\",\"lastname\":\"Levente\",\"cardNumber\":\"1231231231231231\"}', '[135]', '[\"APPLE MacBook Air 2020 13\\\" Retina asztroszürke Apple M1 (8C/7C)/8GB/256 GB SSD (mgn63mg/a)\"]', 379898);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(125) COLLATE utf8_hungarian_ci NOT NULL,
  `description` mediumtext COLLATE utf8_hungarian_ci NOT NULL,
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
  `username` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `description` varchar(150) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `username`, `rating`, `description`) VALUES
(90, 158, 131, 'Jani', 5, 'Nagyon jó termék, jó a kijelzője'),
(91, 158, 134, 'Jani', 4, 'Nagyon jó termék, ajánlom mindenkinek!'),
(92, 158, 133, 'Jani', 3, 'A minősége nem a legjobb'),
(93, 159, 133, 'Levi', 5, 'Kiváló termék, köszönöm szépen!'),
(94, 159, 132, 'Levi', 1, 'Nem a legjobb'),
(95, 159, 134, 'Levi', 5, 'Nagyon jó termék, köszönöm');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `role` varchar(10) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(158, 'Jani', 'jani@gmail.com', '$2a$10$EJaXrVKlOKTIhpSvUBI9ienPIY.I9v3VjgG5DjwT7mR35hgtHxMwO', 'normal'),
(159, 'Levi', 'levi@gmail.com', '$2a$10$uim0RdSqQ8IJNKM8ADktVOhGN/VAUvBsWVo45PFUWdr1DSNM4ZaUS', 'normal'),
(160, 'Admin1', 'admin1@techshop.hu', '$2a$10$a1Fw3F3SbgC/yUdhsD3BLeozq.7J/7oc5dFOwtKSf4DK6m3vzkRam', 'admin'),
(161, 'Admin2', 'admin2@gmail.com', '$2a$10$i59Fz6utGJe.h7YiS/8l.eDVlCLolLRR9HQ0sumZ2AaCuw.Z.p98K', 'admin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
