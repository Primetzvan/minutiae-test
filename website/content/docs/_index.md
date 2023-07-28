---
title: 'Overview'
date: 2018-11-28T15:14:39+10:00
weight: 1
---

## The project

Minutiae is an open source, MIT Licenced software for a fingerprint system and a [cooperation project](link)
with the OTELO Gmunden.
While Minutiae provides the frontend, the backend and the database, the co-projects takes over the hardware and the
hardware related code.

The project idea is a system in which users and administrators exist. Users can use fingerprint sensors and unlock / lock doors according to their authorizations.
There is a web interface for administrators through which they can make various system settings. This eg. includes adding new users and doors.

### Hardware

**Requirements** 

The details can be found in the [hardware project](link), but here is a summary:
- One Raspberry Pi (= Microcontroller) + custom shield per door
- One fingerprint sensor per door
- A working local network (=> router/switch/..), but not necessarily an internet connection for the running system 

Each microcontroller is managing one single door and also has its own backend, frontend and database running on it.
The advantage of this decentralized system is, that even if one door is seperated from the other doors for some reason, it will still work on its own 
(even though changes are not effective for it anymore, of course), and also there is no central server if dying would make the whole system inoperable.

### Frontend

The frontend is written in React and summarized provides following functionality:

- Add new Users and Admins and store some further information like address, full name, phone number,.. if wanted.
- Add a fingerprint for an existing user.
- Grant users access for certain doors.
- Add new doors and download the config files for their controllers.
- View logs of the system usage

![Frontend Screencast](/terminal.gif)

### Backend

The NestJs backend provides the data for the frontend using the REST Api on the one hand 
and also takes over the communication with the fingerprint sensor control software, using MQTT.
This is needed eg. for persisting the logs, getting the fingerprints for a new user and check if the user has access for a door, when he tries to enter.

### Database

As db technology MariaDb with Galera Cluster is used. Since the system is decentralized, the Galera Cluster takes care of keeping all databases synchronized.
So that no matter on which raspberries frontend the admin makes changes to the system, it will be effective on every door.

## Overview