---
title: 'Install system'
date: 2021-10-02T19:27:37+10:00
draft: false
weight: 3
type: install
summary: Instruction for installing the first door.
---

The installation just includes the first raspberry, for adding more doors please follow the [update system](../../../delete/specimen/index.md) instructions  

## Set up raspberry pi

### Download OS

- Download and install [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to a computer with an SD card reader. 
- Put the SD card you'll use with your Raspberry Pi into the reader and run Raspberry Pi Imager. 
You will have to choose of some different OS Images.
We recommend using raspbian lite (which has no GUI), you can also use another one, like raspbian (has a UI) for example 
- Repeat this step for each door raspberries

### Configuration

- Insert SD Card, Monitor and Keyboard into Raspberry 
- The standard username for raspbian lite is `pi` and the password `raspberry`. Since the keyboard layout is english on default, you'll have to type `raspberrz`
if you are using a german keyboard
- change the keyboard layout (if necessary):
    - `sudo raspi-config` (the minus is on the 'ß' key) -> "Localisation Options" -> "Change Keyboard Layout" -> pick the keyboard model you are using -> select the keyboard layout (if you select "other" you'll find other options than english ones)

- Change the password
    - `passwd`

## Hardware

For the hardware set up we relegate to [another project](https://github.com/ElektronikNode/fp-server).  
We suggest doing the hardware set up on a table first and install the system on your door when you installed everything.
Consider that you have to know the Raspberries future IP address for this, you can solve this with using static ips instead of dynamic ones for example. 

## Download files

* For the first door you can download the files from our [download page](../../../delete/specimen/index.md)
  * You'll get 2 Zip folders, extract them and put them all on an usb stick into a folder called `newcluster`
* When using this page, you'll have to insert an IP address, you can type `hostname -I` in the raspberries terminal to look it up.

## Mount usb stick

- Insert Stick into Raspberry Pi and put following commands into the terminal:

```
sudo mkdir /media/usb
```

with `sudo blkid -o list -w /dev/null` you can get the path, name and fs_type from your stick, it probably is `/dev/sda1`.

This path/name and fs_type you have to insert into the next command:
`sudo mount -t <fs_type> -o utf8,uid=pi,gid=pi /dev/<usb stick name> /media/usb`

```
sudo cp -r /media/usb/<yourPathOnYourStick>/newcluster/* .

sudo umount /media/usb
```

* You can unplug the usb stick now

These previous commands are mounting the usb stick and copying the files into the root of your raspberries file system.


### Remove login to make Kiosk mode possible 

```
sudo raspi-config
```

```
-> System Options -> Boot / Auto Login -> B2 Console Autologin
-> Finish -> Reboot: No
```

We use the Kiosk Mode as a super full screen mode of the frontend, which otherwise would be a normal tab in the browser. 
The operating mode is more difficult to exit than regular full screen mode and protects against setting changes.
Notice, that it also works on raspbian lite as a normal (but only) user interface.

Since you still need a password if you change to the terminal, changing the password is still an important thing to do.


## Run installation script

The installations scripts come with the system and automatically install and set up the database, the frontend, the backend
and the Kiosk Mode.

```
sudo chmod +x ./preinstallation.sh
sudo ./preinstallation.sh
```
On this point, the raspberry will automatically do a reboot to make some changes effective.

---
 
After the reboot put the following commands
- Instead of `your_username` and `your_password` think of a secure password.  
*Important*: Note it somewhere since you'll need it if you want to add more doors later. Also, you should mark your first raspberry somehow,
because you need to know which one was the very first when adding more doors.


```
sudo chmod +x ./setup.sh
sudo ./setup.sh your_username your_password
```

## Result
If everything worked out, you should see the frontend in fullscreen now and everything should work properly.
You can sign in to the frontend with the automatically generated default admin. Please change its password right after.  
Username: `admin`  
Password: `admin`

If you want to add more doors you can switch to the [update system](../update-system/index.md) instructions.


## SSH

If you don't always want to carry your keyboard, mouse and screen to each door where a raspberry is installed,
we recommend, to use SSH for remote access. 
SSH is automatically enabled during the installation process in the installation scripts.
This works if you are in the same network, if you enable port 22 on your 
router, it also works from outside your network, but we don't recommend this for security reasons.

To build a ssh connection to your raspberry, you type `ssh <username>@<ipAddress>`. 
You can get the ipAddress by typing `hostname -I`. The username is probably pi, if you didn't change it.
Watch out to connect your raspberry to your Network, otherwise `hostname -I` won't return anything.