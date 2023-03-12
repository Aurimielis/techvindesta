#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app || exit

# Set environment variables
export NODE_ENV=production

# Build app and start with pm2
npm run api:build
"HOST=0.0.0.0 PORT=80 pm2 start dist/apps/api/main.js -f"
