#!/usr/bin/env bash

# Install all required packages
sudo apt-get update
sudo apt-get install openjdk-17-jdk
sudo apt-get install screen
sudo apt-get install firewalld

# Make a new directory and download server files inside of it
adduser minecraft
mkdir minecraft && cd minecraft
wget -O minecraft_server.jar https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar
sleep 1

# Configure firewall settings to make server accessible
sudo ufw allow 25565
sudo firewall-cmd --permanent --add-port=25565/tcp
sudo firewall-cmd --reload
echo "eula=true" > eula.txt
sleep 1

# Create scripts to start and stop the server
touch start
printf '#!/bin/bash\njava -Xmx8192M -Xms8192M -jar minecraft_server.jar nogui\n' >> start
chmod +x start
sleep 1
touch stop
printf '#!/bin/bash\nkill -9 $(ps -ef | pgrep -f "java")' >> stop
chmod +x stop
sleep 1

# # Configure a SystemD script to run the server jar on boot
# cd /etc/systemd/system/
# sudo touch minecraft.service
# sudo printf '[Unit]\nDescription=Minecraft Server on start up\nWants=network-online.target\n[Service]\nUser=minecraft\nWorkingDirectory=/minecraft\nExecStart=/minecraft/start\nStandardInput=null\n[Install]\nWantedBy=multi-user.target' | sudo tee -a minecraft.service
# sudo systemctl daemon-reload
# sudo systemctl enable minecraft.service
# sudo systemctl start minecraft.service
