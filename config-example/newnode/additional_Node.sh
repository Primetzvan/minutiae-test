#!/bin/sh

# Opening Ports

sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp

# Database setup

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt install mariadb-server -y

sudo systemctl start mysql

sudo cp galera.cnf /etc/mysql/conf.d/
 
sudo systemctl stop mysql
sudo sudo systemctl start mysql

echo "export MARIADB_USER='$1'" | sudo tee /etc/profile.d/raspenv.sh > /dev/null
echo "export MARIADB_KEY='$2'" | sudo tee -a /etc/profile.d/raspenv.sh > /dev/null
