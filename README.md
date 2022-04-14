# Blogify App

## About and Usage

This is a basic blogging application that offers the following features:
- logging in as an existing user and logging out
- after logging in, a user can create a blog, browse existing blogs, leave a like and comment on a blog
- an interface for displaying all users and blogs

## Technical Overview

- State management for blogs, users, and notifications is accomplished using the react-redux library 
- REST API is used for communication with the server
- User authentication is achieved with JWT and the user token is stored in local storage
- Data is saved to a MongoDB database and the Mongoose library is used for performing CRUD operations on the database

## Requirements

Make sure to use Node version 16.  If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## Installation

1. Clone the repo by running 
```sh
git clone git@github.com:tranhuy/Blogify.git 
```
2. Launch code editor in the app subdirectory

3. Install npm packages by running
```sh
npm install
```
## Note about user creation and login

Since the application currently does not have a UI for registering new users, you can use the following username/password for logging in: ``testuser/password``.

The api offers an endpoint for creating a new user.  To do so you can send a POST request to ``https://api-blogify.herokuapp.com/api/users`` with the following body:

```json
{
    "name": "test",
    "username": "test",
    "password": "password"
}
```
After confirming the request was processed successfully by receiving status code 200 from the server you can then proceed to login with the new user which was created.




