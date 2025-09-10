---
title: "06 - Công cụ xử lý văn bản: grep, sed, awk, cut, sort, uniq, tr"
date: 2025-09-09T20:00:00+07:00
draft: false
author: ""
description: "Hướng dẫn chi tiết về các công cụ xử lý văn bản phổ biến trên dòng lệnh: **grep**, **sed**, **awk**, **cut**, **sort**, **uniq**, **tr** — cú pháp, mẫu (pattern) và ví dụ thực tế."
categories: ["Linux Cơ bản"]
tags: ["grep", "sed", "awk", "cut", "sort", "uniq", "tr"]
---

# Giới thiệu
Các công cụ **grep**, **sed**, **awk**, **cut**, **sort**, **uniq**, **tr** là bộ công cụ cơ bản để **xử lý văn bản và log** trên Linux/UNIX. Chúng hoạt động tốt khi kết hợp thành **pipeline** để trích xuất, biến đổi và tổng hợp dữ liệu. Dưới đây là giải thích chi tiết, các tùy chọn quan trọng, mẫu (pattern) thường dùng và nhiều ví dụ thực tế.

---

## Tổng quan về dạng pattern (regex)
Trước khi đi vào từng công cụ, cần phân biệt các loại **regular expressions**:
- **Basic Regular Expression (BRE)**: chế độ mặc định trong nhiều lệnh (ví dụ `grep` không có `-E`).
- **Extended Regular Expression (ERE)**: có `|`, `+`, `?`, `()` trực tiếp; dùng `grep -E` hoặc `egrep`.
- **Perl-compatible Regex (PCRE)**: hỗ trợ biểu thức mạnh hơn; dùng `grep -P` (nếu `grep` hỗ trợ).

Các ký hiệu hay dùng:
- `.` — một ký tự bất kỳ (ngoại trừ newline).
- `*` — 0 hoặc nhiều lần.
- `+` — 1 hoặc nhiều lần (ERE/PCRE).
- `?` — 0 hoặc 1 lần (ERE/PCRE).
- `^` — bắt đầu dòng.
- `$` — kết thúc dòng.
- `\b` — ranh giới từ (PCRE).
- `()` — nhóm.
- `[]` — tập ký tự (ví dụ `[0-9]`).

---

## grep — tìm kiếm theo pattern
**Mục đích:** tìm dòng khớp pattern.

**Tùy chọn quan trọng**
- `-i` — ignore case.
- `-v` — in những dòng **không** khớp.
- `-n` — in số dòng.
- `-H` — in tên file.
- `-r` / `-R` — đệ quy trong thư mục.
- `-l` — chỉ in tên file có khớp.
- `-c` — đếm số dòng khớp.
- `-o` — chỉ in phần khớp (match) thay vì cả dòng.
- `-E` — dùng ERE (tương tự `egrep`).
- `-F` — fixed strings (không dùng regex) — rất nhanh.
- `-P` — PCRE (nếu được hỗ trợ).

**Ví dụ**
```bash
#  Tìm các dòng chứa `error` không phân biệt chữ hoa thường:
grep -i "error" /var/log/syslog

# Đếm file chứa từ TODO:
grep -r -l "TODO" ./project | wc -l

# In chỉ phần khớp (email):
grep -oE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}" file.txt

# Tìm các dòng khớp nhưng in số dòng:
grep -n "function_name" script.sh

# Tip hiệu năng: dùng -F cho chuỗi cố định; dùng -r kèm --exclude/--include để giới hạn.
```

### sed — bộ biến đổi dòng (stream editor)

Mục đích: thay thế/biến đổi nội dung theo dòng — rất mạnh để sửa tệp hoặc thao tác stream.

Cú pháp cơ bản
```bash
sed 's/pattern/replacement/flags' file
```

`s` — substitute.
`g` — global (thay tất cả occurrences trong dòng).
`i` — ignore case (tùy sed).
`-n` + `p` — in có chọn lọc: `sed -n '1,5p' file` in dòng 1–5.
`-i` — chỉnh tệp tại chỗ (in-place). Cẩn trọng: hãy backup trước khi dùng -i (hoặc -i.bak).

