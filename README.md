Description
===========

This is a fork from http://github.com/jamiekurtz/onlineJwtBuilder which allow me to generate the JWT token locally with the docker's implementation.

Online JSON Web Token Builder
=============================

NodeJS-based web application used to generate signed valid JSON Web Tokens to be used for testing. You can include both standard and custom claims, as well as specify your own symmetric signing key.

Future plans for:
- Saving form data to browser local storage
- "Import Token" button, to populate the claims from an existing token

The live site for this application is here: http://jwtbuilder.jamiekurtz.com


Developer Guide
---------------

1. Ensure [NodeJS](http://nodejs.org/download/) is installed
1. Run `npm install` from this project folder to install/configure all modules
1. Run `bin/www` to start the server
1. Browse to http://localhost:3000 to view the site


Docker
======

`Dockerfile` and `docker-compose.yml` are available.

The image is build on https://hub.docker.com/r/reedcrif/docker-jwtbuilder

Puul the image `docker pull reedcrif/docker-jwtbuilder` then use the `docker-compose.yml` with `docker-compose up -d`.

Connect to `http://localhost:3000`

