#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Install node
nvm install
nvm use

# Install npm deps and pm2
npm install
npm -g install pm2
