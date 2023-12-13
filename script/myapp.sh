#!/bin/bash

APP_NAME="person-updated-api"
SCRIPT_PATH="/home/ec2-user/person-prisma-updated"

start_app() {
    echo "Starting $APP_NAME..."
    pm2 start npm --name "$APP_NAME" -- run dev
    echo "$APP_NAME started successfully."
}

stop_app() {
    echo "Stopping $APP_NAME..."
    pm2 stop "$APP_NAME"
    pm2 delete "$APP_NAME"
    echo "$APP_NAME stopped successfully."
}

case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        stop_app
        start_app
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

exit 0
