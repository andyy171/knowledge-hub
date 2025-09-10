---
title: "Quản lý Gói Phần mềm trong Linux"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Hướng dẫn cài đặt, cập nhật và gỡ bỏ gói phần mềm trong Linux (Ubuntu)."
categories: ["Linux", "Packages"]
tags: ["apt", "package-management", "software"]
---

## Giới thiệu
Quản lý gói phần mềm là kỹ năng quan trọng để cài đặt, cập nhật và gỡ bỏ phần mềm trên Linux, đặc biệt với Ubuntu sử dụng `apt`.

---

## Các lệnh quản lý gói
- **`sudo apt install <tên_gói>`**: Cài đặt gói.
  - Ví dụ: `sudo apt install docker` cài Docker.
- **`sudo apt update && sudo apt upgrade`**: Cập nhật danh sách gói và nâng cấp gói.
- **`sudo apt purge <tên_gói>`**: Gỡ cài đặt gói.
  - Ví dụ: `sudo apt purge git` gỡ Git.
- **`which <tên_lệnh>`**: Tìm đường dẫn gói đã cài.
  - Ví dụ: `which docker` trả về `/usr/bin/docker`.

---

## Các trình quản lý gói
- **Ubuntu**: `apt`, `apt-get`.
- **CentOS/Fedora**: `yum`, `dnf`.
- **Red Hat**: `rpm`.

---

## Mẹo
- Luôn chạy `sudo apt update` trước khi cài đặt để đảm bảo danh sách gói mới nhất.
- Kiểm tra tên gói chính xác bằng Google hoặc `man apt`.

# Lệnh cài đặt các hệ thống gói 

- Debian/Ubuntu

```bash
apt update
apt install pkg
apt remove pkg
apt --fix-broken install
dpkg -i file.deb
dpkg -l
```

- RHEL/Fedora
```bash
dnf install pkg
dnf upgrade
rpm -ivh pkg.rpm
```

- Snap/Flatpak
```bash
snap install <pkg>
flatpak install flathub <app>
```
## Đường dẫn lưu cấu hình
- Debian: /etc/apt/sources.list và /etc/apt/sources.list.d/
- RHEL: /etc/yum.repos.d/

- Lưu ý
+ Hầu hết lệnh cài gói cần sudo/root.
+ Đọc changelogs và kiểm tra dependency trước khi upgrade production.