- Địa chỉ (addressing)
+ Chỉ định dòng: sed '5d' file (xóa dòng 5).
+ Khoảng: sed '3,7s/foo/bar/' file.
+ Theo pattern: sed '/^#/d' file (xóa dòng bắt đầu bằng #).

- Các lệnh thường dùng
`d` — delete dòng.
`p` — print dòng (khi dùng -n).
`a\` — append sau dòng.
`i\` — insert trước dòng.
`y` — transliterate (như tr).
`&` trong replacement: phần match.

Ví dụ
```bash
# Thay foo thành bar trong file (in ra stdout):
sed 's/foo/bar/g' file.txt

# Thay trực tiếp trong file (tạo backup .bak):
sed -i.bak 's/old_value/new_value/g' config.cfg

# Xóa các dòng trống (chỉ chứa whitespace):
sed '/^[[:space:]]*$/d' file.txt

# In các dòng giữa hai pattern:
sed -n '/START/,/END/p' file.txt

# Sử dụng group và tham chiếu:
echo "Doe, John" | sed -E 's/([A-Za-z]+), ([A-Za-z]+)/\2 \1/'
# Output: John Doe
```

>Lưu ý: sed xử lý theo dòng (line-oriented). Để làm việc trên nhiều dòng, cần dùng trick hoặc công cụ khác (awk, perl).

### awk — ngôn ngữ xử lý bản ghi & cột

Mục đích: xử lý theo trường (fields), tổng hợp, báo cáo — rất mạnh cho CSV/TSV/log.

- Cú pháp cơ bản
```bash
awk 'pattern { action }' file
```
- Mặc định FS (field separator) là whitespace; thay FS bằng -F',' cho CSV.
- Biến quan trọng: NR (số dòng hiện tại), NF (số trường hiện tại), $1, $2, ... (các trường).
- Blocks: BEGIN {} chạy trước khi đọc; END {} chạy sau khi đọc xong.

- Ví dụ hữu ích
```bash
# In cột 3:
awk '{print $3}' file

# Số tổng cột 2 (ví dụ tổng bytes):
awk '{sum += $2} END {print sum}' data.txt

# Chỉ in dòng có cột 5 > 100:
awk '$5 > 100 {print $0}' file

# Đặt delimiter và in CSV với headers:
awk -F, 'BEGIN {OFS=","; print "name,age"} NR>1 { if ($3 > 18) print $1,$2 }' people.csv

# Đếm số lần xuất hiện (group-by):
awk '{count[$1]++} END {for (k in count) print k, count[k]}' file.log

# Format bằng printf:
awk '{printf "%-20s %8d\n", $1, $2}' data.txt


Tip: awk có thể thay thế nhiều pipeline cut | sort | uniq -c bằng 1 script awk — tiết kiệm I/O.
```
### cut — cắt trường/byte/char đơn giản

Mục đích: trích xuất cột cố định hoặc vị trí byte/char.

- Tùy chọn
`-d` — delimiter (mặc định tab).
`-f `— field (ví dụ -f1,3-5).
`-b` — byte positions.
`-c` — character positions.

- Ví dụ
```bash
# Lấy cột 1 và 3 theo dấu phẩy:
cut -d',' -f1,3 file.csv

# Lấy trường thứ nhất trước dấu : (ví dụ /etc/passwd):
cut -d':' -f1 /etc/passwd

# Lấy ký tự 1–10 của mỗi dòng:
cut -c1-10 file.txt

Lưu ý: cut -b/-c xử lý byte/char, có thể gây lỗi với UTF-8 đa byte — ưu tiên dùng awk cho văn bản UTF-8 phức tạp.
```
### sort — sắp xếp dòng

Mục đích: sắp xếp file/stream theo nhiều tiêu chí.

- Tùy chọn quan trọng

`-n` — số học (numeric).
`-r` — đảo (reverse).
`-k` — key/column (ví dụ -k2,2).
`-t` — delimiter cho key (ví dụ -t,).
`-u` — unique (giữ 1 bản).
`-M` — sắp xếp theo month name (Jan, Feb).
`-V` — version sort (1.2 < 1.10).
`-c` — check nếu đã sắp xếp (không thay đổi).

- Ví dụ
```bash
# Sắp xếp file theo số ở cột 3:
sort -n -k3,3 file.txt

# Sắp xếp log và loại trùng:
sort access.log | uniq -c | sort -nr

# Sắp xếp CSV theo cột 2 (delimiter ,):
sort -t, -k2,2 file.csv

Tip: Khi dùng sort trước uniq, giúp uniq hoạt động đúng (uniq chỉ loại trùng kề nhau).
```

### uniq — loại trùng kề nhau

Mục đích: loại dòng trùng lặp kề nhau (thường kết hợp sort).

- Tùy chọn

`-c` — in số lần lặp trước mỗi dòng.

`-d` — chỉ in các dòng xuất hiện >1 lần.

`-u` — chỉ in các dòng xuất hiện 1 lần.

`-f N` — bỏ qua N trường đầu khi so sánh.

`-s N` — bỏ qua N ký tự đầu khi so sánh.

- Ví dụ
```bash
# Đếm số lần mỗi IP xuất hiện (phổ biến cho logs):
awk '{print $1}' access.log | sort | uniq -c | sort -nr

# In chỉ các dòng trùng:
sort file.txt | uniq -d

Lưu ý: uniq không tự sắp xếp; cần sort trước nếu muốn đếm tất cả occurrences.
```
### tr — chuyển/loại/thu gọn ký tự

Mục đích: translate (dịch ký tự), delete, squeeze (nối nhiều char giống nhau).

- Tùy chọn
`-d` — delete characters.
`-s` — squeeze repeats into one (ví dụ nhiều space → 1 space).
`-c` — complement (phủ định tập ký tự).

- Cú pháp
```bash
tr 'set1' 'set2'
```


Ví dụ
```bash
# Chuyển lowercase → UPPER:
echo "hello world" | tr '[:lower:]' '[:upper:]'
## HELLO WORLD

# Biến space/tab thành newline (tách từ trên nhiều dòng):
echo "a b\tc" | tr -s '[:space:]' '\n'

# Xóa tất cả ký tự không phải số:
echo "a1b2c3" | tr -cd '[:digit:]'
# 123

#Thay nhiều space thành một space:
tr -s ' ' < file.txt
```

>Lưu ý: tr làm việc theo ký tự, không theo regex; rất nhanh và phù hợp cho thao tác ký tự đơn giản.

- Ví dụ kết hợp (Pipelines thực tế)
```bash
# Top 10 IP truy cập nhiều nhất
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10


# Đếm status code (cột 9) từ access.log
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr


# Lấy danh sách file .conf chứa Listen (đếm file)
grep -r --include="*.conf" -n "Listen" /etc | cut -d: -f1 | sort -u

# Tạo báo cáo tổng bytes theo endpoint (cột 7)
awk '{bytes[$7] += $10} END {for (u in bytes) print bytes[u], u}' /var/log/nginx/access.log | sort -nr

# Sửa cấu hình: thay old=1 → old=0 trong nhiều file
sed -i.bak 's/old=1/old=0/g' /etc/myapp/*.conf

# Trích xuất emails từ file và lọc trùng
grep -oE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}" file.txt | tr 'A-Z' 'a-z' | sort -u
```
## Mẹo, pitfalls & best practices
- Luôn hiểu định dạng đầu vào: chọn awk -F hay cut -d tương ứng.
- Tránh edit trực tiếp với sed -i trên file quan trọng — tạo backup .bak.
- Dùng -F/-t/-d để chỉ rõ delimiter thay vì dựa vào whitespace mặc định.
- Sử dụng grep -F cho chuỗi cố định để tăng tốc (không dùng regex).
- Đối với UTF-8, tránh cut -b (byte) — dùng awk hoặc công cụ hỗ trợ multibyte.
- Giảm I/O: khi có thể, dùng một công cụ (thường awk) thay vì chuỗi nhiều lệnh để giảm read/write.
- Kiểm tra với sample nhỏ trước khi chạy trên toàn dataset.
- Sử dụng LC_ALL=C để tăng tốc sort/grep trên tập dữ liệu ASCII lớn (thay đổi locale có thể ảnh hưởng thứ tự và hiệu năng).
- Escape regex/char đặc biệt khi dùng trong shell (dùng single quotes '...' để hạn chế expansion).