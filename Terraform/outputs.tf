output "cluster_id" {
  description = "EKS cluster ID"
  value       = module.eks.cluster_id
}

output "kubeconfig" {
  description = "Kubeconfig for the cluster"
  value       = module.eks.kubeconfig
}

output "cluster_endpoint" {
  description = "Cluster API endpoint"
  value       = module.eks.cluster_endpoint
}
