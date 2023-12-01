import os
import json
import logging

import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape

logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

env = Environment(
    loader=FileSystemLoader("./templates"),
    autoescape=select_autoescape(),
    trim_blocks=True,
    lstrip_blocks=True
)
env.policies['json.dumps_kwargs'] = {
    'ensure_ascii': False,
    'sort_keys': True
}


ECR_AWS_ACCOUNT_ID = os.environ['ECR_AWS_ACCOUNT_ID']
ECR_IMAGE_REPO_NAME = os.environ['ECR_IMAGE_REPO_NAME']
ECR_IMAGE_REPO_URL = os.environ['ECR_IMAGE_REPO_URL']
ECR_IMAGE_TAG = os.environ['ECR_IMAGE_TAG']
ECS_EXECUTION_ROLE_ARN = os.environ['ECS_EXECUTION_ROLE_ARN']
ECS_FAMILY = os.environ['ECS_FAMILY']
ECS_CPU = os.environ['ECS_CPU']
ECS_MEMORY = os.environ['ECS_MEMORY']
ECS_NETWORK_MODE = os.environ['ECS_NETWORK_MODE']
ECS_CONTAINER_REGION = os.environ['ECS_CONTAINER_REGION']
ECS_CONTAINER_NAME = os.environ['ECS_CONTAINER_NAME']
ECS_CONTAINER_LOG_GROUP_NAME = os.environ['ECS_CONTAINER_LOG_GROUP_NAME']
ECS_CONTAINER_STREAM_PREFIX = os.environ['ECS_CONTAINER_STREAM_PREFIX']

CONTAINER_ENV_API_KEY = os.environ["CONTAINER_ENV_API_KEY"]
CONTAINER_ENV_AWS_REGION = os.environ["CONTAINER_ENV_AWS_REGION"]
CONTAINER_ENV_STRINGS_MAPPING_PARAMETER_NAME = os.environ["CONTAINER_ENV_STRINGS_MAPPING_PARAMETER_NAME"]


def generate_container_definitions():
    logger.info("Genering the container definitions from template...")

    container_definitions_tpl = env.get_template('container_definitions.json.tpl')
    return container_definitions_tpl.render(
        ecs_container_image=f"{ECR_IMAGE_REPO_URL}:{ECR_IMAGE_TAG}",
        ecs_container_name=ECS_CONTAINER_NAME,
        ecs_container_region=ECS_CONTAINER_REGION,
        ecs_container_log_group=ECS_CONTAINER_LOG_GROUP_NAME,
        ecs_container_stream_prefix=ECS_CONTAINER_STREAM_PREFIX,
        ecs_container_env_variables=[
            {
                "name": "API_KEY",
                "value": CONTAINER_ENV_API_KEY
            },
            {
                "name": "STRINGS_MAPPING_PARAMETER_NAME",
                "value": CONTAINER_ENV_STRINGS_MAPPING_PARAMETER_NAME
            },
            {
                "name": "AWS_REGION",
                "value": CONTAINER_ENV_AWS_REGION
            },
        ]
    )


def generate_taskdef(container_definitions):
    logger.info("Generating taskdef file from template...")

    taskdef_tpl = env.get_template('taskdef.json.tpl')
    return taskdef_tpl.render(
        ecs_execution_role_arn=ECS_EXECUTION_ROLE_ARN,
        ecs_family=ECS_FAMILY,
        ecs_container_definitions=json.loads(container_definitions),
        ecs_memory=ECS_MEMORY,
        ecs_cpu=ECS_CPU,
        ecs_network_mode=ECS_NETWORK_MODE
    )


def generate_appspec():
    logger.info("Generating appspec file from template...")

    appspec_tpl = env.get_template('appspec.yml.tpl')
    return appspec_tpl.render(
        ecs_container_name=ECS_CONTAINER_NAME
    )


def main():
    taskdef = generate_taskdef(generate_container_definitions())
    logger.info("Generated the following taskdef file:\n%s", taskdef)

    with open("../taskdef.json", "w", encoding="utf-8") as taskdef_file:
        # We load and dump to make sure it is a correct JSON
        taskdef_file.write(json.dumps(json.loads(taskdef)))

    appspec = generate_appspec()
    logger.info("Generated the following appspec file:\n%s", appspec)

    with open("../appspec.yml", "w", encoding="utf-8") as appspec_file:
        # We load and dump to make sure it is a correct YAML
        appspec_file.write(yaml.safe_dump(yaml.safe_load(appspec)))


if __name__ == "__main__":
    main()
