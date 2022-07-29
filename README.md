# Clean Arch + Typescript User API
## Under construction...
This API is a first test with Clean Arch + Typescript

## Stack
    - Nodejs
    - Typescript
    - Express
    - MongoDB

## Run development enviroment

Make sure you have [Node.js](https://nodejs.org/en/), [Docker](https://docs.docker.com/desktop/) and [Docker Compose(>=1.27.4)](https://docs.docker.com/compose/install/) installed. 

- Create .env same .env.example content

- run `yarn i` or `npm i`

- run `docker-compose up -d` to start app
  
- run `yarn test` or `npm run test` to run all tests

## Deploy

This app is configured with AWS Lambda with [Serverless Framework](https://www.serverless.com/)

- Config [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- Run `yarn i` or `npm i`
- Run `yarn deploy` or `npm run deploy`