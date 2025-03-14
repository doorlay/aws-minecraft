#!/usr/bin/env bash

# Create a setup script for the server
printf 'sudo apt-get update\nsudo apt-get install openjdk-21-jdk\nsudo apt-get install screen\nsudo apt-get install firewalld\nsudo ufw allow 25565\nsudo firewall-cmd --permanent --add-port=25565/tcp\nsudo firewall-cmd --reload\n' > setup
chmod +x setup
printf 'cd server && java -Xmx6G -Xms6G -jar paper_server.jar nogui' > start
chmod +x start
printf 'cd server && kill -9 $(ps -ef | pgrep -f "java")' > stop
chmod +x stop

# Upload the above scripts, as well as the server files, to the server
sleep 1
scp -i infra/aws-minecraft-key.pem setup ubuntu@[your ip here]:setup
scp -i infra/aws-minecraft-key.pem start ubuntu@[your ip here]:start
scp -i infra/aws-minecraft-key.pem stop ubuntu@[your ip here]:stop
scp -i infra/aws-minecraft-key.pem -r server ubuntu@[your ip here]:server

# Delete the scripts from the local host
rm setup
rm stop
rm start