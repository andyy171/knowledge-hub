---
title: "Quyền trong Linux (Permissions)"
date: 2025-09-09T20:00:00+07:00
draft: false
author: "Your Name"
description: "Giới thiệu chi tiết về quyền trong Linux, bao gồm user, group, và other."
categories: ["Linux"]
tags: ["permissions", "security", "file-system"]
---

## Giới thiệu
Trong Linux, mỗi file và thư mục đều có cơ chế **phân quyền (permissions)** để kiểm soát việc đọc, ghi, và thực thi. Đây là một trong những yếu tố quan trọng nhất để đảm bảo an toàn hệ thống.

---

## Các loại quyền cơ bản
Mỗi file/thư mục có 3 quyền chính:
- **r (read):** Quyền đọc nội dung file hoặc liệt kê thư mục.
- **w (write):** Quyền sửa/xóa file hoặc thêm bớt file trong thư mục.
- **x (execute):** Quyền chạy file như chương trình, hoặc truy cập thư mục.

---

## Cấu trúc phân quyền
Quyền được chia cho 3 đối tượng:
1. **User (chủ sở hữu)**
2. **Group (nhóm)**
3. **Others (người dùng khác)**

Ví dụ output từ `ls -l`:

```bash
-rwxr-xr--
