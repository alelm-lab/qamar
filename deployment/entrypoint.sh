#!/bin/sh

set -e

echo "Waiting for MySQL..."

while ! nc -z "$MYSQL_HOST" "$MYSQL_PORT"; do
  sleep 1
done

echo "MySQL started"

python manage.py migrate
python manage.py collectstatic --noinput

gunicorn qamar_project.wsgi:application --bind 0.0.0.0:8000