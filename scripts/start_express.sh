#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Set environment variables
export NODE_ENV=production
export NODE_OPTIONS=--max-old-space-size=1024

# Build app
rm -rf ./dist
npm run api:build

# Delete all pm2 processes and start a new one
pm2 delete all
HOST=0.0.0.0 PORT=80 pm2 start dist/apps/api/main.js
