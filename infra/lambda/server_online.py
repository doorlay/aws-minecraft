import boto3
import json
import os
from typing import Any


def handler(event: Any, context: Any):
    """Determine whether or not the server EC2 instance is running."""
    client = boto3.client("ec2")
    is_running = False
    response = client.describe_instance_status(InstanceIds=[os.environ["INSTANCE_ID"]])
    # Determine whether or not the instance is running
    if response['InstanceStatuses'][0]['InstanceState']['Name'] == 'running':
        is_running = True
    return {
        "statusCode": 200,
        "body": json.dumps({is_running}),
        "isBase64Encoded": True
    }