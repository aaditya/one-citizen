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
--- | --- | --- | ---
POST | /register | fullname, email, phone, password, points | Success/Error Message
POST | /login | email/phone as id, password | Success/Error Message
GET | /get-profile | token | Success/Error Message
GET | /verify/:id/:code | Params | Success/Error Message
GET | /logout | token | Success/Error Message

### Subscription Routes

> Base URL : /api/subscribe

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | /get-offers | token | Success/Error Message
POST | /add-offer | name, description, discount, token | Success/Error Message
GET | /my-offers | token | Success/Error Message
GET | /opt-in/:sub_id | Params, token | Success/Error Message
GET | /opt-out/:sub_id | Params, token | Success/Error Message

