# AWS Minecraft
This repository contains all the steps required to setup a Minecraft server on AWS, alongside an optional Discord bot to check server status and start / stop the server.

## AWS Setup
1. Make sure you have the AWS CLI installed and have exported your AWS account information to your shell.  
2. If you would like to add the optional Discord infrasturcture, change line 10 within the `infra/bin/infra.ts` file to `"TRUE"`.
3. To perform initial setup of the server and all associated infrastructure, run `./init`.  
4. Ensure your EC2 instance is running, then copy the permanent IP address assigned to your instance to all of the scripts in this repository.
5. If you are using a pre-existing world, rename the world folder `server` and put it in the root directory of this project, then run `./upload`. This will take a couple of minutes.  
6. Login to the EC2 instance by running `./login`. Run the setup script on the instance by running `./setup`.  

## [Optional] Discord Setup
1. Navigate to the [Discord Applications](https://discord.com/developers/applications) page and create a new application.
2. Click "Activities -> Getting Started" on the left side of the page. Click "Enable".
3. Follow Discord's instructions [here](https://discord.com/developers/docs/quick-start/getting-started#fetching-your-credentials) for populating the .env file in the `discord` folder in this repo.
4. Click "Installation" on the left side of the page and add the "bot" scope under "Guild Install", along with the "Send Messages" permission.
5. Click "General Information" on the life side of the page and scroll down to "Interactions Endpoint URL". Add your API Gateway endpoint URL, which can be found in the AWS console.
6. Follow Discord's instructions [here](https://discord.com/oauth2/authorize?client_id=1295104349139374141) for installing the bot to your server.
7. Follow Discord's instructions [here](https://discord.com/oauth2/authorize?client_id=1295104349139374141) for installing the bot to your user account.

## Usage
To login to the server, run `./login`.  

Once logged in, start the server with:
```
tmux new-session -s server
./start
Ctrl + b, d
```

To stop the server, run:
```
tmux attach -t server
Ctrl + c
```

If you're planning on using a domain name for the server, set up an Alias record that points to the server's Elastic IP.

<!-- 1. From within the server folder (which is not commited in this repo), run `tmux` to create a new session. Run `./start.sh` to start the server.
2. Now type Ctrl+B then D to detach from this tmux head. You can now exit out of your EC2 instance without the server stopping. To reattach to the head, run `tmux attach -t 0`. -->


## Troubleshooting
If while running the `init` script you get a `Cloud assembly schema version mismatch` error, run:
```
sudo npm uninstall -g aws-cdk
sudo npm install -g aws-cdk
```

If you cannot connect to your server while it's running, use an online port checker tool to confirm that port 25565 is open. If it is not, your server may be configured for a different port - check your server.properties file.

## Release
Run `npx eslint .` to lint before commiting changes.