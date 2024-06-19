-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 19, 2024 at 08:42 AM
-- Server version: 8.3.0
-- PHP Version: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expressvue3`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'bkn1Jogja');

-- --------------------------------------------------------

--
-- Table structure for table `instansi`
--

DROP TABLE IF EXISTS `instansi`;
CREATE TABLE IF NOT EXISTS `instansi` (
  `id` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `used_count` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `instansi`
--

INSERT INTO `instansi` (`id`, `name`, `used_count`) VALUES
('6300', 'Pemerintah Daerah D I Yogyakarta', 0),
('6411', 'Pemerintah Kab. Pemalang', 0),
('6407', 'Pemerintah Kab. Tegal', 0),
('6408', 'Pemerintah Kab. Brebes', 0),
('6475', 'Pemerintah Kota Magelang', 0),
('6476', 'Pemerintah Kota Surakarta', 0),
('6472', 'Pemerintah Kota Salatiga', 0),
('6471', 'Pemerintah Kota Semarang', 0),
('6473', 'Pemerintah Kota Pekalongan', 0),
('6474', 'Pemerintah Kota Tegal', 0),
('6304', 'Pemerintah Kab. Kulon Progo', 0),
('6301', 'Pemerintah Kab. Bantul', 0),
('6416', 'Pemerintah Kab. Cilacap', 0),
('6415', 'Pemerintah Kab. Banyumas', 0),
('6417', 'Pemerintah Kab. Purbalingga', 0),
('6403', 'Pemerintah Kab. Demak', 0),
('6418', 'Pemerintah Kab. Banjarnegara', 0),
('6423', 'Pemerintah Kab. Kebumen', 0),
('6422', 'Pemerintah Kab. Purworejo', 0),
('6421', 'Pemerintah Kab. Wonosobo', 0),
('6419', 'Pemerintah Kab. Magelang', 0),
('6425', 'Pemerintah Kab. Boyolali', 0),
('6424', 'Pemerintah Kab. Klaten', 0),
('6410', 'Pemerintah Kab. Kudus', 0),
('6412', 'Pemerintah Kab. Jepara', 0),
('6427', 'Pemerintah Kab. Sukoharjo', 0),
('6429', 'Pemerintah Kab. Wonogiri', 0),
('6401', 'Pemerintah Kab. Semarang', 0),
('6420', 'Pemerintah Kab. Temanggung', 0),
('6402', 'Pemerintah Kab. Kendal', 0),
('6406', 'Pemerintah Kab. Batang', 0),
('6405', 'Pemerintah Kab. Pekalongan', 0),
('6428', 'Pemerintah Kab. Karanganyar', 0),
('6426', 'Pemerintah Kab. Sragen', 0),
('6404', 'Pemerintah Kab. Grobogan', 0),
('6414', 'Pemerintah Kab. Blora', 0),
('6413', 'Pemerintah Kab. Rembang', 0),
('6409', 'Pemerintah Kab. Pati', 0),
('6400', 'Pemerintah Provinsi Jawa Tengah', 0),
('6303', 'Pemerintah Kab. Gunung Kidul', 0),
('6302', 'Pemerintah Kab. Sleman', 0),
('6371', 'Pemerintah Kota Yogyakarta', 0);

-- --------------------------------------------------------

--
-- Table structure for table `instansi_copy1`
--

DROP TABLE IF EXISTS `instansi_copy1`;
CREATE TABLE IF NOT EXISTS `instansi_copy1` (
  `id` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `used_count` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `instansi_copy1`
--

INSERT INTO `instansi_copy1` (`id`, `name`, `used_count`) VALUES
('6300', 'Pemerintah Daerah D I Yogyakarta', 0),
('6411', 'Pemerintah Kab. Pemalang', 0),
('6407', 'Pemerintah Kab. Tegal', 0),
('6408', 'Pemerintah Kab. Brebes', 0),
('6475', 'Pemerintah Kota Magelang', 0),
('6476', 'Pemerintah Kota Surakarta', 0),
('6472', 'Pemerintah Kota Salatiga', 0),
('6471', 'Pemerintah Kota Semarang', 0),
('6473', 'Pemerintah Kota Pekalongan', 0),
('6474', 'Pemerintah Kota Tegal', 0),
('6304', 'Pemerintah Kab. Kulon Progo', 0),
('6301', 'Pemerintah Kab. Bantul', 0),
('6416', 'Pemerintah Kab. Cilacap', 0),
('6415', 'Pemerintah Kab. Banyumas', 0),
('6417', 'Pemerintah Kab. Purbalingga', 0),
('6403', 'Pemerintah Kab. Demak', 0),
('6418', 'Pemerintah Kab. Banjarnegara', 0),
('6423', 'Pemerintah Kab. Kebumen', 0),
('6422', 'Pemerintah Kab. Purworejo', 0),
('6421', 'Pemerintah Kab. Wonosobo', 0),
('6419', 'Pemerintah Kab. Magelang', 0),
('6425', 'Pemerintah Kab. Boyolali', 0),
('6424', 'Pemerintah Kab. Klaten', 0),
('6410', 'Pemerintah Kab. Kudus', 0),
('6412', 'Pemerintah Kab. Jepara', 0),
('6427', 'Pemerintah Kab. Sukoharjo', 0),
('6429', 'Pemerintah Kab. Wonogiri', 0),
('6401', 'Pemerintah Kab. Semarang', 0),
('6420', 'Pemerintah Kab. Temanggung', 0),
('6402', 'Pemerintah Kab. Kendal', 0),
('6406', 'Pemerintah Kab. Batang', 0),
('6405', 'Pemerintah Kab. Pekalongan', 0),
('6428', 'Pemerintah Kab. Karanganyar', 0),
('6426', 'Pemerintah Kab. Sragen', 0),
('6404', 'Pemerintah Kab. Grobogan', 0),
('6414', 'Pemerintah Kab. Blora', 0),
('6413', 'Pemerintah Kab. Rembang', 0),
('6409', 'Pemerintah Kab. Pati', 0),
('6400', 'Pemerintah Provinsi Jawa Tengah', 0),
('6303', 'Pemerintah Kab. Gunung Kidul', 0),
('6302', 'Pemerintah Kab. Sleman', 0),
('6371', 'Pemerintah Kota Yogyakarta', 0),
('1010', 'Kementerian Koordinator Bidang Politik, Hukum dan Keamanan', 0),
('1020', 'Kementerian Koordinator Bidang Perekonomian', 0),
('1030', 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan', 0),
('2040', 'Kementerian Badan Usaha Milik Negara', 0),
('2060', 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi', 0),
('3001', 'Kementerian Dalam Negeri', 0),
('3002', 'Kementerian Luar Negeri', 0),
('3003', 'Kementerian Pertahanan', 0),
('3004', 'Kementerian Hukum dan Hak Asasi Manusia', 0),
('3005', 'Kementerian Keuangan', 0),
('3006', 'Kementerian Pertanian', 0),
('3008', 'Kementerian Energi dan Sumber Daya Mineral', 0),
('3010', 'Kementerian Pendidikan dan Kebudayaan', 0),
('3011', 'Kementerian Kesehatan', 0),
('3013', 'Kementerian Ketenagakerjaan', 0),
('3014', 'Kementerian Sosial', 0),
('3015', 'Kementerian Lingkungan Hidup dan Kehutanan', 0),
('3020', 'Kementerian Perindustrian', 0),
('4001', 'Kementerian Sekretariat Negara', 0),
('3016', 'Kementerian Kelautan dan Perikanan', 0),
('4002', 'Kejaksaan Agung', 0),
('4004', 'Sekretariat Jenderal MPR', 0),
('4006', 'Sekretariat Jenderal DPR RI', 0),
('4007', 'Mahkamah Agung RI', 0),
('4009', 'Setjen WANTANNAS', 0),
('4010', 'Lembaga Sandi Negara', 0),
('4014', 'Lembaga Ilmu Pengetahuan Indonesia', 0),
('4037', 'Sekretariat Presiden', 0),
('4016', 'Badan Pusat Statistik ', 0),
('4018', 'Arsip Nasional Republik Indonesia ', 0),
('4028', 'Badan Pengawas Tenaga Nuklir ', 0),
('4032', 'Lembaga Ketahanan Nasional RI', 0),
('4034', 'MABES TNI', 0),
('4036', 'Sekretariat Kabinet ', 0),
('4039', 'Sekretariat Militer', 0),
('4008', 'Badan Pemeriksa Keuangan ', 0),
('4011', 'Badan Kepegawaian Negara', 0),
('4015', 'Badan Tenaga Nuklir Nasional ', 0),
('4017', 'Kementerian Perencanaan Pembangunan Nasional/Bappenas', 0),
('4019', 'Badan Informasi Geospasial', 0),
('4021', 'Badan Koordinasi Penanaman Modal', 0),
('4023', 'Badan Pengawasan Keuangan dan Pembangunan', 0),
('4024', 'Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional', 0),
('4027', 'Badan Standardisasi Nasional ', 0),
('4033', 'Kepolisian Negara', 0),
('4035', 'Badan Meteorologi, Klimatologi dan Geofisika', 0),
('4025', 'Perpustakaan Nasional RI', 0),
('4038', 'Sekretariat Wakil Presiden', 0),
('4040', 'Badan Narkotika Nasional', 0),
('1040', 'Kementerian Koordinator Bidang Kemaritiman', 0),
('2000', 'Kementerian Riset, Teknologi, dan Pendidikan Tinggi', 0),
('2010', 'Kementerian Koperasi dan Usaha Kecil dan Menengah', 0),
('2020', 'Kementerian Lingkungan Hidup', 0),
('2050', 'Kementerian Pemberdayaan Perempuan dan Perlindungan Anak', 0),
('2100', 'Kementerian Pemuda dan Olahraga', 0),
('2110', 'Kementerian Perumahan Rakyat', 0),
('3009', 'Kementerian Perhubungan', 0),
('2120', 'Kementerian Desa, Pembangunan Daerah Tertinggal dan Transmigrasi', 0),
('3012', 'Kementerian Agama', 0),
('3018', 'Kementerian Komunikasi dan Informatika', 0),
('3019', 'Kementerian Perdagangan', 0),
('3021', 'Kementerian Pekerjaan Umum dan Perumahan Rakyat', 0),
('3022', 'Kementerian Pariwisata', 0),
('4003', 'Badan Intelijen Negara', 0),
('4005', 'Setjen DPA', 0),
('4012', 'Lembaga Administrasi Negara ', 0),
('4013', 'Lembaga Penerbangan dan Antariksa Nasional', 0),
('4020', 'Badan Kependudukan dan Keluarga Berencana Nasional', 0),
('4022', 'Badan Pengkajian dan Penerapan Teknologi', 0),
('4031', 'Badan Pengawas Obat dan Makanan ', 0),
('4041', 'Setjen Komisi Pemilihan Umum', 0),
('4043', 'Badan Nasional Penanggulangan Bencana', 0),
('4044', 'Setjen KOMNAS HAM', 0),
('4045', 'Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam', 0),
('4046', 'Kepaniteraan dan Sekretariat Jenderal Mahkamah Konstitusi RI', 0),
('4048', 'Setjen KORPRI', 0),
('4047', 'Setjen Komisi Pemberantasan Korupsi', 0),
('4049', 'Sekretariat Jenderal Komisi Yudisial', 0),
('4050', 'Setjen Dewan Perwakilan Daerah', 0),
('4052', 'Badan Keamanan Laut RI', 0),
('4051', 'Badan Nasional Penempatan Perlindungan TKI', 0),
('4053', 'Badan SAR Nasional', 0),
('4054', 'Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah', 0),
('4055', 'Pusat Pelaporan dan Analisis Transaksi Keuangan', 0),
('4056', 'Ombudsman Republik Indonesia', 0),
('4057', 'TELEVISI REPUBLIK INDONESIA', 0),
('4058', 'RADIO REPUBLIK INDONESIA', 0),
('4059', 'Badan Nasional Pengelola Perbatasan', 0),
('4060', 'Badan Nasional Penanggulangan Terorisme', 0),
('4061', 'Setjen Komisi Pengawas Persaingan Usaha', 0),
('4062', 'Badan Pengawas Pemilihan Umum', 0),
('4063', 'Komisi Aparatur Sipil Negara', 0),
('4064', 'Badan Ekonomi Kreatif', 0),
('4071', 'Badan Karantina Indonesia', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

DROP TABLE IF EXISTS `jadwal`;
CREATE TABLE IF NOT EXISTS `jadwal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `status` enum('available','booked') DEFAULT 'available',
  `used_count` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id`, `tanggal`, `status`, `used_count`) VALUES
(1, '2024-06-24', 'available', 0),
(2, '2024-07-01', 'available', 0),
(3, '2024-07-08', 'available', 0),
(4, '2024-07-15', 'available', 0),
(5, '2024-07-22', 'available', 0),
(6, '2024-07-29', 'available', 0),
(7, '2024-08-05', 'available', 0),
(8, '2024-08-12', 'available', 0),
(9, '2024-08-19', 'available', 0),
(10, '2024-08-26', 'available', 0),
(11, '2024-09-02', 'available', 0),
(12, '2024-09-09', 'available', 0),
(13, '2024-09-23', 'available', 0),
(14, '2024-09-30', 'available', 0),
(15, '2024-10-07', 'available', 0),
(16, '2024-10-14', 'available', 0),
(17, '2024-10-21', 'available', 0),
(18, '2024-10-28', 'available', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `instansi_id` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `whatsapp` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
