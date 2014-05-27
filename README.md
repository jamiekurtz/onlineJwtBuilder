Online JSON Web Token Builder
=============================

NodeJS-based web application used to generate signed valid JSON Web Tokens to be used for testing. You can include both standard and custom claims, as well as specify your own symmetric signing key.

Future plans for:
- Saving form data to browser local storage
- Offering a dropdown for signing algorithms (currently set to SHA256)
- Button to provide base64-encoded version of generated symmetric key

The live site for this application is here: http://jwtbuilder.jamiekurtz.com


Developer Guide
---------------

1. Ensure [NodeJS](http://nodejs.org/download/) is installed
1. Run `npm install` from this project folder to install/configure all modules
1. Run `bin/www` to start the server
1. Browse to http://localhost:3000 to view the site




