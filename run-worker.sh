#!/bin/bash

# This script executes on docker container start.
# It waits for MQ connection to be available before starting the application.

#Structured logging
NHS_SERVICE=gp2gp-worker
timestamp() {
  date +"%Y-%m-%d %H:%M:%S"
}
function jsonPrettify {
  echo "{message: $1, level: $2, timestamp: `timestamp`, service: ${NHS_SERVICE}, environment: ${NHS_ENVIRONMENT} } "
}


MQ_CONNECTION_TIMEOUT=30

MQ_HOST_1=$(echo $GP2GP_WORKER_MHS_QUEUE_URL_1 | awk -F "://" '{print $2}' |  awk -F ":" '{print $1}')
MQ_PORT_1=$(echo $GP2GP_WORKER_MHS_QUEUE_URL_1 | awk -F "://" '{print $2}' |  awk -F ":" '{print $2}')
MQ_HOST_2=$(echo $GP2GP_WORKER_MHS_QUEUE_URL_2 | awk -F "://" '{print $2}' |  awk -F ":" '{print $1}')
MQ_PORT_2=$(echo $GP2GP_WORKER_MHS_QUEUE_URL_2 | awk -F "://" '{print $2}' |  awk -F ":" '{print $2}')

jsonPrettify "Waiting for any MQ port to be open" INFO
count=0
while ! nc -z ${MQ_HOST_1} ${MQ_PORT_1} && ! nc -z ${MQ_HOST_2} ${MQ_PORT_2}; do
  jsonPrettify "Waiting for MQ at ${MQ_HOST_1}:${MQ_PORT_1} or ${MQ_HOST_2}:${MQ_PORT_2}" INFO
  sleep 2
  ((count++))
  if [ "${MQ_CONNECTION_TIMEOUT}" -le $count ]; then
    jsonPrettify "Timed-out waiting for MQ connection at ${MQ_HOST_1}:${MQ_PORT_1} or ${MQ_HOST_2}:${MQ_PORT_2}" WARN
    exit 5
  fi
done

jsonPrettify "MQ is available. Waiting 5 seconds before connecting" INFO
sleep 5
# After tcp port is open, it takes a moment for server to be ready

jsonPrettify "MQ is available. Starting worker" INFO
set -e
exec node worker.js
