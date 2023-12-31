#!/bin/bash
. /home/ec2-user/.bashrc
cd /home/ec2-user/app/apps/api || exit

# Set environment variables
export NODE_ENV=production
export NODE_OPTIONS=--max-old-space-size=1024
export DATABASE_SECRET_NAME='rds!db-80899538-9b2f-4f06-98da-7b6b0c97b4c2'

# Delete all pm2 processes and start a new one
pm2 delete all
HOST=0.0.0.0 PORT=80 pm2 start main.js
