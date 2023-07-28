sudo apt-get update -y
sudo apt-get install mosquitto -y

# mosquitto client for checking if everything worked purposes
#sudo apt-get install mosquitto-clients
#mosquitto_sub -h localhost -t test

# Make mosquitto only accessible on localhost
sudo echo -e "\nlistener 1883 localhost" | sudo tee -a /etc/mosquitto/mosquitto.conf > /dev/null

sudo mosquitto -c /etc/mosquitto/mosquitto.conf

sudo systemctl restart mosquitto
