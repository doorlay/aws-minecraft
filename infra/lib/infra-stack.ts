import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { execSync } from 'child_process';
// import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { CfnEIP, Peer, Port, KeyPair, Instance, InstanceType, InstanceClass, InstanceSize, MachineImage, Vpc, SecurityGroup} from 'aws-cdk-lib/aws-ec2';

// const LAMBDA_RUNTIME = Runtime.PYTHON_3_12;
// const LAMBDA_CODE_PATH = "lambda";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The default VPC for your account
    const defaultVpc = Vpc.fromLookup(this, 'VPC', {
        isDefault: true,
    });

    // Security group attached to our server
    const securityGroup = new SecurityGroup(this, "securityGroup", {
        vpc: defaultVpc,
        description: "Security group for our server",
    });
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.allTraffic(), "Make the server pingable");
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(25565), "Make server reachable via Minecraft");

    // EC2 instance that will host our server
    const server = new Instance(this, "server", {
        vpc: defaultVpc,
        instanceType: InstanceType.of(InstanceClass.M5, InstanceSize.XLARGE),
        machineImage: MachineImage.genericLinux({
            // Chose an AMI from this website: https://cloud-images.ubuntu.com/locator/ec2/ and
            // copy the the region and AMI ID below. This will need to be updated manually if you
            // want to update your EC2 instance's operating system.
            "us-west-2": "ami-0b8c6b923777519db"
        }),
        securityGroup: securityGroup,
        // This key is created via the setup.sh script and then identified by name
        keyPair: KeyPair.fromKeyPairName(this, "keyPair", "aws-minecraft-key"),
    })


    // Dedicated IP address for our server
    new CfnEIP(this, "dedicatedIP", {
        instanceId: server.instanceId
    })

    // Resources to bundle all Lambda dependencies with the the Lmabda code into a .zip
    // const lambdaCode = Code.fromAsset(LAMBDA_CODE_PATH, {
    //     bundling: {
    //         image: LAMBDA_RUNTIME.bundlingImage,
    //         command: [],
    //         local: {
    //           tryBundle(outputDir: string) {
    //             try {
    //               execSync('pip3 --version');
    //             } catch {
    //               return false;
    //             }
  
    //             const commands = [
    //               `cd lambda`,
    //               `pip3 install -r requirements.txt -t ${outputDir}`,
    //               `cp -a . ${outputDir}`
    //             ];
  
    //             execSync(commands.join(' && '));
    //             return true;
    //           }
    //         }
    //     }
    // });

    // const toggleServerFunction = new Function(this, "toggleServerFunction", {
    //     code: lambdaCode,
    //     handler: "toggle_server.handler",
    //     runtime: LAMBDA_RUNTIME,
    //     environment: {
    //         "INSTANCE_ID": server.instanceId,
    //     }
    // })

  }
}
