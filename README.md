# AwsBot

Discord bot to manage an AWS EC2 instance.

## Commands

All commands are be prepended with `!val`

- start
  -  Will check if the instance is stopped and if it is will start the instance

- stop
  - Will check if the instance is running and if it is will stop the instance

- status
  - Will return the current status of the instance. Stopped/Stopping are combined into once response. 

## Setup

Build and push an image to your desired registry

Requires a .env file in the root directory (follow the .env.template file for how to set that should be structured)
Create a docker compose file on the server (that uses the pushed image) where you want to host the bot and make sure that it passes the necessary environment variables to the containers
