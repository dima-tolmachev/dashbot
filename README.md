# Dashbot

The dashboard for your private discord server that helps you controll subscription and collect renewal fees from participants

### Features

1. Implement subscription model to the private community
2. Get detailed guild statistics
3. Control everyone's subsciption
4. Third party apps auth support (REST API section below)
5. Setup easily

### How to install and launch

1. Clone application with git
   `git clone https://github.com/dima-tolmachev/dashbot`
2. Install dependencies
   `yarn`
3. Move to directory
   `cd dashbot`
4. Create `.env` file right here

```
dbURL="MONGO DB URL TO THE DATABASE"
TOKEN="DISCORD BOT TOKEN"
APPLICATION_ID="DISCORD APP ID"
```

5. Edit config.ts file in './src'

    - port - the port that will be used for web API
    - guildID - your discord server ID the application is supposed to moderate
    - memberRoleID - create a role that will has some permission for viewing/writing in private channels and set
    - logsChannelID - create a channel for dashbot logs
    - licenseDuration - default set to 30 days, stands for subscription duration
    - licenseCheckTimePM - default set to 12 AM, format 24 hour, stands for a time for everyday subscription expiration check
    - freezedByDefault - default set to false, set to true in case you don't want to create renewal tickets
    - renewalCategoryID - create a category that will be used for opening private renewal tickets
    - renewalInstruction - the text that will be printed as soon as new renewal ticket opens
    - colors - colors for logs embed messages

6. Start the program
    - With yarn
      `yarn build`
      `yarn start`
    - With docker
      `docker build -t dashbot .`
      `docker run -dp 3000:3000 dashbot`

### How to use?

-   Subscribe a new user
    _Add role that you set as 'memberRoleID' to the guild member, the initial renewal ticket will be created. After the user will execute the instruction send command !ready, it will set his new expiration date (+30 days by default)_
-   Confirm that instruction executed by user
    _Send message_ `!ready` _to the renewal ticket_
-   Cancel subscribtion?
    _Remove the role linked to 'memberRoleID', it will erase user's data from the database_
-   Get all availiable commands
    _send message_ `!help` _to any text channel on the server_

### REST API

The REST API to the dashbot is described below.

**GET /**
_Test if server works_
`curl -i http://localhost:3000/`
Response:
**the phrase 'API works' and current server time, status code 200**

**POST /check_key**
`curl -i -H 'Accept: application/json' http://localhost:3000/check_key/`
Body example:
{ license: 'xxxxx-xxxxx-xxxxx-xxxxx, deviceID: 'Apple M1, D222010393'}

Response:
**if license key and device matches**
{ activations: 'ok', user: { name: "DISCORD USERNAME" }}
**if license key is linked to another device (IP or device ID doesn't match)**
{ message: 'device error'}
**if license key is wrong**
{ message: 'license not found'}
