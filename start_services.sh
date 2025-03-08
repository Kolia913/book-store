#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run only PostgreSQL
docker compose --env-file "$SCRIPT_DIR/.env" up postgres