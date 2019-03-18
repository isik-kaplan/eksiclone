#!/usr/bin/env bash
cd eksiclone
sudo python3 manage.py makemigrations mainsite
sudo python3 manage.py migrate
sudo python3 deploy.py