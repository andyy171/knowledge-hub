---
title: "Các lệnh cơ bản trong Shell và CLI"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Giới thiệu các lệnh cơ bản trong shell Linux để làm việc với giao diện dòng lệnh (CLI)."
categories: ["Linux", "Shell"]
tags: ["cli", "shell", "basic-commands"]
---

## Giới thiệu
Shell là giao diện dòng lệnh chính trong Linux, nơi người dùng nhập các lệnh để thao tác với hệ thống. Các lệnh cơ bản giúp làm việc hiệu quả với CLI.

---

## Các lệnh cơ bản
- **`ls`**: Liệt kê tệp/thư mục trong thư mục hiện tại.
  - Ví dụ: `ls` hiển thị `ansible`, `bin`, `desktop`.
  - `ls -l`: Hiển thị chi tiết (quyền, loại tệp).
- **`cd <tên>`**: Chuyển đổi thư mục.
  - Ví dụ: `cd learn_linux` vào thư mục `learn_linux`.
  - `cd ..`: Quay lại thư mục trước.
  - `cd`: Vào thư mục home.
  - `cd ../..`: Quay lại hai cấp thư mục.
- **`pwd`**: Hiển thị đường dẫn thư mục hiện tại.
  - Ví dụ: `pwd` trả về `/home/user/learn_linux`.
- **`clear`**: Xóa màn hình terminal.
- **`history`**: Xem lịch sử lệnh đã chạy.
  - Ví dụ: `history` liệt kê các lệnh trước đó.
- **`man <lệnh>`**: Xem tài liệu lệnh.
  - Ví dụ: `man rm` hiển thị chi tiết về lệnh `rm`.

---

## Mẹo
- Sử dụng phím **Tab** để tự động hoàn thành tên tệp/thư mục.
- Dùng `&&` để chạy nhiều lệnh liên tiếp: `mkdir test && cd test`.


# File manipulation
Các lệnh chính 

- Tạo thư mục

mkdir <tên_thư_mục>
mkdir -p cha/con  # tạo đệ quy

```bash
cp src dest
cp file1 file2 dir_dest/
cp -r dir_src dir_dest/
cp -a src dest  # archive mode: giữ thuộc tính
```

- Di chuyển / Đổi tên

```bash
mv từ_đường_dẫn tới_đích
mv oldname newname
mv -i file dest  # hỏi trước khi ghi đè
```

- Xóa

```bash
rm file
rm -r dir     # xóa đệ quy
rm -i file    # tương tác
```

- Liên kết

```bash
ln src hardlink
ln -s src symlink
```

- Tìm kiếm
```bash
find /path -name "pattern"
```

- Nén / giải nén (tar)
```bash
tar -cvf archive.tar thư_mục
tar -xvf archive.tar
```

- Xem nội dung

```bash
cat file
less file      # pager
tail -n 20 file
```

- Chuyển hướng / Pipes

```bash
ls -l > list.txt
grep "mẫu" file | less
```
- Lưu ý 

```
- Sử dụng -i để tránh mất dữ liệu do ghi đè.
- Dùng cp -a để giữ quyền/owner/timestamps.
- ln -s tạo symlink — quyền áp dụng cho target, không cho symlink.
```