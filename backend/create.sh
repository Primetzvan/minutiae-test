# TODO: load files from github into files folder/sind schon da? -> github folder

##
npm install

## Set environment variables
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" | sudo tee ./.env > /dev/null #/dev/null mutes output
echo "CREATE_FINGER_SESSION_EXPIRES=10" | sudo tee -a ./.env > /dev/null #/dev/null mutes output

## TODO: remove
echo "DATABASE_USER='root'" | sudo tee -a ./.env > /dev/null #/dev/null mutes output
echo "DATABASE_PASSWORD='test'" | sudo tee -a ./.env > /dev/null #/dev/null mutes output

# port Einstellung für pm2
echo "PORT=3000" | sudo tee -a /home/pi/backend/.env > /dev/null #/dev/null mutes output