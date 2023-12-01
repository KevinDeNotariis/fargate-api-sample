{
  "family": "{{ecs_family}}",
  "executionRoleArn": "{{ecs_execution_role_arn}}",
  "taskRoleArn": "{{ecs_task_tole_arn}}",
  "memory": "{{ecs_memory}}",
  "cpu": "{{ecs_cpu}}",
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "networkMode": "{{ecs_network_mode}}",
  "containerDefinitions": {{ecs_container_definitions|tojson}}
}