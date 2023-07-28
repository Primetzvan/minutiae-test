#!/bin/sh

sudo galera_new_cluster

sudo pm2 start npm --name backend -- start --prefix /home/pi/newcluster/backend

sudo pm2 start npm --name frontend -- start --prefix /home/pi/newcluster/frontend
