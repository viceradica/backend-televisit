## ivan_odak

Application enabling patients to select doctor and book appointments. To use the application patient needs to
create account with personal information. With validated account, patient can choose doctor and schedule a meeting.
The application sends notifications via e-mail to the patient and the doctor once appointment is booked and before the
actual meeting.

It is node js application using express web application framework and MongoDb as database.

## Requirements

- node js
- mongo db
- docker
- docker-compose


## Setup

Before starting the application rename the .testEnv file and update the <> placeholders with required data.
Swap diamond brackets with actual values e.g. `MONGO_CONNECTION_STRING=some_connection_string_value`.

## Compile and run server

- `npm run dev:server`

## Installation
To install this API locally just clone this repo and run `docker-compose up` and API is available on [localhost](http://localhost:8090)

## Functionalities

Once application is running, test the endpoints using [https://www.postman.com/] or curl.
