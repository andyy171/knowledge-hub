---
title: "Kubernetes"
date: 2024-01-01T00:00:00+07:00
draft: false
description: "Container orchestration và quản lý cluster"
---

# Kubernetes Knowledge Base

Tài liệu về Kubernetes, container orchestration platform.

## Nội dung chính

- **Pods & Containers**: Đơn vị cơ bản của Kubernetes
- **Services & Networking**: Expose applications
- **Deployments**: Quản lý application lifecycle  
- **ConfigMaps & Secrets**: Configuration management

## Quick Commands

```bash
# Basic operations
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl apply -f manifest.yaml
kubectl delete -f manifest.yaml