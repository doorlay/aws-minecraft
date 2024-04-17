# AWS Minecraft
This repository contains all the steps required to setup a Minecraft server on AWS.

## Infrastructure
1. Make a new Ubuntu EC2 instance.
2. Configure an SSH inbound rule.
3. Add an inbound rule within the Security Group, type "Custom ICMP rule - IPv4"
Select "All" as the protocol, and 0.0.0.0/0 as source. This will make the server pingable.
4. Add another inbound rule within the Security Group, type "Custom TCP", port range 25565, 0.0.0.0/0 as source. This will make the server reachable via Minecraft.
6. Add an Elastic IP for the server so that the server does not change IPs each boot.

## Setup
1. Run `./setup.sh` from the root folder of the server to set everything up.
2. If you're planning on using a domain name for the server, set up an Alias record that points to the server's Elastic IP.

## Running the Server
The server should automatically launch when your EC2 instance is started. But for some reason that's not working right now, so instead run `./start` to start the server. When done, type `stop`.

## Logging in to Server
1. Login via ssh: `ssh -i "ssh-key.pem" ubuntu@ec2-52-43-166-173.us-west-2.compute.amazonaws.com`

## Future Work
1. Discord bot with boto3 credentials to start and stop the EC2 instance.
2. Switch all infrastructure from manual deployment to CDK.
