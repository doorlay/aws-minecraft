#!/usr/bin/env bash

cd infra
sudo npm uninstall -g aws-cdk
sudo npm install -g aws-cdk
npm install
aws ec2 create-key-pair --key-name aws-minecraft-key --query 'KeyMaterial' --region us-west-2 --output text > aws-minecraft-key.pem
chmod 400 aws-minecraft-key.pem
cd infra && cdk deploy
cd ../
printf '#!/usr/bin/env bash\n\nssh -i infra/aws-minecraft-key.pem ubuntu@[your ip here]' > login.sh
chmod +x login.sh