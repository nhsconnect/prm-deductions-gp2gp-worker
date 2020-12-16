locals {
  account_id = data.aws_caller_identity.current.account_id
}

data "aws_iam_policy_document" "ecs-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = [
        "ecs-tasks.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "gp2gp" {
  name               = "${var.environment}-${var.component_name}-EcsTaskRole"
  assume_role_policy = data.aws_iam_policy_document.ecs-assume-role-policy.json
  description        = "Role assumed by ${var.component_name} ECS task"

  tags = {
    Environment = var.environment
    CreatedBy = var.repo_name
  }
}

data "aws_iam_policy_document" "ecr_policy_doc" {
  statement {
    actions = [
      "ecr:*"
    ]

    resources = [
      "arn:aws:ecr:${var.region}:${local.account_id}:repository/deductions/gp2gp-adaptor"
    ]
  }
  statement {
    actions = [
      "ecr:GetAuthorizationToken"
    ]

    resources = [
      "*"
    ]
  }
}

data "aws_iam_policy_document" "logs_policy_doc" {
  statement {
    actions = [
      "logs:*"
    ]

    resources = [
      "*"
    ]
  }
}

data "aws_iam_policy_document" "ssm_policy_doc" {
  statement {
    actions = [
      "ssm:*"
    ]

    resources = [
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/user-input/gp-to-repo-authorization-keys",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/user-input/repo-to-gp-authorization-keys",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/user-input/ehr-repo-authorization-keys",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/output/prm-deductions-repo-to-gp/repo-to-gp-service-url",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/output/prm-deductions-gp-to-repo/service-url",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/user-input/mq-app-username",
      "arn:aws:ssm:${var.region}:${local.account_id}:parameter/repo/${var.environment}/user-input/mq-app-password",
    ]
  }
}

resource "aws_iam_policy" "gp2gp-ecr" {
  name   = "${var.environment}-gp2gp-worker-ecr"
  policy = data.aws_iam_policy_document.ecr_policy_doc.json
}

resource "aws_iam_policy" "gp2gp-logs" {
  name   = "${var.environment}-gp2gp-worker-logs"
  policy = data.aws_iam_policy_document.logs_policy_doc.json
}

resource "aws_iam_policy" "gp2gp-ssm" {
  name   = "${var.environment}-gp2gp-worker-ssm"
  policy = data.aws_iam_policy_document.ssm_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "gp2gp-ecr-attach" {
  role       = aws_iam_role.gp2gp.name
  policy_arn = aws_iam_policy.gp2gp-ecr.arn
}

resource "aws_iam_role_policy_attachment" "gp2gp-ssm" {
  role       = aws_iam_role.gp2gp.name
  policy_arn = aws_iam_policy.gp2gp-ssm.arn
}

resource "aws_iam_role_policy_attachment" "gp2gp-logs" {
  role       = aws_iam_role.gp2gp.name
  policy_arn = aws_iam_policy.gp2gp-logs.arn
}
