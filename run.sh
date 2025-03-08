#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run Docker Compose with the .env file
docker compose --env-file "$SCRIPT_DIR/.env" up
