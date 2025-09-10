---
title: "Công cụ Filebeat "
date: 2024-01-10T02:30:00+07:00
draft: false
author: "Duy Anh"
description: "Kiến thức chung về công cụ Filebeat"
categories: ["Linux"]
tags: ["logging", "monitoring", "filebeat"]
---


# Thu thập Log dễ dàng với Filebeat trên Linux

## I. Giới thiệu về Filebeat và tầm quan trọng của nó
**Filebeat** là một thành phần trong **Elastic Stack**, đóng vai trò như **lightweight shipper** để thu thập và truyền log từ nhiều nguồn đến nơi lưu trữ/ phân tích như **Elasticsearch** hoặc **Logstash**.  
Lý do chọn Filebeat:
- **Dễ cài đặt**: vài bước cấu hình đơn giản.
- **Tích hợp mạnh mẽ**: hỗ trợ nhiều nguồn log (file, ứng dụng, container).
- **Hiệu suất cao**: xử lý log lớn mà tiêu tốn ít tài nguyên.

### Filebeat trên Linux
- **Linux** ổn định, bảo mật, hiệu năng cao; tối ưu cho Filebeat.
- **Ưu điểm**: tận dụng phần cứng, dễ cấu hình log cụ thể, thu thập log trực tiếp từ container, kết hợp bảo mật mạnh mẽ (SELinux, iptables).

---

## II. Chuẩn bị trước khi cài đặt
### 1. Yêu cầu hệ thống
- Hỗ trợ **Ubuntu ≥16.04**, **Debian ≥8**, **CentOS/RHEL ≥7** và các distro khác (OpenSUSE, Amazon Linux).
- **Tài khoản sudo/root**, kết nối mạng, dung lượng đĩa đủ lớn.

### 2. Công cụ hỗ trợ
- **Cập nhật hệ thống**:
  - Ubuntu/Debian: `sudo apt-get update && sudo apt-get upgrade -y`
  - CentOS/RHEL: `sudo yum update -y`
- **Cài wget hoặc curl**:
  - Ubuntu/Debian: `sudo apt-get install wget curl -y`
  - CentOS/RHEL: `sudo yum install wget curl -y`
- **Cài Java (nếu dùng Logstash)**:
  - Ubuntu/Debian: `sudo apt-get install openjdk-11-jdk -y`
  - CentOS/RHEL: `sudo yum install java-11-openjdk -y`
- Kiểm tra: `java -version`

---

## III. Cài đặt Filebeat trên Linux
### 1. Thêm repository & cài đặt
**Ubuntu/Debian**:
```bash
sudo apt-get install apt-transport-https
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
sudo apt-get update && sudo apt-get install filebeat -y
```

CentOS/RHEL:

sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
sudo sh -c 'echo "[elastic-7.x]
name=Elastic repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
enabled=1
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch" > /etc/yum.repos.d/elastic-7.x.repo'
sudo yum install filebeat -y


Kiểm tra: filebeat version

### 2. Cấu hình Filebeat

File chính: /etc/filebeat/filebeat.yml

Input – Thu thập log:

filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/*.log


Output – Gửi log:

Elasticsearch:

output.elasticsearch:
  hosts: ["http://localhost:9200"]


Logstash:

output.logstash:
  hosts: ["localhost:5044"]

### 3. Khởi chạy Filebeat
sudo systemctl enable filebeat
sudo systemctl start filebeat
sudo systemctl status filebeat
sudo journalctl -u filebeat

## Tích hợp với Elasticsearch & Logstash
### 1. Kết nối Elasticsearch

Chỉnh /etc/filebeat/filebeat.yml:

output.elasticsearch:
  hosts: ["http://localhost:9200"]
  username: "elastic"
  password: "password"


Kiểm tra trên Kibana → Discover → filebeat-*
Hoặc curl:

curl -X GET "localhost:9200/filebeat-*/_search?pretty"

### 2. Kết nối Logstash

Filebeat → Logstash (output.logstash):

output.logstash:
  hosts: ["localhost:5044"]


Pipeline cơ bản Logstash (logstash.conf):

input {
  beats {
    port => 5044
  }
}
filter {
  # thêm filter nếu cần
}
output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
}
## Ví dụ: Thu thập log Nginx
### 1. Kích hoạt module Nginx
```bash
sudo filebeat modules enable nginx
sudo filebeat modules list
```


Chỉnh module nếu cần:
`sudo nano /etc/filebeat/modules.d/nginx.yml`
### 2. Hiển thị log Nginx trong Kibana

Kiểm tra trong Kibana: Discover → filebeat-*
```bash
curl -X GET "localhost:9200/filebeat-*/_search?pretty"
```

Tạo dashboard: Kibana → Dashboard → Create → chọn widget → filter theo filebeat-*.

## Tổng kết & Mẹo tối ưu

Ưu điểm Filebeat: nhẹ, bảo mật (SSL/TLS), dễ mở rộng (Docker, K8s).

Debug: bật logging level:

logging.level: debug
logging.to_files: true


Theo dõi tài liệu chính thức của Elastic để cập nhật tính năng mới.