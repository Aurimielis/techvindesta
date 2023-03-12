#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Set environment variables
export NODE_ENV=production
export PORT=80
export HOST=0.0.0.0

# Build app and start with pm2
npm run api:build
pm2 start dist/apps/api/main.js -f
