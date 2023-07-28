#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]
then
	echo "Enter new username and password!"
else
# Enable SSH
sudo systemctl enable ssh
# Install Git
sudo apt install git -y
# Install nodejs 12
REQUIRED_PKG="nodejs"
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG|grep "install ok installed")
echo Checking for $REQUIRED_PKG: "$PKG_OK"
if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  sudo apt update
  sudo apt -y upgrade
  sudo apt update
  sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt -y install $REQUIRED_PKG
  sudo apt -y  install gcc g++ make
  dpkg -s $REQUIRED_PKG
fi
# npm update
sudo npm install -g npm@latest
sudo echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
# Database Setup
sudo chmod +x startdb.sh
sudo ./startdb.sh $1 $2
# Frontend & Backend Setup
sudo npm install pm2 - g
sudo npm i -g pm2
sudo chmod +x installfrontendbackend.sh
sudo ./installfrontendbackend.sh $1 $2
sudo pm2 start npm --name backend -- start --prefix /home/pi/newcluster/backend
sudo pm2 start npm --name frontend -- start --prefix /home/pi/newcluster/frontend
sudo chmod +x createMQTTBroker.sh
sudo ./createMQTTBroker.sh
# Autostart Frontend/Backend
sudo chmod +x startcluster.sh
echo "$(cat autostart.sh)" > /etc/rc.local
# Kioskmode Setup
sudo chmod +x kioskmode.sh
sudo ./kioskmode.sh
sudo reboot
fi
