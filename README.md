# AWS Minecraft
This repository contains all the steps required to setup a Minecraft server on AWS.

## Setup
1. Make sure you have the AWS CLI installed and have exported your AWS account information to your shell.  
2. To perform initial setup of the server and all associated infrastructure, run `./init`.  
3. Ensure your EC2 instance is running, then copy the permanent IP address assigned to your instance to all of the scripts in this repository.
4. If you are using a pre-existing world, rename the world folder `server` and put it in the root directory of this project, then run `./upload`. This will take a couple of minutes.  
5. Login to the EC2 instance by running `./login`. Run the setup script on the instance by running `./setup`.  

## Usage
To login to the server, run `./login`.  

Once logged, start the server with:
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