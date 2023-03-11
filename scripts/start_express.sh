#!/bin/bash
cd /home/ec2-user/app || exit

# Build app and start with pm2
npm run api:build
pm2 start dist/apps/api/main.js
