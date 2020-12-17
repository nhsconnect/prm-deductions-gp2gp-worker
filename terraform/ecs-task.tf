locals {
    task_role_arn                = aws_iam_role.gp2gp.arn
    task_execution_role          = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.environment}-${var.component_name}-EcsTaskRole"
    task_ecr_url                 = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com"
    task_log_group               = "/nhs/deductions/${var.environment}-${data.aws_caller_identity.current.account_id}/${var.component_name}"
    environment_variables        = [
      { name = "NODE_ENV", value = var.environment },
      { name = "GP2GP_ADAPTOR_ENABLE_SERVER", value = "false" },
      { name = "GP2GP_ADAPTOR_ENABLE_WORKER", value = "true" },
      { name = "GP2GP_ADAPTOR_MHS_QUEUE_NAME", value = "raw-inbound" },
      { name = "GP2GP_ADAPTOR_MHS_QUEUE_URL_1", value = data.aws_ssm_parameter.amq-endpoint_0.value },
      { name = "GP2GP_ADAPTOR_MHS_QUEUE_URL_2", value = data.aws_ssm_parameter.amq-endpoint_1.value },
      { name = "GP2GP_ADAPTOR_EHR_REPO_URL", value = "https://${var.environment}.ehr-repo.patient-deductions.nhs.uk" },
      { name = "GP2GP_ADAPTOR_GP_TO_REPO_URL", value = data.aws_ssm_parameter.gp2gp_adaptor_gp_to_repo_url.value },
      { name = "GP2GP_ADAPTOR_REPO_TO_GP_URL", value = data.aws_ssm_parameter.gp2gp_adaptor_repo_to_gp_url.value },
    ]
    secret_environment_variables = [
      { name = "GP2GP_ADAPTOR_AUTHORIZATION_KEYS_FOR_EHR_REPO", valueFrom = data.aws_ssm_parameter.gp2gp_adaptor_authorization_keys_for_ehr_repo.arn },
      { name = "GP2GP_ADAPTOR_AUTHORIZATION_KEYS_FOR_GP_TO_REPO", valueFrom = data.aws_ssm_parameter.gp2gp_adaptor_authorization_keys_for_gp_to_repo.arn },
      { name = "GP2GP_ADAPTOR_AUTHORIZATION_KEYS_FOR_REPO_TO_GP", valueFrom = data.aws_ssm_parameter.gp2gp_adaptor_authorization_keys_for_repo_to_gp.arn },
      { name = "GP2GP_ADAPTOR_MHS_QUEUE_USERNAME", valueFrom = data.aws_ssm_parameter.amq-username.arn },
      { name = "GP2GP_ADAPTOR_MHS_QUEUE_PASSWORD", valueFrom = data.aws_ssm_parameter.amq-password.arn },
    ]
}

resource "aws_ecs_task_definition" "task" {
  family                    = var.component_name
  network_mode              = "awsvpc"
  requires_compatibilities  = ["FARGATE"]
  cpu                       = var.task_cpu
  memory                    = var.task_memory
  execution_role_arn        = local.task_execution_role
  task_role_arn             = local.task_role_arn


  container_definitions  =  templatefile("${path.module}/templates/ecs-task-def.tmpl", {
        container_name        = "${var.component_name}-container",
        ecr_url               = local.task_ecr_url,
        image_name            = "deductions/gp2gp-worker",
        image_tag             = var.task_image_tag,
        cpu                   = var.task_cpu,
        memory                = var.task_memory,
        log_region            = var.region,
        log_group             = local.task_log_group,
        environment_variables = jsonencode(local.environment_variables),
        secrets               = jsonencode(local.secret_environment_variables)
    })

  tags = {
    Environment = var.environment
    CreatedBy = var.repo_name
  }
}
