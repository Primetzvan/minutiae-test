#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]
then
	echo "Enter new username and password!"
else
# Enable SSH
sudo systemctl enable ssh
# Install Git
sudo apt install git -y
# Kioskmode Setup
sudo chmod +x kioskmode.sh
sudo ./kioskmode.sh
sudo reboot
fi
