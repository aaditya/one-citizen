# One-Citizen

> This is the project required for the capgemini techchallenge Round 2 of Full Stack development. Problem Statement on their site.

## Requirements

> Node (v6 or above)

> NPM (v4 or above)

## Installation and Running

> npm i

> ng build

> npm start

## Routes

### Index Route

> Base URL : /

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | / | None | API Information


### Authentication Routes

> Base URL : /api/auth

Method | Route Address | Input | Output
--- | --- | --- | ---
POST | /register | fullname, email, phone, password, points | Success/Error Message
POST | /login | email/phone as id, password | Success/Error Message and token
GET | /get-profile | token | Profile Information
GET | /verify/:id/:code | Params | Success/Error Message
GET | /logout | token | Success/Error Message

### Subscription Routes

> Base URL : /api/subscribe

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | /get-offers | token | List of Offers
POST | /add-offer | name, description, discount, token | Success/Error Message
GET | /my-offers | token | List of My Offers
GET | /opt-in/:sub_id | Params, token | Success/Error Message
GET | /opt-out/:sub_id | Params, token | Success/Error Message

### Transaction Rountes

> Base URL : /api/transactions

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | /history | token | Point Balance and Transaction History

### Reward Routes

> Base URL : /api/bonus

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | /rewards | token | List of Rewards
GET | /buy-reward/:rew_id | Params | Success/Error Message
GET | /my-rewards | token | My Rewards
POST | /earn-points | token. points | Success/Error Message
POST | /add-reward | token, name, description, price | Success/Error Message

### Item Routes

> Base URL : /api/item

Method | Route Address | Input | Output
--- | --- | --- | ---
POST | /add | name, description, price | Success/Error Message
GET | /list | token | List of items
POST | /add-review/:item_id | Params, token, rating, image, content | Success/Error Message

### Cart Routes

> Base URL : /api/cart

Method | Route Address | Input | Output
--- | --- | --- | ---
GET | /view | token | List of Cart Items
GET | /add/:item_id/:qty | Params, token | Success/Error Message
PATCH | /update/:item_id/:qty | Params, token | Success/Error Message
DELETE | /delete/:item_id | Params, token | Success/Error Message