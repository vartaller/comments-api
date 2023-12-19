# Comments API

Comments API is a simple API prototype for social media comments.

## Features

- Post a new comment
- Get all comments
- Get comments by publisher email
- Get comment by its id

## Installation and start

Comments API requires [Docker](https://www.docker.com) and [Node.js](https://nodejs.org/) v16+ to run.

Compose and run containers for MySQL and Redis servers. Wait for the DB servers will be ready for connections.
```sh
docker-compose up
```
Install the dependencies, build app and start the app server.
```sh
cd comments-api
npm i
npm run build
npm run start:prod
```

## Usage
To make requests to the API, you can use the platform API for developers, for example [Postman](https://www.postman.com).
There is a comments-api.postman_collection.json - import it to Postman in order to get complete set of requests with all needed.
##### Post new comment

To post a new comment, use the **`POST` request** to the **endpoint: `{{url}}/comment/`**. Data template:
```json
{
    "userData": {
        "name":"username",
        "email":"email@gmail.com",
        "homepage":"htttp://some-homepage" // optional
    },
    "commentData": {
        "captcha":"xGf!gfd765",
        "text":"<html>Some html</html>",
        "file": "E://path-to-file",
        "parentId":"htttp://some-homepage" // only if this comment refers to another comment. 
    }
}
```

##### Get all comments

To get all comments, use the **`GET` request** to the **endpoint: `{{url}}/comment/all`**

##### Get comment by comment id | user email

To get comment by comment id or user email, use the **`GET` request** with one of the parameters:
**endpoint: `{{url}}/comment/by?userEmail=email@gmail.com`**
or
**endpoint: `{{url}}/comment/by?commentId=12`**

here **url** is `http://localhost:3000` in case of local server.

