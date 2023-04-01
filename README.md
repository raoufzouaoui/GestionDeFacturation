# Gestion de facturation - Node.js and Angular project

This is a web application built with Node.js, Angular, MongoDB, and JWT authentication. The app is designed for managing invoices for clients.

## Features
- Users can register and login
- Admin can add factures for clients
- Facture properties: nameclient, emailclient, referencefacture, quantity, prix, datedebut, datefin, payé ou non
- Admin can edit and delete factures
- Admin can view all factures
- Users can view their factures by email and pay them using PayPal
## Installation
- Clone the repository: git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
- Navigate to the project directory: cd gestion-de-facturation
- Install the dependencies for the Node.js server: npm install
- Install the dependencies for the Angular client: cd client && npm install
- Start the server: npm start
- Start the client: cd client && ng serve

## Note: You will also need to set up a MongoDB database and configure the config.json file with your MongoDB URI and PayPal credentials.
