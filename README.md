# 🌐 Full DevOps Project

![Terraform](https://img.shields.io/badge/Terraform-IaC-623CE4?logo=terraform&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=github-actions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Overview

The **Full DevOps Project** demonstrates a complete DevOps pipeline — from provisioning cloud infrastructure with **Terraform**, to automating CI/CD with **GitHub Actions**, to deploying containerized applications using **Kubernetes**.

This project showcases the integration of DevOps tools for scalable, automated, and cloud-native application delivery.

---

## 🧩 Project Structure

```
FullDevOps-Project-main/
├── .github/
│   └── workflows/
│       ├── devops.yaml           # CI/CD pipeline for build & deploy
│       └── destroy-infra.yaml    # Workflow to destroy infrastructure
│
├── Terraform/
│   ├── main.tf                   # Main Terraform configuration
│   ├── outputs.tf                # Output variables
│   ├── provider.tf               # Provider setup (e.g., AWS)
│   └── variable.tf               # Input variable definitions
│
├── K8/
│   ├── backend/
│   │   ├── deployment.yaml       # Backend Deployment
│   │   └── service.yaml          # Backend Service
│   └── frontend/
│       ├── deployment.yaml       # Frontend Deployment
│       └── service.yaml          # Frontend Service
│
├── backend/
│   ├── Dockerfile                # Backend Docker image definition
│   ├── package.json              # Dependencies and scripts
│   ├── server.js                 # Node.js backend entry point
│   └── controllers/
│       └── todosController.js    # Example API controller
│
└── README.md                     # Project documentation
```

---

## ⚙️ Technologies Used

| Tool | Purpose |
|------|----------|
| **Terraform** | Infrastructure as Code (IaC) for provisioning cloud resources |
| **AWS / Cloud Provider** | Hosting infrastructure |
| **Docker** | Application containerization |
| **Kubernetes (K8s)** | Orchestration and deployment |
| **GitHub Actions** | CI/CD automation pipelines |
| **Node.js / Express** | Backend REST API |

---

## 🏗️ Infrastructure Setup (Terraform)

1. Navigate to the Terraform directory:
   ```bash
   cd Terraform
   ```
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Plan and apply the configuration:
   ```bash
   terraform plan
   terraform apply
   ```

This provisions the infrastructure required for deployment.

---

## 🧱 Build and Run Locally

### Backend
```bash
cd backend
docker build -t backend-app .
docker run -p 8080:8080 backend-app
```

### Frontend
If a frontend directory exists, follow the same steps with its Dockerfile.

---

## 🚢 CI/CD with GitHub Actions

Automated pipelines are defined in `.github/workflows/`:

- **`devops.yaml`** — Builds, tests, and deploys applications to Kubernetes.
- **`destroy-infra.yaml`** — Tears down Terraform-managed infrastructure safely.

Workflows trigger automatically on push or pull request to main branches.

---

## 📦 Kubernetes Deployment

To deploy manually using `kubectl`:

```bash
kubectl apply -f K8/backend/
kubectl apply -f K8/frontend/
```

Verify deployment:
```bash
kubectl get pods
kubectl get services
```

---

## 🧹 Teardown Infrastructure

When done, you can destroy cloud resources:
```bash
cd Terraform
terraform destroy
```

Or run the **`destroy-infra.yaml`** workflow from GitHub Actions.

---

## 🧠 Key Learning Outcomes

- Automate provisioning using **Terraform**
- Build and push Docker images via **CI/CD**
- Manage deployments in **Kubernetes**
- Implement end-to-end **DevOps pipelines** with modern tools
- Gain hands-on experience integrating **cloud, automation, and containers**

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to fork, modify, and enhance for your own learning or deployments.

---

**💡 Author:** Hasan Abdirahman  
**📘 Purpose:** Educational DevOps demonstration project integrating Terraform, Docker, Kubernetes, and GitHub Actions.
````
