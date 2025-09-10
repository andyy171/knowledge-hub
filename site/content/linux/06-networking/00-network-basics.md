---
title: "Các lệnh Mạng trong Linux"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Giới thiệu các lệnh mạng để kiểm tra kết nối, tra cứu DNS và tải nội dung."
categories: ["Linux", "Networking"]
tags: ["network", "ping", "curl", "wget"]
---

## Giới thiệu
Các lệnh mạng trong Linux giúp kiểm tra kết nối, tra cứu thông tin tên miền và tải dữ liệu từ web.

---

## Các lệnh mạng
- **`ping <tên_miền>`**: Kiểm tra kết nối đến máy chủ.
  - Ví dụ: `ping google.com` kiểm tra trạng thái Google.
- **`nslookup <tên_miền>`**: Tra cứu thông tin DNS.
  - Ví dụ: `nslookup google.com` trả về địa chỉ IP.
- **`curl <URL>`**: Lấy nội dung từ URL (thường là HTML).
  - Ví dụ: `curl google.com` lấy nội dung trang Google.
- **`wget <URL>`**: Tải tệp từ URL.
  - Ví dụ: `wget <link_python>` tải Python installer.

---

## Mẹo
- Dùng `Ctrl+C` để dừng lệnh `ping`.
- Sử dụng `wget` để tải tệp mà không cần giao diện đồ họa.