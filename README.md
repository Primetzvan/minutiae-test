<p align="center">
  <img src="/design/logo.svg" width="320" alt="Minutiae Logo" />
</p>

# Minutiae

## proof of concept

## About The Project

Minutiae is an open source, MIT Licenced software for a fingerprint system and a cooperation project with the [OTELO Gmunden](https://otelo.or.at/standort/gmunden/) and [pcode](https://www.pcode.at/). While Minutiae provides the frontend, the backend and the database, the co-projects takes over the hardware and the hardware related code.

The project idea is a system in which users and administrators exist. Users can use fingerprint sensors and unlock / lock doors according to their authorizations. There is a web interface for administrators through which they can make various system settings. This eg. includes adding new users and doors.

## Technologies

- **Frontend**: React
- **Backend**: NestJs
- **Database**: MariaDB with Galera Cluster

## Project Folder Description

- **backend**: Provides rest interface and an mqtt connection to the hardware
- **frontend**: Provides the website
- **datamodels**: Contains all the datamodels
- **docker**: An unfinished dockerscript for mariadb with galera cluster on raspberry pi
- **design**: Contains logos and design concept
- **config-example**: An example of the startscript we use

## Getting Started

A description for using the system is on the [website]().

## Hardware Installation

The hardwareproject is available on:

[fp-server](https://github.com/ElektronikNode/fp-server)
