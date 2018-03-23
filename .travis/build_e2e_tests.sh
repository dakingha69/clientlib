#!/bin/sh
set -ev

DIR="$(dirname "$(readlink -f "$0")")"
COMPOSE_FILE="$DIR/../tests/testrelay/docker-compose.yml"

docker-compose -f "$COMPOSE_FILE" build
