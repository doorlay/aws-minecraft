# AWS Minecraft
This repository contains IaC for an AWS hosted Minecraft server, mostly to codify this knowledge into one location since I go through the same steps each time. There are some additional instructions on uploading world files and starting & stopping the server, all of which assume you're using [PaperMC](https://papermc.io/); if you're using a different server library, feel free to skip those lines in the setup. 

## Prerequisites 
1. Ensure you have the [AWS CLI](https://aws.amazon.com/cli/) installed.
2. Export your AWS account information to your shell as outlined [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-set).
3. Decide which size EC2 instance you want to run. Once decided, update line 25 in `infra/lib/infra-stack.ts`.

## Setup
1. Run `./setup.sh`
2. Ensure your EC2 instance is running, then copy the permanent IP address assigned to your instance to the `login.sh` and `upload.sh` scripts in this repository.
3. If you are using a pre-existing world, rename the world folder `server` and put it in the root directory of this repository, then run `./upload`. This will take a couple of minutes.  
6. Login to the EC2 instance by running `./login`. Run the setup script on the instance by running `./setup`. 

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

## Troubleshooting
If while running the `init` script you get a `Cloud assembly schema version mismatch` error, run:
```
sudo npm uninstall -g aws-cdk
sudo npm install -g aws-cdk
```

If you cannot connect to your server while it's running, use an online port checker tool to confirm that port 25565 is open. If it is not, your server may be configured for a different port - check your server.properties file.

## Release
Run `npx eslint .` to lint before commiting changes.

100.20.202.55