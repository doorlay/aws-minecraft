import boto3
import os
from typing import Any


def handler(event: Any, context: Any):
    client = boto3.client("ec2")
    if event[""] == "start":
        client.start_instances(InstanceIds=[os.environ["INSTANCE_ID"]])
    elif event[""] == "stop":
        client.stop_instances(InstanceIds=[os.environ["INSTANCE_ID"]])