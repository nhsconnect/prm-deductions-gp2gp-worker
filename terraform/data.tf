data "aws_caller_identity" "current" {}

data "aws_ssm_parameter" "gp2gp_worker_authorization_keys_for_ehr_repo" {
  name = "/repo/${var.environment}/user-input/ehr-repo-authorization-keys"
}

data "aws_ssm_parameter" "amq-endpoint_0" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/stomp-endpoint-0"
}

data "aws_ssm_parameter" "amq-endpoint_1" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/stomp-endpoint-1"
}

data "aws_ssm_parameter" "amq-username" {
  name = "/repo/${var.environment}/user-input/mq-app-username"
}

data "aws_ssm_parameter" "amq-password" {
  name = "/repo/${var.environment}/user-input/mq-app-password"
}

data "aws_ssm_parameter" "deductions_private_ecs_cluster_id" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/deductions-private-ecs-cluster-id"
}

data "aws_ssm_parameter" "deductions_private_private_subnets" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/deductions-private-private-subnets"
}

data "aws_ssm_parameter" "deductions_private_vpc_id" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/private-vpc-id"
}

data "aws_ssm_parameter" "deductions_private_gp2gp_worker_sg_id" {
  name = "/repo/${var.environment}/output/prm-deductions-infra/deductions-private-gp2gp-worker-sg-id"
}

data "aws_ssm_parameter" "gp2gp_worker_gp_to_repo_url" {
  name = "/repo/${var.environment}/output/prm-deductions-gp-to-repo/service-url"
}

data "aws_ssm_parameter" "gp2gp_worker_authorization_keys_for_gp_to_repo" {
  name = "/repo/${var.environment}/user-input/gp-to-repo-authorization-keys"
}

