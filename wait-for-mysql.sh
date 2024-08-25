#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

# Check if MySQL is up and running
until mysqladmin ping -h "$host" --silent; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"

# Debugging: Check the MySQL user and password environment variables
echo "MySQL user: $MYSQL_USER"
echo "MySQL password: $MYSQL_PWD"
echo "Attempting to connect to MySQL..."

# Attempt to log in using the provided credentials
mysql -uroot -p"$MYSQL_PWD" -e "SHOW DATABASES;" || echo "Login failed with provided password."

exec $cmd
