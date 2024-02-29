#!/bin/bash

TAG=$1

sed "s|image: my-node-app:[a-zA-Z0-9.-]*|image: my-node-app:$TAG|" compose.yaml > compose_tmp.yaml && mv compose_tmp.yaml compose.yaml
