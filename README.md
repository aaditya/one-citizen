# One-Citizen

## Requirements

> Node (v4 or above).

## Installation and Running

> npm i

> npm start

## Routes

### Authentication Routes

> Base URL : /api/auth

Method | Route Address | Input | Output
--- | --- | --- | --- | ---
POST | /register | fullname, email, phone, password | Success/Error Message
POST | /login | email/phone as id, password | Success/Error Message
GET | /get-profile | token | Success/Error Message
GET | /verify/:id/:code | Params | Success/Error Message
GET | /logout | token | Success/Error Message