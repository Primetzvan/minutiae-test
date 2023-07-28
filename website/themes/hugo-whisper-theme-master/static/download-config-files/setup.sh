#!/bin/sh

#Enable SSH

sudo systemctl enable ssh

#Kioskmode

apt install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox

apt install --no-install-recommends chromium-browser libgles2-mesa

#Datenbank Setup

sudo chmod +x startdb.sh

./startdb.sh

