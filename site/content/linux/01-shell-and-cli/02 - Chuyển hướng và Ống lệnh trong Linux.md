---
title: "02 - Chuyển hướng và Ống lệnh trong Linux"
date: 2025-09-09T20:00:00+07:00
draft: false
author: ""
description: "Giới thiệu chi tiết về chuyển hướng đầu ra, đầu lỗi, ghi đè/ghi nối tệp, ống lệnh và here-doc trong Linux"
categories: ["Linux"]
---

# Giới thiệu
Trong Linux, **chuyển hướng (redirection)** và **ống lệnh (pipe)** là cơ chế quan trọng giúp điều khiển dữ liệu giữa các lệnh, tệp và thiết bị. Chúng cho phép bạn:
- Ghi hoặc đọc dữ liệu từ/đến tệp thay vì màn hình.
- Chuyển kết quả từ lệnh này sang lệnh khác để xử lý tiếp.

---

## Luồng tiêu chuẩn (Standard Streams)
Mỗi tiến trình trong Linux có ba luồng dữ liệu mặc định:
- **stdin (Standard Input):** Đầu vào tiêu chuẩn (bàn phím).
- **stdout (Standard Output):** Đầu ra tiêu chuẩn (màn hình).
- **stderr (Standard Error):** Đầu ra lỗi tiêu chuẩn (màn hình).

---

## Chuyển hướng đầu ra và đầu lỗi

### `>` – Ghi đè đầu ra
Chuyển hướng **stdout** của lệnh vào tệp, **ghi đè** nội dung tệp nếu đã tồn tại.

```bash
ls -l > output.txt
```
Tất cả kết quả lệnh ls -l sẽ ghi vào output.txt (màn hình không hiển thị gì).

### >> – Ghi nối đầu ra
Chuyển hướng stdout vào tệp nhưng nối thêm vào cuối tệp thay vì ghi đè.

```bash
echo "Dòng mới" >> output.txt
#Thêm “Dòng mới” vào cuối output.txt.
```
## Chuyển hướng stderr
- `2>` ghi đè lỗi vào tệp.
- `2>>` ghi nối lỗi vào tệp.

```bash
 
ls /khong_ton_tai 2> error.log
# Lưu thông báo lỗi vào error.log.
```
## Kết hợp stdout và stderr
Chuyển cả đầu ra chuẩn và đầu lỗi vào cùng tệp:

```bash
command > all.log 2>&1
```
# Chuyển hướng đầu vào (stdin)
Dùng < để lấy dữ liệu đầu vào từ tệp thay vì bàn phím.

```bash

sort < unsorted.txt
# Đọc nội dung unsorted.txt làm đầu vào cho lệnh sort.
```

## Ống lệnh (Pipe) – |
- Pipe chuyển stdout của lệnh trước làm stdin cho lệnh sau.
- Giúp kết hợp nhiều lệnh để xử lý dữ liệu theo chuỗi.

```bash
ls -l | grep ".txt"
Liệt kê file rồi lọc các file .txt.
```
```bash
cat file.txt | sort | uniq -c
Đọc file, sắp xếp rồi đếm số dòng trùng.
```

## Here-Document (Here-Doc)
Here-Doc cung cấp nội dung nhiều dòng làm đầu vào cho lệnh trực tiếp trong script mà không cần tệp riêng.

Cú pháp:

```bash

command <<DELIMITER
nội dung dòng 1
nội dung dòng 2
DELIMITER
```
Ví dụ:

```bash
cat <<EOF
Xin chào
Đây là ví dụ Here-Doc
EOF
``
<<
Kết luận
stdout (>) để ghi đè, (>>) để ghi nối.
stderr (2>, 2>>) để chuyển hướng lỗi.
| (Pipe) để nối lệnh và xử lý tuần tự.
Here-Doc để cung cấp dữ liệu nhiều dòng làm đầu vào.
>>