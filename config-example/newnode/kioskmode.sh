# Kioskmode

sudo apt-get update -y
sudo apt-get upgrade -y

sudo apt install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox -y

sudo apt install xinit -y

sudo apt --reinstall install chromium-browser -y

cat conf.txt >> /etc/xdg/openbox/autostart 

echo "[[ -z \$DISPLAY && \$XDG_VTNR -eq 1 ]] && startx --" >> /home/pi/.bash_profile
