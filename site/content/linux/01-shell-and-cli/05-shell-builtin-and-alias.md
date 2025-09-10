---
title: "05 - Builtins, Alias và Hàm trong Shell"
date: 2025-09-09T20:00:00+07:00
draft: false
author: ""
description: "Giải thích về **shell builtins**, **alias**, **shell functions** và **command completion** — cú pháp, ví dụ và best practices."
categories: ["Linux Cơ bản"]
tags: ["builtins", "alias", "functions", "completion"]
---

# Giới thiệu
**Builtins**, **alias**, **shell functions** và **completion** là những công cụ cốt lõi để tùy biến và tối ưu hoá workflow trên shell. Chúng giúp tiết kiệm thời gian, tránh lặp lại và cung cấp trải nghiệm tương tác mạnh mẽ.

# Shell builtins (lệnh nội tại)
**Builtins** là các lệnh được tích hợp trực tiếp trong shell (ví dụ: `bash`, `zsh`) — **không cần fork external process**, nên thường nhanh hơn và xử lý các trạng thái shell (ví dụ thay đổi biến môi trường, đổi thư mục).

**Ví dụ builtins phổ biến**
- `cd`, `echo`, `read`, `export`, `unset`, `type`, `builtin`, `command`, `hash`, `history`, `return`, `break`, `continue`, `exec`, `source` (.), `enable`.

**Phân biệt với external commands**
- Dùng `type -a command` để biết `command` là builtin hay external:
```bash
type -a echo
# echo is a shell builtin
# echo is /bin/echo
```
- Quản lý builtins (bash)
+ `enable -n <name>` vô hiệu hoá builtin.
+ `enable <name>` bật lại.

## Alias — rút gọn lệnh
Alias là cách đơn giản để thay thế một chuỗi lệnh bằng tên ngắn hơn.

- Tạo alias
```bash
alias ll='ls -alF'
alias gs='git status'
```

- Loại alias
+ Tạm thời: chỉ tồn tại trong session hiện tại.
+ Bền vững: thêm vào ~/.bashrc / ~/.zshrc.

- Xoá alias
```bash
unalias ll
```

- Lưu ý
+ Alias chỉ thay thế token đầu tiên của lệnh, không dùng cho tham số giữa chuỗi phức tạp — dùng function nếu cần logic phức tạp.
+ Dùng `\command` hoặc `command` để bỏ qua alias.

## Shell functions — khi cần logic hơn

Shell functions là đoạn script nhỏ chạy trong cùng tiến trình shell, cho phép tham số hoá, điều kiện, vòng lặp, và tái sử dụng logic phức tạp.

### Cú pháp cơ bản
```bash
my_backup() {
  local src="$1"
  local dst="$2"
  if [ -z "$src" ] || [ -z "$dst" ]; then
    echo "Usage: my_backup src dst"
    return 1
  fi
  cp -a "$src" "$dst"
  echo "Backup done: $src -> $dst"
}
```

### Gọi hàm

```bash 
my_backup /home/user/project /backup/project
```

- Điểm mạnh
+ Có thể sử dụng $@, $#, "$1", "$2" để xử lý tham số.
+ Dùng local var để tránh rò biến toàn cục (trong bash).
+ Chạy nhanh vì không fork process mới (so với script ngoại vi).

- Tổ chức

Đặt các hàm lâu dài vào `~/.bashrc` hoặc `~/.bash_functions` và `source` từ `~/.bashrc` để giữ sạch file cấu hình.

## Command completion (tự động hoàn thiện lệnh)

Completion giúp gợi ý và hoàn thành tên lệnh, tên file, option hoặc các tham số tùy biến khi nhấn Tab.

Hai dạng
- Default filename completion (cơ bản, shell có sẵn).
- Programmable completion (nâng cao) — cho phép khai báo hàm hoàn thiện cho lệnh cụ thể.

### Công cụ/commands liên quan

`complete` — đăng ký hàm completion cho một lệnh.

`compgen` — sinh các candidate (dùng trong hàm completion).

`/etc/bash_completion` và file trong `/etc/bash_completion.d/` — chứa completion scripts cho nhiều tool phổ biến (git, kubectl, docker...).
```bash
# Ví dụ đơn giản: tạo completion cho mycmd

_mycmd_complete() {
  local cur="${COMP_WORDS[COMP_CWORD]}"
  local opts="start stop status restart"
  COMPREPLY=( $(compgen -W "$opts" -- "$cur") )
}
complete -F _mycmd_complete mycmd

# Khi gõ mycmd st<TAB> sẽ gợi ý start và status.
```

```bash
Ví dụ dùng compgen để liệt kê lệnh

compgen -c | grep '^git'

```
`compgen -c` list tất cả commands có thể gọi.

### Cài đặt completion cho git (thông dụng)
```bash
# Cài git-completion.bash hoặc cài gói bash-completion của distro, rồi source file trong ~/.bashrc:

if [ -f /etc/bash_completion ]; then
  . /etc/bash_completion
fi
```
## Best practices
- Giữ alias ngắn, functions cho logic phức tạp.
- Đặt cấu hình bền vững vào ~/.bashrc hoặc file riêng được source (ví dụ ~/.bash_functions) để dễ quản lý.
- Sử dụng local trong functions để tránh rò biến .
- Tránh tên hàm trùng với system commands; nếu trùng, dùng command hoặc builtin để gọi binary/builtin thật.
- Kiểm tra tồn tại trước khi định nghĩa (ví dụ command -v name >/dev/null 2>&1 || alias name='...') nếu muốn an toàn giữa các hệ.
- Sử dụng programmable completion cho các lệnh hay dùng để tiết kiệm phím và giảm lỗi gõ.
- Document alias/functions ngắn gọn trên đầu file cấu hình để dễ bảo trì.