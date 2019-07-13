# Smart Linxz App
Smart Linxz attempts to fix the problem that there is no quick and simple way to identify and connect with the right people at a professional networking event. It allows users to create a profile, select interests and then identify top matches on a list to start creating meaningful connections with as few steps as possible. The goal is to get people connected and off their phones as quickly as possible to encourage face to face interactions. It also allows the user to share and save business card information for connections made at an event.

The app was build using React, Node.js, Socket.io, PostgreSQL, MaterialUI and utilizes the LinkedIn API for user login and authentication

## Getting Started
### Start up React Server
clone the [server repo](https://github.com/venetrius/card_share)
install dependencies ```npm install```
start server ```npm start```

#### Database Setup
1. Set up a pg database
Type the following command to connect to your postgres server:
`psql -U vagrant -d template1`

Run the following SQL commands to create the necessary objects in the DB:

```sql
CREATE ROLE <rolename> WITH LOGIN password '<password>';
CREATE DATABASE <dbname> OWNER <rolename>;
```

2. Run the migrations and seed the database
```
knex migrate:latest
knex seed:run
```

- To rollback the last batch of migrations: `knex migrate:rollback`
- To rollback all the completed migrations: `knex migrate:rollback --all`
- To run the next migration that has not yet been run: `knex migrate:up`
- To undo the last migration that was run: `knex migrate:down`

### Start up Client Server
clone this repo for the client side server
install dependencies 
```
npm install
```
start server 
```
npm start
```
open a web browser at http://localhost:3000/

## Dependencies
### React Server Dependencies
cookie-session
dotenv
express
express-socket.io-session
knex
passport
passport-linkedin-oauth2
pg
socket.io

### React Server DevDependencies
morgan
nodemon

### Client Side Dependencies
@material-ui/core
@material-ui/icons
bootstrap
react
react-bootstrap
react-dom
react-fontawesome
react-router-dom
react-scripts
socket.io-client
styled-components

## Screenshots
### Login Profile
<img src=public/screenshots/profile-setup.png>

### Topics Selector
<img src=public/screenshots/topic-selector.png>

### Basic Profile
<img src=public/screenshots/basic-profile.png>

### Shared Profile
<img src=public/screenshots/shared-profile.png>

### Network Page
<img src=public/screenshots/network-page.png>

### Network Page - Connected
<img src=public/screenshots/network-connected.png>

### Message Page
<img src=public/screenshots/message-page.png>

### Messaging
<img src=public/screenshots/messaging.png>
## Card Share Client