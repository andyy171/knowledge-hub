---
title: "Logging và Monitoring Overview"
date: 2024-03-12T22:01:00+07:00
draft: false
author: "Duy Anh "
categories: ["Linux", "Logging", "Monitoring"]
tags: []
---

# Giới thiệu chung 

## Các lệnh thường dùng 

Giám sát tài nguyên
free -m          # Hiển thị bộ nhớ sử dụng theo MB
vmstat 1         # Thống kê bộ nhớ ảo mỗi giây

Phân tích hiệu suất
perf top         # Phân tích hiệu suất CPU
strace command   # Theo dõi system calls của một lệnh