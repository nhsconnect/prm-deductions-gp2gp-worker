variable "region" {
  type    = string
  default = "eu-west-2"
}

variable "repo_name" {
  type = string
  default = "prm-deductions-gp2gp-worker"
}

variable "environment" {}

variable "component_name" {}
variable "task_image_tag" {}
variable "task_cpu" {}
variable "task_memory" {}

variable "service_desired_count" {}
