---
title: "Cấu trúc thư mục"
date: 2024-03-12T22:01:00+07:00
draft: false
author: "Duy Anh "
description: "Hướng dẫn tạo, chỉnh sửa, sao chép, di chuyển và xóa tệp/thư mục trong Linux."
categories: ["Linux", "Filesystem"]
tags: ["file", "directory", "operations"]
---

## Giới thiệu
Hệ thống tệp trong Linux cho phép quản lý tệp và thư mục thông qua các lệnh mạnh mẽ, giúp tự động hóa và thao tác nhanh chóng.

---

## Các lệnh thao tác với tệp/thư mục
- **`mkdir <tên>`**: Tạo thư mục.
  - Ví dụ: `mkdir learn_linux` tạo thư mục `learn_linux`.
- **`touch <tên_tệp>`**: Tạo tệp rỗng.
  - Ví dụ: `touch one.txt` tạo tệp `one.txt`.
- **`nano <tên_tệp>`**: Tạo/sửa tệp bằng trình chỉnh sửa nano.
  - Ví dụ: `nano one.txt`, lưu bằng `Ctrl+X`, `Y`, `Enter`.
- **`vim <tên_tệp>`**: Tạo/sửa tệp bằng Vim.
  - Nhấn `i` để chỉnh sửa, `Esc`, `:wq` lưu và thoát, `:q!` thoát không lưu.
- **`cat <tên_tệp>`**: Xem nội dung tệp.
  - Ví dụ: `cat one.txt` hiển thị nội dung.
- **`cp <tệp_nguồn> <đích>`**: Sao chép tệp/thư mục.
  - Ví dụ: `cp one.txt test1/` sao chép `one.txt` vào `test1`.
- **`mv <tệp_nguồn> <đích>`**: Di chuyển/đổi tên tệp.
  - Ví dụ: `mv one.txt my_new_file.txt` đổi tên tệp.
  - Ví dụ: `mv two.txt test1/` di chuyển `two.txt` vào `test1`.
- **`rm <tên_tệp>`**: Xóa tệp.
  - Ví dụ: `rm one.txt` xóa tệp `one.txt`.
- **`rm -r <tên_thư_mục>`**: Xóa thư mục và nội dung (đệ quy).
  - Ví dụ: `rm -r test1` xóa thư mục `test1`.

Quyền của tập tin
chmod 755 file             # rwx cho owner, rx cho group & others
chown user:group file      # Thay đổi quyền sở hữu tập tin

Tìm kiếm tập tin
find / -type f -name "*.log"   # Tìm tất cả file log
find / -mtime -7               # Tìm file chỉnh sửa trong 7 ngày gần nhất

Sử dụng đĩa
du -sh *                      # Kích thước thư mục hiện tại
df -h                         # Dung lượng filesystem
---

## Mẹo
- Sử dụng đường dẫn đầy đủ khi thao tác với tệp/thư mục ngoài thư mục hiện tại.
- `rm -r` cần cẩn thận vì xóa đệ quy không thể khôi phục.