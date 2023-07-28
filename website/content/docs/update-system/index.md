---
title: 'Update system'
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 4
summary: Instruction for adding more doors.
---

## Update the old doors

For this step, we really recommend enabling using ssh, especially if you already have many raspberries installed,
otherwise you have to go to each of yours doors and update it.

VERY IMPORTANT: To enable the synchronisation with the other raspberries, in other words, to add the raspberry to the cluster,
we have to add the new raspberries IP address to each the configuration files of the already running raspberries. It is very important, that
the first raspberry you update ist the cluster head, means the very first door you did set up. The order of the other ones doesn't matter.

Do the following process for each raspberry now, starting with your head raspberry: 
- Leave the Kioskmode and swap to a terminal by pressing F3

- Mount the usb stick carrying the files like in the installation script described

- To prevent you from updating the config files yourself, you get the already updated files for the old raspberries along with the new installation files.
Each folder you got is named "IPAddress_Doorname" and contains a `galera.cnf` file. You have to replace this files on the old raspberries with the new ones now.

```
sudo cp -r /media/usb/shdb/setup/<ipAddress_Doorname>/galera.cnf .
```

- type `sudo reboot` to make your changes effective, you'll automatically be in the Kioskmode again after the reboot (in general you can go back with STRG+ALT+F1)


## New Door

The steps are exactly the same as for the [first raspberry](../install-system/) with one exception:

This time, you can't get the **configuration files** for the new raspberry from this website anymore.

- Add the door in the frontend on one of the already running raspberries
- You'll get a download option witch returns a zip folder after adding the door.
- Extract the folder and put the files on a stick
  - Notice, that in this folder there also files for updating the old doors are included, you can recognize the folder for the new door by the folder naming which is "ipAddress_doorname"

When you run the installation scripts, be careful to use the same username and password for the setup.sh script as you did the first time, there is no verification but it wont work if you do it wrong

When you are finished with the installation process, type `sudo reboot` to make your changes effective

