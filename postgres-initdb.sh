#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "apidb_dev";
  CREATE DATABASE "apidb_test";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=apidb_dev <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
  CREATE EXTENSION "hstore";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=apidb_test <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
  CREATE EXTENSION "hstore";
EOSQL
