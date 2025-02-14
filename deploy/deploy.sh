#!/bin/sh
echo"Start deploy Social Pro"

# Check tag exist or not
if [ -z "$1" ]; then
  echo "Please provide a Docker image tag (e.g., commit hash or version)"
  exit 1
fi

TAG=$1

# Update tag in .env
sed -i "s/^DOCKER_IMAGE_TAG=.*/DOCKER_IMAGE_TAG=$TAG/" .env


# Pull docker and deploy

echo "Updated Docker image tag to: $TAG"
docker compose pull
docker compose up -d