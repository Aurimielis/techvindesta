#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Install node
nvm install
nvm use

# Install npm deps and pm2
npm install
# Make sure to install latest pm2 version
npm -g install pm2@latest
