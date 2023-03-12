#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

chown -R ec2-user:ec2-user /home/ec2-user/app

# Set environment variables
export NODE_ENV=production
export PORT=80
export HOST=0.0.0.0

# Install node
nvm install
nvm use

# Install npm deps and pm2
npm install
npm -g install pm2
