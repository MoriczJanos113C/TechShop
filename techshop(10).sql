-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 24. 21:43
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
  `description` mediumtext COLLATE utf8_hungarian_ci NOT NULL,
  `image` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `entries`
--

INSERT INTO `entries` (`id`, `user_id`, `username`, `title`, `description`, `image`) VALUES
(58, 154, 'Admin1', 'Csökken a videókártyák ára!', 'Az elmúlt években a videókártyák ára az egekbe nőtt. Az elmúlt hetekben viszont megfigyelhető egy stabil ár zuhanás a videókártyák piacán.', ''),
(59, 154, 'Admin1', 'Ezek a 2022 májusi videojáték megjelenések', 'Warhammer 40,000: Chaos Gate - Daemonhunters - május 5. - PC\r\n\r\nTrek to Yomi - május 5. - PC, PS4, PS5, Xbox One, Xbox Series X|S\r\n\r\nCrows and Pawns: Kingdom of Deceit - május 6. - PC\r\n\r\nSalt and Sacrifice - május 10. - PC, PS5\r\n\r\nEvil Dead: The Game - május 13. - PC, PS4, PS5, Xbox One, Xbox Series X|S\r\n\r\nVampire: The Masquerade - Swansong - május 19. - PC, PS4, PS5, Xbox One, Xbox Series X|S, Switch\r\n\r\nDolmen - május 20. - PC, PS4, PS5, Xbox One, Xbox Series X|S\r\n\r\nStreets of Rage 4 - május 24. - iOS, Android\r\n\r\nMX vs. ATV Legends - május 24. - PC, PS4, PS5, Xbox One, Xbox Series X|S\r\n\r\nSniper Elite 5 - május 26. - PC, PS4, PS5, Xbox One, Xbox Series X|S\r\n\r\nKao the Kangaroo - május 27. - PC, PS4, PS5, Xbox One, Xbox Series X|S, Switch\r\n\r\nPac-Man Museum+ - május 27. - PC, PS4, Xbox One, Switch\r\n\r\nLapin - május 31. - PC', ''),
(61, 155, 'Admin2', 'Az Oscar-díjtól az akciós kosárig, és talán vissza a csúcsra - így alakult Nicolas Cage karrierje eddig.', 'Az éveken át tartó kritikai ekézést viszont az egyik legnagyobb elismerés követte. Az 1995-ös Las Vegas, végállomás című dráma elkészítésekor megint visszanyúlt a method acting módszeréhez és annak érdekében, hogy még élethűbben formálhassa meg alkoholista karakterét, egy ténylegesen az italtól függő színésszel töltött együtt sok időt. Az alakítás meghozta Cage-nek az egyetlen Oscar-díját, amit egy újabb jelölés követett, a 2003-as Adaptáció főszerepéért. Ebben Charlie Kaufman tudatának két teljesen ellentétes felét kellett megformálnia, ennek érdekében Cage összegörnyedve, merev háttal játszotta el a szorongó, depressziós Charlie-t, és egyenes háttal, lazán a magabiztos ikertestvérét, Donaldot (aki persze a valóságban csak Kaufman személyiségének egy másik aspektusa). Cage máskor is hajlamos volt rá, hogy teljesen elmerüljön szerepeiben, a Corelli kapitány mandolinja címszerepre kedvéért a nulláról tanult meg játszani mandolinon, az A szellemlovas spirituális aspektusát pedig úgy ragadta meg, hogy sok sámánhoz hasonlóan fehér-feketére festette az arcát.\n\nA két Oscar-jelölés közötti időszak viszont sokat lendített az ismertségén akciósztárként is, A Szikla, a Con Air - A fegyencjárat, illetve az Ál/Arc pedig pénzügyileg is jövedelmezőnek bizonyultak. Ezt a sort pedig folytatni is tudta, a 2006-os World Trade Center mellett jól teljesített a 2004-es A nemzet aranya, és három évvel később, Titkok könyve alcímmel megjelent folytatása is, és ugyan alapvetően nem akciófilmről van szó, de a Fegyvernepperben is elsüvít néhány lövedék, szintén sikeres fejezetet írva a korszakhoz, ami Cage mainstream sikerének talán a csúcsát jelentette. És ugyan a 2000-es Tolvajtempó sokak magyar tévénéző számára hiányozhat a fenti listából, az autólopásról szóló akciófilm pénzügyileg és kritikailag is bukásnak számított a korában.', '');

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
(93, 152, 'Jani', 'Jani@gmail.com', '{\"address\":\"4400, Nyíregyháza Nagy u. 7/14.\",\"firstname\":\"Móricz\",\"lastname\":\"János\",\"cardNumber\":\"1547125617852485\"}', '[141]', '[\"APPLE iPhone 13 Pro Max Grafit 128 GB Kártyafüggetlen Okostelefon\"]', 449999),
(94, 153, 'Levi', 'levi@gmail.com', '{\"address\":\"4400, Nyíregyháza Kiss u. 69\",\"firstname\":\"Lévai\",\"lastname\":\"Levente\",\"cardNumber\":\"1452768525367958\"}', '[131,138,142]', '[\"SAMSUNG UE 55 TU7022KXXH Crystal UHD 4K Smart TV\",\"MSI Katana GF66 11UE 9S7-158112-411 Gamer laptop (15,6\\\" FHD/Core i5/16GB/512 GB SSD/RTX3060 6GB/NoOS)\",\"XIAOMI REDMI NOTE 10 PRO 6/128 GB DualSIM Kék Kártyafüggetlen Okostelefon\"]', 699987),
(95, 153, 'Levi', 'levi@gmail.com', '{\"address\":\"4400, Nyíregyháza Kiss u. 69.\",\"firstname\":\"Lévai\",\"lastname\":\"Levente\",\"cardNumber\":\"1452768525367958\"}', '[136,140]', '[\"HP 250 G8 27K19EA laptop (15,6\\\" FHD/Celeron/4GB/256 GB SSD/Win10H)\",\"XIAOMI REDMI NOTE 10 5G 4/128 GB DualSIM Kék Kártyafüggetlen Okostelefon\"]', 208998);

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
(83, 152, 141, 'Jani', 5, 'Nagyon jó telefon. Jó a fényképek felbontása.'),
(84, 152, 134, 'Jani', 3, 'Nem a legjobb TV de az árához képest elfogadható.'),
(85, 152, 131, 'Jani', 4, 'Az egyetlen hibája, hogy nem túl gyakran nézek TV-t.'),
(86, 153, 131, 'Levi', 5, 'Minden funkciója kiválóan működik.'),
(87, 153, 138, 'Levi', 5, 'Minden játék kiválóan fut FPS vesztész nélkül.'),
(88, 153, 142, 'Levi', 4, 'Árkategóriában egy nagyon jó telefon.');

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
(152, 'Jani', 'Jani@gmail.com', '$2a$10$BC9sDuZK4S93kRppWv7tDOWJotq2aUlo6HvbCMYcssoFJhkOMeMQq', 'normal'),
(153, 'Levi', 'levi@gmail.com', '$2a$10$6bZxlRlnPUsGjhHwq3gJcutiv34nB5Y5aOAE8Rs0dvCIFiswZ8g2m', 'normal'),
(154, 'Admin1', 'admin1@techshop.hu', '$2a$10$VB83ncawpLH6vv8PgQ4PSeKuMKMBTOVtA7r9Ixic8zOOnLMYCbmhC', 'admin'),
(155, 'Admin2', 'admin2@techshop.hu', '$2a$10$kBjpAwza5tUebeQU1OpPdu1NwPp8/0PAY8iJnuUmg8AS3fVz/fY6e', 'admin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
