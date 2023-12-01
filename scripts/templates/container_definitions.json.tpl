[
  {
    "image": "{{ecs_container_image}}",
    "name": "{{ecs_container_name}}",
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "{{ecs_container_region}}",
        "awslogs-group": "{{ecs_container_log_group}}",
        "awslogs-stream-prefix": "{{ecs_container_stream_prefix}}"
      }
    },
    "portMappings": [{
      "protocol": "tcp",
      "containerPort": 80
    }],
    "environment": {{ecs_container_env_variables|tojson}}
  }
]
