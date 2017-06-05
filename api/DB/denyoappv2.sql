-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 04, 2017 at 11:45 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `denyoappv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `alarms`
--

CREATE TABLE IF NOT EXISTS `alarms` (
  `alarms_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `alarms_date` date NOT NULL,
  `alarmcodes_subject` varchar(100) NOT NULL,
  `assignedby_users_id` int(11) NOT NULL DEFAULT '0',
  `assignedto_users_id` int(11) NOT NULL DEFAULT '0',
  `alarms_mentionat` varchar(100) NOT NULL DEFAULT '0',
  `alarms_remark` longtext NOT NULL,
  `alarms_status` int(11) NOT NULL DEFAULT '0',
  `alarms_assigndate` date DEFAULT NULL,
  `alarms_companys_id` int(11) NOT NULL,
  `alarms_currentdatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `alarmcodes_id` int(11) NOT NULL,
  `units_controllerid` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `commentnotifications`
--

CREATE TABLE IF NOT EXISTS `commentnotifications` (
  `commentnotifications_id` bigint(22) NOT NULL,
  `units_id` int(11) NOT NULL,
  `comments_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `commentresources`
--

CREATE TABLE IF NOT EXISTS `commentresources` (
  `commentresources_id` int(11) NOT NULL,
  `comments_id` varchar(255) NOT NULL,
  `commentresources_filename` varchar(255) NOT NULL,
  `commentresources_status` int(11) DEFAULT '0',
  `commentresources_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comments_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `units_id` int(11) NOT NULL,
  `comments_subject` varchar(255) NOT NULL,
  `comments_remark` text NOT NULL,
  `comments_hashtag` varchar(255) NOT NULL,
  `comments_isresourced` int(11) NOT NULL,
  `comments_status` int(11) NOT NULL DEFAULT '0',
  `comments_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comments_important` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `companygroups`
--

CREATE TABLE IF NOT EXISTS `companygroups` (
  `companygroup_id` int(11) NOT NULL,
  `companygroup_name` varchar(150) NOT NULL,
  `country` int(11) NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(50) NOT NULL,
  `deletestatus` int(1) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` datetime NOT NULL,
  `updatedby` int(11) NOT NULL,
  `updatedon` datetime NOT NULL,
  `totaluser` int(11) NOT NULL,
  `totalunit` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companygroups`
--

INSERT INTO `companygroups` (`companygroup_id`, `companygroup_name`, `country`, `address`, `contact`, `deletestatus`, `createdby`, `createdon`, `updatedby`, `updatedon`, `totaluser`, `totalunit`) VALUES
(3, 'ID:3 Tedt', 0, 'Gbvc', 'Dcccc', 0, 6, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 2, 1),
(4, 'ID:4 Blue star', 0, 'Fhfjjc', '9443976', 0, 6, '2017-05-29 04:00:41', 0, '0000-00-00 00:00:00', 0, 0),
(8, 'ID:8 Godrej', 0, 'No 123&#10;Poriyalar nagar&#10;Thiruppalai', '123 5*5', 0, 4, '2017-05-29 06:23:54', 0, '0000-00-00 00:00:00', 1, 2),
(9, 'ID:9 My testx', 0, 'Addressy', '915432', 0, 4, '2017-05-29 10:19:29', 5, '2017-05-30 02:58:50', 0, 0),
(11, 'ID:11 Ghh', 0, 'Vbbecs', 'Bvvbb', 0, 4, '2017-05-29 10:55:19', 0, '2017-05-31 02:15:10', 0, 0),
(12, '', 238, '', '', 0, 4, '2017-05-30 10:37:24', 0, '2017-06-03 11:38:36', 0, 0),
(13, '', 238, '', '1234556', 0, 6, '2017-05-30 10:40:31', 6, '2017-06-04 01:16:38', 0, 0),
(14, 'ID:14 My comp', 0, 'Adrr', '5432', 0, 6, '2017-05-30 02:14:15', 6, '2017-05-30 02:56:19', 0, 0),
(15, 'ID:15 New', 1, 'New addr', 'Dggg', 0, 5, '2017-05-30 03:01:32', 6, '2017-06-03 04:51:38', 0, 0),
(16, 'ID:16 New', 0, 'New addr', 'Dggg', 0, 5, '2017-05-30 03:01:32', 0, '0000-00-00 00:00:00', 0, 0),
(17, 'ID:17 Krishanth info solutions pvt', 0, 'No 384 Zion nagar', '9444637356', 0, 4, '2017-05-30 10:37:24', 5, '2017-05-30 09:54:57', 0, 0),
(18, 'ID:18 Xavier', 0, '123 ABC street', '600056235', 0, 5, '2017-05-30 07:00:00', 0, '0000-00-00 00:00:00', 0, 0),
(19, '19:Xavier', 0, '123 ABC street', '600056235', 0, 5, '2017-05-30 07:00:00', 0, '0000-00-00 00:00:00', 0, 0),
(20, 'My test', 0, 'Address goes here', '9443976954', 0, 6, '2017-05-31 01:58:10', 0, '0000-00-00 00:00:00', 0, 0),
(21, 'Ffvg', 0, 'Cvvv', '5122', 0, 0, '2017-05-31 06:09:31', 0, '0000-00-00 00:00:00', 0, 0),
(22, 'Vsbd', 0, 'Xvdhdhd', 'Bdhdghz', 0, 0, '2017-05-31 07:05:17', 0, '0000-00-00 00:00:00', 0, 0),
(23, 'HCL', 0, 'Charington road&#10;Chennai', '044432565599', 0, 0, '2017-05-31 11:03:32', 0, '0000-00-00 00:00:00', 0, 0),
(24, 'Test', 0, 'No 123', '60000000', 0, 0, '2017-06-01 01:38:30', 0, '0000-00-00 00:00:00', 0, 0),
(25, '', 0, '', '', 0, 0, '2017-06-02 08:30:07', 0, '0000-00-00 00:00:00', 0, 0),
(26, '', 0, '', '', 0, 0, '2017-06-02 08:31:12', 0, '0000-00-00 00:00:00', 0, 0),
(27, '', 0, '', '', 0, 0, '2017-06-02 08:31:25', 0, '0000-00-00 00:00:00', 0, 0),
(28, '', 0, '', '', 0, 0, '2017-06-02 08:46:14', 0, '0000-00-00 00:00:00', 0, 0),
(29, '', 0, '', '', 0, 0, '2017-06-02 08:55:51', 0, '0000-00-00 00:00:00', 0, 0),
(30, '', 0, '', '', 0, 0, '2017-06-02 09:02:01', 0, '0000-00-00 00:00:00', 0, 0),
(31, '', 0, '', '', 0, 0, '2017-06-02 09:03:39', 0, '0000-00-00 00:00:00', 0, 0),
(32, '', 0, '', '', 0, 0, '2017-06-02 09:04:20', 0, '0000-00-00 00:00:00', 0, 0),
(33, '', 0, '', '', 0, 0, '2017-06-02 09:09:22', 0, '0000-00-00 00:00:00', 0, 0),
(34, '', 0, '', '', 0, 0, '2017-06-02 09:10:27', 0, '0000-00-00 00:00:00', 0, 0),
(35, '', 0, '', '', 0, 0, '2017-06-02 09:10:52', 0, '0000-00-00 00:00:00', 0, 0),
(36, '', 0, '', '', 0, 0, '2017-06-02 09:15:43', 0, '0000-00-00 00:00:00', 0, 0),
(37, '', 0, '', '', 0, 0, '2017-06-02 09:25:43', 0, '0000-00-00 00:00:00', 0, 0),
(38, '', 0, '', '', 0, 0, '2017-06-02 09:31:56', 0, '0000-00-00 00:00:00', 0, 0),
(39, '', 0, '', '', 0, 0, '2017-06-02 09:41:57', 0, '0000-00-00 00:00:00', 0, 0),
(40, '', 0, '', '', 0, 0, '2017-06-02 10:18:56', 0, '0000-00-00 00:00:00', 0, 0),
(41, '', 0, '', '', 0, 0, '2017-06-02 10:31:39', 0, '0000-00-00 00:00:00', 0, 0),
(42, '', 0, '', '', 0, 0, '2017-06-02 10:32:28', 0, '0000-00-00 00:00:00', 0, 0),
(43, '', 0, '', '', 0, 0, '2017-06-02 10:33:11', 0, '0000-00-00 00:00:00', 0, 0),
(44, '', 0, '', '', 0, 0, '2017-06-02 10:33:31', 0, '0000-00-00 00:00:00', 0, 0),
(45, '', 0, '', '', 0, 0, '2017-06-02 10:34:08', 0, '0000-00-00 00:00:00', 0, 0),
(46, '', 0, '', '', 0, 0, '2017-06-02 10:34:08', 0, '0000-00-00 00:00:00', 0, 0),
(47, '', 0, '', '', 0, 0, '2017-06-02 10:38:04', 0, '0000-00-00 00:00:00', 0, 0),
(48, '', 0, '', '', 0, 0, '2017-06-02 10:38:30', 0, '0000-00-00 00:00:00', 0, 0),
(49, '', 0, '', '', 0, 0, '2017-06-02 10:39:33', 0, '0000-00-00 00:00:00', 0, 0),
(50, '', 0, '', '', 0, 0, '2017-06-02 10:39:58', 0, '0000-00-00 00:00:00', 0, 0),
(51, '', 0, '', '', 0, 0, '2017-06-02 10:40:25', 0, '0000-00-00 00:00:00', 0, 0),
(52, '', 0, '', '', 0, 0, '2017-06-02 10:40:54', 0, '0000-00-00 00:00:00', 0, 0),
(53, '', 0, '', '', 0, 0, '2017-06-02 10:41:49', 0, '0000-00-00 00:00:00', 0, 0),
(54, '', 0, '', '', 0, 0, '2017-06-02 10:42:15', 0, '0000-00-00 00:00:00', 0, 0),
(55, '', 0, '', '', 0, 0, '2017-06-02 10:42:50', 0, '0000-00-00 00:00:00', 0, 0),
(56, '', 0, '', '', 0, 0, '2017-06-02 10:43:22', 0, '0000-00-00 00:00:00', 0, 0),
(57, '', 0, '', '', 0, 0, '2017-06-02 10:44:01', 0, '0000-00-00 00:00:00', 0, 0),
(58, '', 0, '', '', 0, 0, '2017-06-02 10:44:31', 0, '0000-00-00 00:00:00', 0, 0),
(59, '', 0, '', '', 0, 0, '2017-06-02 10:44:54', 0, '0000-00-00 00:00:00', 0, 0),
(60, '', 0, '', '', 0, 0, '2017-06-02 10:45:22', 0, '0000-00-00 00:00:00', 0, 0),
(61, '', 0, '', '', 0, 0, '2017-06-02 10:46:10', 0, '0000-00-00 00:00:00', 0, 0),
(62, '', 0, '', '', 0, 0, '2017-06-02 10:46:48', 0, '0000-00-00 00:00:00', 0, 0),
(63, '', 0, '', '', 0, 0, '2017-06-02 10:47:18', 0, '0000-00-00 00:00:00', 0, 0),
(64, '', 0, '', '', 0, 0, '2017-06-02 10:47:45', 0, '0000-00-00 00:00:00', 0, 0),
(65, '', 0, '', '', 0, 0, '2017-06-02 10:48:45', 0, '0000-00-00 00:00:00', 0, 0),
(66, '', 0, '', '', 0, 0, '2017-06-03 02:04:32', 0, '0000-00-00 00:00:00', 0, 0),
(67, '', 0, '', '', 0, 0, '2017-06-03 02:08:17', 0, '0000-00-00 00:00:00', 0, 0),
(68, '', 0, '', '', 0, 0, '2017-06-03 02:10:27', 0, '0000-00-00 00:00:00', 0, 0),
(69, '', 0, '', '', 0, 0, '2017-06-03 02:11:40', 0, '0000-00-00 00:00:00', 0, 0),
(70, '', 0, '', '', 0, 0, '2017-06-03 02:13:29', 0, '0000-00-00 00:00:00', 0, 0),
(71, '', 0, '', '', 0, 0, '2017-06-03 02:14:11', 0, '0000-00-00 00:00:00', 0, 0),
(72, '', 0, '', '', 0, 0, '2017-06-03 02:17:10', 0, '0000-00-00 00:00:00', 0, 0),
(73, '', 0, '', '', 0, 0, '2017-06-03 02:20:41', 0, '0000-00-00 00:00:00', 0, 0),
(74, '', 0, '', '', 0, 0, '2017-06-03 02:21:28', 0, '0000-00-00 00:00:00', 0, 0),
(75, '', 0, '', '', 0, 0, '2017-06-03 02:23:24', 0, '0000-00-00 00:00:00', 0, 0),
(76, '', 0, '', '', 0, 0, '2017-06-03 02:25:14', 0, '0000-00-00 00:00:00', 0, 0),
(77, '', 0, '', '', 0, 0, '2017-06-03 02:35:34', 0, '0000-00-00 00:00:00', 0, 0),
(78, '', 0, '', '', 0, 0, '2017-06-03 02:36:53', 0, '0000-00-00 00:00:00', 0, 0),
(79, '', 0, '', '', 0, 0, '2017-06-03 02:41:09', 0, '0000-00-00 00:00:00', 0, 0),
(80, '', 0, '', '', 0, 0, '2017-06-03 02:41:29', 0, '0000-00-00 00:00:00', 0, 0),
(81, '', 0, '', '', 0, 0, '2017-06-03 02:46:40', 0, '0000-00-00 00:00:00', 0, 0),
(82, '', 0, '', '', 0, 6, '2017-06-03 02:57:47', 0, '0000-00-00 00:00:00', 0, 0),
(83, '', 0, '', '', 0, 6, '2017-06-03 02:57:58', 0, '0000-00-00 00:00:00', 0, 0),
(84, 'Rrrrt', 2, 'My', '0123456789', 0, 6, '2017-06-03 04:49:02', 0, '0000-00-00 00:00:00', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL,
  `country_code` varchar(2) NOT NULL DEFAULT '',
  `country_name` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=246 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country_code`, `country_name`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CG', 'Congo'),
(50, 'CK', 'Cook Islands'),
(51, 'CR', 'Costa Rica'),
(52, 'HR', 'Croatia (Hrvatska)'),
(53, 'CU', 'Cuba'),
(54, 'CY', 'Cyprus'),
(55, 'CZ', 'Czech Republic'),
(56, 'DK', 'Denmark'),
(57, 'DJ', 'Djibouti'),
(58, 'DM', 'Dominica'),
(59, 'DO', 'Dominican Republic'),
(60, 'TP', 'East Timor'),
(61, 'EC', 'Ecuador'),
(62, 'EG', 'Egypt'),
(63, 'SV', 'El Salvador'),
(64, 'GQ', 'Equatorial Guinea'),
(65, 'ER', 'Eritrea'),
(66, 'EE', 'Estonia'),
(67, 'ET', 'Ethiopia'),
(68, 'FK', 'Falkland Islands (Malvinas)'),
(69, 'FO', 'Faroe Islands'),
(70, 'FJ', 'Fiji'),
(71, 'FI', 'Finland'),
(72, 'FR', 'France'),
(73, 'FX', 'France, Metropolitan'),
(74, 'GF', 'French Guiana'),
(75, 'PF', 'French Polynesia'),
(76, 'TF', 'French Southern Territories'),
(77, 'GA', 'Gabon'),
(78, 'GM', 'Gambia'),
(79, 'GE', 'Georgia'),
(80, 'DE', 'Germany'),
(81, 'GH', 'Ghana'),
(82, 'GI', 'Gibraltar'),
(83, 'GK', 'Guernsey'),
(84, 'GR', 'Greece'),
(85, 'GL', 'Greenland'),
(86, 'GD', 'Grenada'),
(87, 'GP', 'Guadeloupe'),
(88, 'GU', 'Guam'),
(89, 'GT', 'Guatemala'),
(90, 'GN', 'Guinea'),
(91, 'GW', 'Guinea-Bissau'),
(92, 'GY', 'Guyana'),
(93, 'HT', 'Haiti'),
(94, 'HM', 'Heard and Mc Donald Islands'),
(95, 'HN', 'Honduras'),
(96, 'HK', 'Hong Kong'),
(97, 'HU', 'Hungary'),
(98, 'IS', 'Iceland'),
(99, 'IN', 'India'),
(100, 'IM', 'Isle of Man'),
(101, 'ID', 'Indonesia'),
(102, 'IR', 'Iran (Islamic Republic of)'),
(103, 'IQ', 'Iraq'),
(104, 'IE', 'Ireland'),
(105, 'IL', 'Israel'),
(106, 'IT', 'Italy'),
(107, 'CI', 'Ivory Coast'),
(108, 'JE', 'Jersey'),
(109, 'JM', 'Jamaica'),
(110, 'JP', 'Japan'),
(111, 'JO', 'Jordan'),
(112, 'KZ', 'Kazakhstan'),
(113, 'KE', 'Kenya'),
(114, 'KI', 'Kiribati'),
(115, 'KP', 'Korea, Democratic People''s Republic of'),
(116, 'KR', 'Korea, Republic of'),
(117, 'XK', 'Kosovo'),
(118, 'KW', 'Kuwait'),
(119, 'KG', 'Kyrgyzstan'),
(120, 'LA', 'Lao People''s Democratic Republic'),
(121, 'LV', 'Latvia'),
(122, 'LB', 'Lebanon'),
(123, 'LS', 'Lesotho'),
(124, 'LR', 'Liberia'),
(125, 'LY', 'Libyan Arab Jamahiriya'),
(126, 'LI', 'Liechtenstein'),
(127, 'LT', 'Lithuania'),
(128, 'LU', 'Luxembourg'),
(129, 'MO', 'Macau'),
(130, 'MK', 'Macedonia'),
(131, 'MG', 'Madagascar'),
(132, 'MW', 'Malawi'),
(133, 'MY', 'Malaysia'),
(134, 'MV', 'Maldives'),
(135, 'ML', 'Mali'),
(136, 'MT', 'Malta'),
(137, 'MH', 'Marshall Islands'),
(138, 'MQ', 'Martinique'),
(139, 'MR', 'Mauritania'),
(140, 'MU', 'Mauritius'),
(141, 'TY', 'Mayotte'),
(142, 'MX', 'Mexico'),
(143, 'FM', 'Micronesia, Federated States of'),
(144, 'MD', 'Moldova, Republic of'),
(145, 'MC', 'Monaco'),
(146, 'MN', 'Mongolia'),
(147, 'ME', 'Montenegro'),
(148, 'MS', 'Montserrat'),
(149, 'MA', 'Morocco'),
(150, 'MZ', 'Mozambique'),
(151, 'MM', 'Myanmar'),
(152, 'NA', 'Namibia'),
(153, 'NR', 'Nauru'),
(154, 'NP', 'Nepal'),
(155, 'NL', 'Netherlands'),
(156, 'AN', 'Netherlands Antilles'),
(157, 'NC', 'New Caledonia'),
(158, 'NZ', 'New Zealand'),
(159, 'NI', 'Nicaragua'),
(160, 'NE', 'Niger'),
(161, 'NG', 'Nigeria'),
(162, 'NU', 'Niue'),
(163, 'NF', 'Norfolk Island'),
(164, 'MP', 'Northern Mariana Islands'),
(165, 'NO', 'Norway'),
(166, 'OM', 'Oman'),
(167, 'PK', 'Pakistan'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestine'),
(170, 'PA', 'Panama'),
(171, 'PG', 'Papua New Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Peru'),
(174, 'PH', 'Philippines'),
(175, 'PN', 'Pitcairn'),
(176, 'PL', 'Poland'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'RE', 'Reunion'),
(181, 'RO', 'Romania'),
(182, 'RU', 'Russian Federation'),
(183, 'RW', 'Rwanda'),
(184, 'KN', 'Saint Kitts and Nevis'),
(185, 'LC', 'Saint Lucia'),
(186, 'VC', 'Saint Vincent and the Grenadines'),
(187, 'WS', 'Samoa'),
(188, 'SM', 'San Marino'),
(189, 'ST', 'Sao Tome and Principe'),
(190, 'SA', 'Saudi Arabia'),
(191, 'SN', 'Senegal'),
(192, 'RS', 'Serbia'),
(193, 'SC', 'Seychelles'),
(194, 'SL', 'Sierra Leone'),
(195, 'SG', 'Singapore'),
(196, 'SK', 'Slovakia'),
(197, 'SI', 'Slovenia'),
(198, 'SB', 'Solomon Islands'),
(199, 'SO', 'Somalia'),
(200, 'ZA', 'South Africa'),
(201, 'GS', 'South Georgia South Sandwich Islands'),
(202, 'ES', 'Spain'),
(203, 'LK', 'Sri Lanka'),
(204, 'SH', 'St. Helena'),
(205, 'PM', 'St. Pierre and Miquelon'),
(206, 'SD', 'Sudan'),
(207, 'SR', 'Suriname'),
(208, 'SJ', 'Svalbard and Jan Mayen Islands'),
(209, 'SZ', 'Swaziland'),
(210, 'SE', 'Sweden'),
(211, 'CH', 'Switzerland'),
(212, 'SY', 'Syrian Arab Republic'),
(213, 'TW', 'Taiwan'),
(214, 'TJ', 'Tajikistan'),
(215, 'TZ', 'Tanzania, United Republic of'),
(216, 'TH', 'Thailand'),
(217, 'TG', 'Togo'),
(218, 'TK', 'Tokelau'),
(219, 'TO', 'Tonga'),
(220, 'TT', 'Trinidad and Tobago'),
(221, 'TN', 'Tunisia'),
(222, 'TR', 'Turkey'),
(223, 'TM', 'Turkmenistan'),
(224, 'TC', 'Turks and Caicos Islands'),
(225, 'TV', 'Tuvalu'),
(226, 'UG', 'Uganda'),
(227, 'UA', 'Ukraine'),
(228, 'AE', 'United Arab Emirates'),
(229, 'GB', 'United Kingdom'),
(230, 'US', 'United States'),
(231, 'UM', 'United States minor outlying islands'),
(232, 'UY', 'Uruguay'),
(233, 'UZ', 'Uzbekistan'),
(234, 'VU', 'Vanuatu'),
(235, 'VA', 'Vatican City State'),
(236, 'VE', 'Venezuela'),
(237, 'VN', 'Vietnam'),
(238, 'VG', 'Virgin Islands (British)'),
(239, 'VI', 'Virgin Islands (U.S.)'),
(240, 'WF', 'Wallis and Futuna Islands'),
(241, 'EH', 'Western Sahara'),
(242, 'YE', 'Yemen'),
(243, 'ZR', 'Zaire'),
(244, 'ZM', 'Zambia'),
(245, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'Super Admin'),
(2, 'Admin'),
(3, 'Supervisor');

-- --------------------------------------------------------

--
-- Table structure for table `unitgroups`
--

CREATE TABLE IF NOT EXISTS `unitgroups` (
  `unitgroup_id` int(11) NOT NULL,
  `unitgroup_name` varchar(150) NOT NULL,
  `unitgroup_colorcode` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  `unitgroup_remark` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE IF NOT EXISTS `userdetails` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` int(11) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `photo` text NOT NULL,
  `job_position` varchar(50) NOT NULL,
  `report_to` int(11) NOT NULL,
  `company_group` int(111) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`id`, `user_id`, `first_name`, `last_name`, `email`, `country`, `contact`, `photo`, `job_position`, `report_to`, `company_group`) VALUES
(1, 1, 'ambiga', 'college', 'ambiga@gmail.com', 1, '959499495959', '', 'Sr Prog', 1, 1),
(2, 2, 'Vasab', 'Eye Care Hospita', 'vasan@gmail.com', 1, '765656', '', 'Assist Professor', 2, 2),
(3, 3, 'Naveen', 'Bakery', 'naveenbakery@gmail.com', 1, '944385848', '', 'Cooking Head', 3, 3),
(4, 4, 'Thangamayil', 'Jewellery', 'thangamayil@gmail.com', 1, '8577457564', '', 'Accountant', 4, 4),
(5, 5, 'Aravind ', 'Eye', 'aravind@gmail.com', 1, '7567467675767', '', 'Eye Specialist', 5, 23),
(6, 6, 'Webneo', 'Tecch', 'info@webneo.in', 1, '85866575775', '', 'Sr Developer', 6, 24),
(7, 7, 'Ashok', 'Kumar', 'ashok@gmail.com', 1, '6564656646', '', 'Sr Manager', 7, 7),
(8, 11, 'Kannan', 'Nagarathinam', 'kannanrathvalli@gmail.com', 0, '', '1496476543462.jpg', 'Software Engineer', 3, 4),
(9, 12, 'Kannan', 'Nagarathinam', 'kannanrathvalli@gmail.com', 238, '', '1496478282982.jpg', 'Software Engineer', 6, 23),
(10, 13, 'Kannann', 'Nagarathinamk', 'kannanrathvalli@gmail.com', 139, '1234567891', '1496478282982.jpg', 'Software Engineer one', 1, 4),
(11, 14, 'Kannan', 'Nagarathinam', 'kannanrathvalli@gmail.com', 238, '9443976954', '1496479225178.jpg', 'Software Engineer', 6, 23),
(12, 15, 'undefined', 'undefined', 'undefined', 0, 'undefined', 'undefined', 'Software Engineer', 6, 23),
(13, 16, 'undefined', 'undefined', 'undefined', 0, 'undefined', 'undefined', 'Software Engineer', 6, 23),
(14, 17, 'undefined', 'undefined', 'undefined', 0, 'undefined', 'undefined', 'Software Engineer', 6, 23),
(15, 18, 'Nk', 'Kn', 'nk@gnail.com', 5, '123', '1496555229663.jpg', 'Super sr', 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `hashtag` varchar(255) NOT NULL,
  `deletestatus` int(1) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createdon` datetime NOT NULL,
  `updatedby` int(11) NOT NULL,
  `updatedon` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `hashtag`, `deletestatus`, `createdby`, `createdon`, `updatedby`, `updatedon`) VALUES
(1, 'ambiga', 'ambiga', 1, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(2, 'vasan', 'vasan', 2, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(3, 'naveen', 'naveen', 3, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(4, 'thangamayil', 'thangamayil', 3, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(5, 'aravind', 'aravind', 2, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(6, 'webneo', 'webneo', 1, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(7, 'ashok', 'ashok', 3, '', 0, 1, '2017-06-16 00:00:00', 0, '0000-00-00 00:00:00'),
(9, 'webkannan', 'webkannan', 1, '@India', 0, 6, '2017-06-03 03:57:46', 0, '0000-00-00 00:00:00'),
(10, 'webkannan', 'webkannan', 1, '@India', 0, 6, '2017-06-03 04:05:46', 0, '0000-00-00 00:00:00'),
(11, 'webkannan', 'webkannan', 1, '@India', 0, 6, '2017-06-03 04:09:22', 0, '0000-00-00 00:00:00'),
(12, 'webkannan', 'webkannan', 3, '@India', 0, 6, '2017-06-03 04:32:01', 0, '0000-00-00 00:00:00'),
(13, 'webkannan', 'webkannan', 1, '@India no1', 0, 6, '2017-06-03 04:35:21', 6, '2017-06-04 11:40:59'),
(14, 'webkannan', 'webkannan', 3, '@India', 0, 6, '2017-06-03 04:46:20', 0, '0000-00-00 00:00:00'),
(15, 'webkannan', 'webkannan', 3, '@India', 0, 0, '2017-06-04 12:13:09', 0, '0000-00-00 00:00:00'),
(16, 'webkannan', 'webkannan', 3, '@India', 0, 0, '2017-06-04 12:13:33', 0, '0000-00-00 00:00:00'),
(17, 'webkannan', 'webkannan', 3, '@India', 0, 0, '2017-06-04 12:15:55', 0, '0000-00-00 00:00:00'),
(18, 'kgkrish', 'k', 3, '@facebook', 0, 6, '2017-06-04 01:53:21', 0, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alarms`
--
ALTER TABLE `alarms`
  ADD PRIMARY KEY (`alarms_id`),
  ADD KEY `unitid` (`unit_id`);

--
-- Indexes for table `commentnotifications`
--
ALTER TABLE `commentnotifications`
  ADD PRIMARY KEY (`commentnotifications_id`);

--
-- Indexes for table `commentresources`
--
ALTER TABLE `commentresources`
  ADD PRIMARY KEY (`commentresources_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comments_id`),
  ADD KEY `unitid` (`units_id`);

--
-- Indexes for table `companygroups`
--
ALTER TABLE `companygroups`
  ADD PRIMARY KEY (`companygroup_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unitgroups`
--
ALTER TABLE `unitgroups`
  ADD PRIMARY KEY (`unitgroup_id`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alarms`
--
ALTER TABLE `alarms`
  MODIFY `alarms_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `commentnotifications`
--
ALTER TABLE `commentnotifications`
  MODIFY `commentnotifications_id` bigint(22) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `commentresources`
--
ALTER TABLE `commentresources`
  MODIFY `commentresources_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comments_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `companygroups`
--
ALTER TABLE `companygroups`
  MODIFY `companygroup_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=246;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `unitgroups`
--
ALTER TABLE `unitgroups`
  MODIFY `unitgroup_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
