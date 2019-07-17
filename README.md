# Smart Linxz App
Smart Linxz attempts to fix the problem that there is no quick and simple way to identify and connect with the right people at a professional networking event. It allows users to create a profile, select interests and then identify top matches on a list to start creating meaningful connections with as few steps as possible. The goal is to get people connected and off their phones as quickly as possible to encourage face to face interactions. It also allows the user to share and save business card information for connections made at an event.

The app was build using React, Node.js, Socket.io, PostgreSQL, MaterialUI and utilizes the LinkedIn API for user login and authentication

## Getting Started
### Start up React Server
Currently deployed on Heroku at https://smart-linxz.herokuapp.com/ or

* clone the [server repo](https://github.com/venetrius/card_share)
* install dependencies 
```
npm install
```
* start server 
```
npm start
```
view [server repo](https://github.com/venetrius/card_share) README for further instructions

### Start up Client Server
* clone this repo for the client side server
* install dependencies 
```
npm install
```
start server 
```
npm start
```
* open a web browser at http://localhost:3000/

## Dependencies
### React Server Dependencies
* cookie-session
* dotenv
* express
* express-socket.io-session
* knex
* passport
* passport-linkedin-oauth2
* pg
* socket.io

### React Server DevDependencies
* morgan
* nodemon

### Client Side Dependencies
* @material-ui/core
* @material-ui/icons
* bootstrap
* react
* react-bootstrap
* react-dom
* react-fontawesome
* react-router-dom
* react-scripts
* socket.io-client
* styled-components

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
<img src=public/screenshots/messages-page.png>

### Messaging
<img src=public/screenshots/messaging.png>