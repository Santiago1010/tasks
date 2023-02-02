-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-02-2023 a las 16:18:25
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `task`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `cron_expression` varchar(100) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Expresión Cron para la programación de la tarea',
  `url` varchar(255) COLLATE utf8_spanish_ci NOT NULL COMMENT 'URL a la cual se hará el ping',
  `extracted_data` longtext COLLATE utf8_spanish_ci NOT NULL COMMENT 'Datos extraídos del ping a la URL',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `headers` longtext COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla que almacena las tareas programadas para hacer ping a un sitio web y extraer encabezados o los primeros 1000 caracteres.';

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `cron_expression`, `url`, `extracted_data`, `created_at`, `updated_at`, `headers`) VALUES
(1, '* * * * *', 'https://en.wikipedia.org/wiki/Cron', '\"<!DOCTYPE html>\\n<html class=\\\"client-nojs\\\" lang=\\\"en\\\" dir=\\\"ltr\\\">\\n<head>\\n<meta charset=\\\"UTF-8\\\"/>\\n<title>cron - Wikipedia</title>\\n<script>document.documentElement.className=\\\"client-js\\\";RLCONF={\\\"wgBreakFrames\\\":false,\\\"wgSeparatorTransformTable\\\":[\\\"\\\",\\\"\\\"],\\\"wgDigitTransformTable\\\":[\\\"\\\",\\\"\\\"],\\\"wgDefaultDateFormat\\\":\\\"dmy\\\",\\\"wgMonthNames\\\":[\\\"\\\",\\\"January\\\",\\\"February\\\",\\\"March\\\",\\\"April\\\",\\\"May\\\",\\\"June\\\",\\\"July\\\",\\\"August\\\",\\\"September\\\",\\\"October\\\",\\\"November\\\",\\\"December\\\"],\\\"wgRequestId\\\":\\\"a8c502aa-b5c7-4979-b6b3-a4fdfa374e1c\\\",\\\"wgCSPNonce\\\":false,\\\"wgCanonicalNamespace\\\":\\\"\\\",\\\"wgCanonicalSpecialPageName\\\":false,\\\"wgNamespaceNumber\\\":0,\\\"wgPageName\\\":\\\"Cron\\\",\\\"wgTitle\\\":\\\"Cron\\\",\\\"wgCurRevisionId\\\":1129569272,\\\"wgRevisionId\\\":1129569272,\\\"wgArticleId\\\":476767,\\\"wgIsArticle\\\":true,\\\"wgIsRedirect\\\":false,\\\"wgAction\\\":\\\"view\\\",\\\"wgUserName\\\":null,\\\"wgUserGroups\\\":[\\\"*\\\"],\\\"wgCategories\\\":[\\\"CS1 errors: missing title\\\",\\\"CS1 errors: bare URL\\\",\\\"Articles with short description\\\",\\\"Short description is different from Wikidata\\\",\\\"Articles needing additional references from Novem\"', '2023-02-02 13:24:37', '2023-02-02 13:24:37', '{\"date\":\"Thu, 02 Feb 2023 10:58:37 GMT\",\"server\":\"mw1349.eqiad.wmnet\",\"x-content-type-options\":\"nosniff\",\"content-language\":\"en\",\"vary\":\"Accept-Encoding,Cookie,Authorization\",\"last-modified\":\"Thu, 02 Feb 2023 10:58:25 GMT\",\"content-type\":\"text/html; charset=UTF-8\",\"age\":\"8762\",\"x-cache\":\"cp1085 hit, cp1089 hit/23\",\"x-cache-status\":\"hit-front\",\"server-timing\":\"cache;desc=\\\"hit-front\\\", host;desc=\\\"cp1089\\\"\",\"strict-transport-security\":\"max-age=106384710; includeSubDomains; preload\",\"report-to\":\"{ \\\"group\\\": \\\"wm_nel\\\", \\\"max_age\\\": 86400, \\\"endpoints\\\": [{ \\\"url\\\": \\\"https://intake-logging.wikimedia.org/v1/events?stream=w3c.reportingapi.network_error&schema_uri=/w3c/reportingapi/network_error/1.0.0\\\" }] }\",\"nel\":\"{ \\\"report_to\\\": \\\"wm_nel\\\", \\\"max_age\\\": 86400, \\\"failure_fraction\\\": 0.05, \\\"success_fraction\\\": 0.0}\",\"set-cookie\":[\"WMF-Last-Access=02-Feb-2023;Path=/;HttpOnly;secure;Expires=Mon, 06 Mar 2023 12:00:00 GMT\",\"WMF-Last-Access-Global=02-Feb-2023;Path=/;Domain=.wikipedia.org;HttpOnly;secure;Expires=Mon, 06 Mar 2023 12:00:00 GMT\",\"GeoIP=CO:DC:Bogot__:4.64:-74.07:v4; Path=/; secure; Domain=.wikipedia.org\"],\"accept-ch\":\"Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Model,Sec-CH-UA-Platform-Version\",\"permissions-policy\":\"interest-cohort=(),ch-ua-arch=(self \\\"intake-analytics.wikimedia.org\\\"),ch-ua-bitness=(self \\\"intake-analytics.wikimedia.org\\\"),ch-ua-full-version-list=(self \\\"intake-analytics.wikimedia.org\\\"),ch-ua-model=(self \\\"intake-analytics.wikimedia.org\\\"),ch-ua-platform-version=(self \\\"intake-analytics.wikimedia.org\\\")\",\"x-client-ip\":\"186.84.88.197\",\"cache-control\":\"private, s-maxage=0, max-age=0, must-revalidate\",\"accept-ranges\":\"bytes\",\"content-length\":\"137664\",\"connection\":\"close\"}');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
