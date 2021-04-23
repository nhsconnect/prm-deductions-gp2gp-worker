FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
COPY build/ /app/

RUN apk update && apk add openssl ca-certificates && rm -rf /var/cache/apk/*

RUN apk add --no-cache tini bash

COPY run-worker.sh /usr/bin/run-gp2gp-server

ENV GP2GP_WORKER_MHS_QUEUE_VIRTUAL_HOST="/" \
  GP2GP_WORKER_REPOSITORY_ASID=deduction-asid \
  GP2GP_WORKER_REPOSITORY_ODS_CODE=deduction-ods \
  NODE_ENV=local \
  GP2GP_WORKER_MHS_QUEUE_NAME=gp2gp-test \
  GP2GP_WORKER_MHS_QUEUE_URL_1=tcp://localhost:61613 \
  GP2GP_WORKER_MHS_QUEUE_URL_2="" \
  GP2GP_WORKER_MHS_QUEUE_USERNAME="" \
  GP2GP_WORKER_MHS_QUEUE_PASSWORD="" \
  GP2GP_WORKER_EHR_REPO_URL="" \
  GP2GP_WORKER_GP_TO_REPO_URL="" \
  GP2GP_WORKER_MHS_OUTBOUND_URL="" \
  GP2GP_WORKER_MHS_ROUTE_URL="" \
  GP2GP_WORKER_AUTHORIZATION_KEYS="auth-key-1" \
  GP2GP_WORKER_AUTHORIZATION_KEYS_FOR_GP_TO_REPO="" \
  GP2GP_WORKER_AUTHORIZATION_KEYS_FOR_EHR_REPO=""

RUN npm install

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/run-gp2gp-server"]
