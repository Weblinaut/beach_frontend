terraform {
  backend "s3" {
    bucket="beachsets-tf-state"
    key="terraform/front/terraform.tfstate"
    region="us-east-1"
  }
}