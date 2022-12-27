#!/bin/bash

# setting - docker info
DOCKER_USER_NAME=wolfandcamel
DOCKER_IMAGE_NAME=frontend
DOCKER_IMAGE_TAG=1.3
DOCKER_CONTAINER_NAME=app
DOCKER_PORT1=80
DOCKER_PORT2=443
DOCKER_VOLUME=/home/docker/volumes/$DOCKER_CONTAINER_NAME
DOCKER_IMAGE=$DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG

# nginx config copy
mkdir -p $DOCKER_VOLUME/nginx/conf.d
cp nginx-default.conf $DOCKER_VOLUME/nginx/conf.d/default.conf
cp -r ssl $DOCKER_VOLUME/nginx/conf.d

# docker run #################################
docker run --name $DOCKER_CONTAINER_NAME \
        -p $DOCKER_PORT1:80 \
        -p $DOCKER_PORT2:443 \
        -v $DOCKER_VOLUME/nginx/conf.d:/etc/nginx/conf.d \
        -d \
        $DOCKER_IMAGE