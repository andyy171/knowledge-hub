---
title: "04 - Môi trường và hồ sơ (profile) trong Linux"
date: 2025-09-09T20:00:00+07:00
draft: false
author: ""
description: "Giải thích /etc/profile, ~/.bashrc, PATH, PS1 và biến môi trường — cách hoạt động, khác biệt và ví dụ thực tế"
categories: ["Linux"]
tags: ["PATH", "PS1", "/etc/profile", "~/.bashrc", "environment variables"]
---

# Giới thiệu
Tập trung vào **biến môi trường (environment variables)** và các **file cấu hình shell** giúp bạn điều chỉnh hành vi shell, đường dẫn tìm kiếm chương trình, và giao diện prompt. Các khái niệm quan trọng: **login vs non-login shells**, **interactive vs non-interactive**, **system-wide vs user-level**.

---

## Các file cấu hình chính và thứ tự nạp
- **/etc/profile** — file hệ thống cho **login shells** (ở mức toàn hệ thống).  
- **~/.bash_profile**, **~/.bash_login**, **~/.profile** — file cấu hình **user** cho **login shells** (thứ tự ưu tiên như viết).  
- **~/.bashrc** — file cho **interactive non-login shells** (thường được các terminal emulator dùng).  
- **/etc/bash.bashrc** (tùy distro) — tương tự `/etc/profile` nhưng cho các bashrc (toàn hệ thống).  
- **/etc/environment** — file đơn giản để khai báo biến môi trường hệ thống (không phải script shell, chỉ `KEY=value`).

**Quy tắc thực tế phổ biến:**  
- Login shell đọc `/etc/profile` → `~/.bash_profile` (hoặc `~/.profile`).  
- Interactive non-login shell đọc `/etc/bash.bashrc` → `~/.bashrc`.  
- Thường người dùng **source** (`. ~/.bashrc`) từ `~/.bash_profile` để thống nhất cấu hình.

---

## Ví dụ: làm sao để source `~/.bashrc` trong `~/.bash_profile`
```bash
# ~/.bash_profile
if [ -f "$HOME/.bashrc" ]; then
  . "$HOME/.bashrc"
fi
```

## Biến môi trường (env vars) — khái niệm & lệnh cơ bản
- Biến môi trường là cặp KEY=VALUE có thể ảnh hưởng hành vi chương trình (ví dụ PATH, LANG, EDITOR).
- Lệnh xem:
+ env hoặc printenv — liệt kê biến môi trường.
+ echo "$VAR" — in giá trị biến.
+ export VAR=value — khai báo và export biến cho các tiến trình con.
+ unset VAR — xóa biến.
+ declare -x — liệt kê biến đã export (bash).

- Tạm thời vs bền vững
+ VAR=foo chỉ tồn tại cho phiên hiện tại (hoặc lệnh được chạy).
+ export VAR=foo tồn tại cho session hiện tại và tiến trình con.
+ Để persist qua phiên đăng nhập: thêm export VAR=foo vào ~/.bashrc hoặc ~/.profile tùy mục đích.

## PATH — cách hoạt động & ví dụ an toàn

PATH là danh sách các thư mục, phân tách bằng :, mà shell dùng để tìm lệnh khi bạn gõ ls, python,...

Ví dụ hiển thị:
```bash
echo $PATH
# /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
## Thêm vào PATH an toàn (thêm thư mục user nằm trước hoặc sau):

# thêm thư mục ~/bin vào đầu PATH (ưu tiên file trong ~/bin)
export PATH="$HOME/bin:$PATH"

# hoặc thêm vào cuối PATH (ít ưu tiên hơn)
export PATH="$PATH:$HOME/.local/bin"

## Lưu ý bảo mật: đừng thêm . (current directory) vào đầu PATH — có thể dẫn tới chạy nhầm lệnh độc hại. Nếu cần, đặt . ở cuối và hiểu rủi ro.
```

## PS1 — tuỳ biến prompt

`PS1` là biến điều khiển prompt chính trong bash (hiển thị khi interactive).

Các escape sequences phổ biến:

`\u` — user name

`\h `— host short name

`\w` — current working directory (full)

`\W` — tên thư mục hiện tại

`\t` — giờ (HH:MM:SS)

`\$` — # nếu root, $ nếu non-root

```bash
# Ví dụ PS1 cơ bản:

export PS1='\u@\h:\w\$ '
# ví dụ: oj@laptop:~/projects$


# Ví dụ PS1 nâng cao (màu sắc, chỉ dùng nếu terminal hỗ trợ):

# Tránh hardcode màu nếu không hiểu ANSI escapes; ví dụ minh họa
export PS1="\[\e[32m\]\u@\h\[\e[0m\]:\[\e[34m\]\w\[\e[0m\]\$ "


# Tip: bọc mã màu trong \[ và \] để bash tính đúng chiều dài prompt.
```
## Mẫu cấu hình ~/.bashrc hữu dụng
```bash
# ~/.bashrc - ví dụ
# Export some environment variables
export EDITOR=vim
export LANG=en_US.UTF-8

# Modify PATH safely
export PATH="$HOME/.local/bin:$HOME/bin:$PATH"

# Aliases
alias ll='ls -alF'
alias gs='git status'

# PS1 prompt
export PS1='\u@\h:\w\$ '

# Source bash_completion nếu có
if [ -f /etc/bash_completion ]; then
  . /etc/bash_completion
fi
```
## Thực hành & debug
- Áp dụng ngay thay đổi: source ~/.bashrc hoặc . ~/.bashrc.
- Kiểm tra biến: echo "$PATH" / echo "$PS1" / env | grep EDITOR.
- Xác định file nào được nạp: thêm echo "sourcing ~/.bashrc" vào file để debug khi mở shell.
- Khác biệt khi SSH: khi SSH vào máy thường là login shell, nên sửa ~/.profile/~/.bash_profile hoặc đảm bảo nó source ~/.bashrc.

## Best practices 
- Đặt cấu hình môi trường toàn cục vào /etc/profile hoặc /etc/environment (cẩn trọng, cần quyền root).
- Đặt cấu hình user (alias, functions, prompt, PATH user) vào ~/.bashrc. Source ~/.bashrc từ ~/.bash_profile để thống nhất.
- Export biến chỉ khi cần cho tiến trình con.
- Không thêm . vào đầu PATH. Dùng đường dẫn tuyệt đối, tránh lẫn lộn.
- Giữ file cấu hình gọn nhẹ và tách phần phức tạp vào các file riêng được source khi cần.