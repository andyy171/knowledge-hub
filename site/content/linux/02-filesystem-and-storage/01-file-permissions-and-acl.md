---
title: "Thao tác với Tệp và Thư mục"
date: 2024-03-12T22:01:00+07:00
draft: false
author: "Duy Anh "
description: "Hướng dẫn tạo, chỉnh sửa, sao chép, di chuyển và xóa tệp/thư mục trong Linux."
categories: ["Linux", "Filesystem"]
tags: ["file", "directory", "operations"]
---

# các loại file 

- Ký tự đầu :
+ ```-``` regular
+ ```d``` directory
+ ```l``` symlink
+ ```c``` char device, 
+ ```b``` block device.

- 9 ký tự sau : 
rwx r-x r-x => owner | group | others.

+ Trong đó : 
* Với file : r đọc; w ghi; x thực thi.
* Với Directory : r liệt kê; x truy cập (cd); w thay đổi cấu trúc (tạo/xóa).

# Unmask
Umask khấu trừ quyền mặc định:

File mặc định: 666 → trừ umask → final.

Dir mặc định: 777 → trừ umask → final.

Ví dụ: umask 022 → file = 644, dir = 755.

- Ví dụ lệnh cơ bản 
```bash
chmod 755 file      # thay quyền (octal hoặc symbolic)
chown user:group file
chgrp group file
getfacl/setfacl file  # ACLs (nâng cao)```