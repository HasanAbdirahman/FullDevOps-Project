name: CI/CD DevOps Pipeline

on:
  push:
    branches:
      - main

env:
  AWS_REGION: us-east-1
  CLUSTER_NAME: dev-eks-cluster
  CLUSTER_VERSION: 1.28

jobs:
  build-and-push-images:
    name: Build and Push Docker Images
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Docker login
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Backend Image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/devops-backend:${{ github.sha }} ./backend
          docker push ${{ secrets.DOCKER_USERNAME }}/devops-backend:${{ github.sha }}

      - name: Build Frontend Image
        run: |
          docker build \
            --build-arg REACT_APP_API_URL=http://backend-service:4000/api \
            -t ${{ secrets.DOCKER_USERNAME }}/devops-frontend:${{ github.sha }} \
            ./frontend/app
          docker push ${{ secrets.DOCKER_USERNAME }}/devops-frontend:${{ github.sha }}

  deploy-to-terraform:
    name: Deploy EKS with Terraform
    runs-on: ubuntu-latest
    needs: build-and-push-images

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.6.0

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Clean Terraform directory
        run: rm -rf Terraform/.terraform Terraform/.terraform.lock.hcl

      - name: Terraform Init
        run: terraform init -upgrade -chdir=Terraform/

      - name: Terraform Plan
        run: |
          terraform plan \
            -var="aws_region=${{ env.AWS_REGION }}" \
            -var="cluster_name=${{ env.CLUSTER_NAME }}" \
            -var="cluster_version=${{ env.CLUSTER_VERSION }}" \
            -chdir=Terraform/

      - name: Terraform Apply
        run: |
          terraform apply -auto-approve \
            -var="aws_region=${{ env.AWS_REGION }}" \
            -var="cluster_name=${{ env.CLUSTER_NAME }}" \
            -var="cluster_version=${{ env.CLUSTER_VERSION }}" \
            -chdir=Terraform/

  deploy-to-kubernetes:
    name: Deploy to Kubernetes
    runs-on: ubuntu-latest
    needs: deploy-to-terraform

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.27.0'

      - name: Get kubeconfig from AWS EKS
        run: |
          aws eks update-kubeconfig --name ${{ env.CLUSTER_NAME }} --region ${{ env.AWS_REGION }}

      - name: Deploy Backend
        run: |
          kubectl apply -f K8/backend/deployment.yaml
          kubectl apply -f K8/backend/service.yaml

      - name: Deploy Frontend
        run: |
          kubectl apply -f K8/frontend/deployment.yaml
          kubectl apply -f K8/frontend/service.yaml
