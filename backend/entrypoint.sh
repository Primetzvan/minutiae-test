#!/bin/bash

# Generieren Sie einen zufälligen Token und schreiben Sie ihn in die .env-Datei
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" > ./.env
echo "CREATE_FINGER_SESSION_EXPIRES=10" >> ./.env

# Führen Sie den ursprünglichen Docker-Entrypoint-Befehl aus
exec "$@"
