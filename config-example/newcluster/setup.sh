#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]
then
	echo "Enter new username and password!"
else
# Enable SSH
sudo systemctl enable ssh
# Install Git
sudo apt install git -y
# Install Docker
sudo apt update
 sudo apt-get update -y
 sudo apt-get install ca-certificates curl gnupg
 sudo install -m 0755 -d /etc/apt/keyrings
 curl -fsSL https://download.docker.com/linux/raspbian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
 sudo chmod a+r /etc/apt/keyrings/docker.gpg
 echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/raspbian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# Install Docker Compose
sudo apt install docker-compose -y
#Start Docker
cd ../../
sudo docker-compose up --build -d
cd ./config-example/newcluster
# Kioskmode Setup
sudo chmod +x kioskmode.sh
sudo ./kioskmode.sh
sudo reboot
fi
