#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Install node
nvm install
nvm use

# Make sure NPM cache is clean
npm cache clean --force

# Install npm deps and pm2
cd /home/ec2-user/app/apps/api && npm install
cd /home/ec2-user/app/libs/services && npm install
# Make sure to install latest pm2 version
npm -g install pm2@latest
