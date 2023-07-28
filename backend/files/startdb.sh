#!/bin/sh

# Opening ports

sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp

# Database Setup

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt install mariadb-server -y

SQL1="CREATE USER $1@'%' identified by '$2';"
SQL2="GRANT ALL PRIVILEGES ON *.* TO $1@'%' WITH GRANT OPTION;"

sudo sed -i "1s/^/$SQL1\n$SQL2\n/" db_setup.sql

sudo systemctl start mysql
sudo mysql --user=root < db_setup.sql

sudo sed -i "1d" db_setup.sql

sudo cp galera.cnf /etc/mysql/conf.d/
 
sudo systemctl stop mysql
sudo galera_new_cluster

sudo mysql -u $1 -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'" --password=$2

echo "export MARIADB_USER='$1'" | sudo tee /etc/profile.d/raspenv.sh > /dev/null
echo "export MARIADB_KEY='$2'" | sudo tee -a /etc/profile.d/raspenv.sh > /dev/null
