---
title: "Quản lý Người dùng trong Linux"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Giới thiệu cách kiểm tra và chuyển đổi người dùng trong Linux."
categories: ["Linux", "Users"]
tags: ["user", "authentication", "sudo"]
---

## Giới thiệu
Quản lý người dùng trong Linux liên quan đến việc kiểm tra danh tính người dùng hiện tại và chuyển đổi quyền truy cập (root/user).

---

## Các lệnh quản lý người dùng
- **`whoami`**: Hiển thị người dùng hiện tại.
  - Ví dụ: `whoami` trả về `user` hoặc `root`.
- **`sudo su`**: Chuyển sang người dùng root (yêu cầu mật khẩu).
  - Ví dụ: `sudo su` đăng nhập với quyền root.
- **`exit`**: Thoát khỏi phiên root hoặc SSH, quay lại người dùng trước đó.

---

## Mẹo
- Sử dụng `sudo` để chạy lệnh với quyền root, tránh lỗi "Permission denied".
- Kiểm tra người dùng trước khi thực hiện tác vụ nhạy cảm.