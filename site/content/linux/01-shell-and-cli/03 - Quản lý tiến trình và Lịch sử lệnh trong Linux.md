---
title: "03 - Quản lý tiến trình và Lịch sử lệnh trong Linux"
date: 2025-09-09T20:00:00+07:00
draft: false
author: ""
description: "Hướng dẫn ngắn gọn về quản lý job (jobs, fg, bg, Ctrl-Z) và lịch sử lệnh (history, fc) trong shell"
categories: ["Linux"]
tags: ["jobs", "fg", "bg", "ctrl-z", "history", "fc"]
---

# Giới thiệu
**Quản lý tiến trình (job control)** và **lịch sử lệnh** là hai bộ công cụ thiết yếu khi làm việc với shell. Chúng giúp bạn:
- Điều khiển tiến trình nền/tiền cảnh mà không cần mở shell mới.
- Tạm dừng/khôi phục tiến trình dễ dàng.
- Tra cứu và tái sử dụng các lệnh trước đó để tăng hiệu suất thao tác.

---

# Khái niệm cơ bản về job control
- **Job**: tiến trình (hoặc nhóm tiến trình) được shell quản lý trực tiếp (thường bắt đầu từ shell tương tác).
- **Job ID**: một số thứ tự biểu thị job trong shell (ví dụ: `[1]`).
- **PID**: Process ID thực của tiến trình do hệ điều hành cấp.
- Jobs có thể ở trạng thái: **Running**, **Stopped**, **Done**.

---

# Các lệnh chính

## `&` — Chạy lệnh ở nền (background)
Thêm `&` ở cuối lệnh để chạy nó ở nền ngay lập tức.

```bash
sleep 300 &
# Shell trả về ví dụ: [1] 23456   => job id = 1, PID = 23456
```
jobs — Hiển thị các job hiện tại

Liệt kê job kèm trạng thái và job id.

jobs
# output ví dụ:
# [1]+  Running                 sleep 300 &
# [2]-  Stopped                 vim file.txt


Tùy chọn hữu ích:

`jobs -l` hiển thị thêm PID cho mỗi job.

`jobs -p `chỉ in PID.

`fg `— Đưa job về tiền cảnh (foreground)

Đưa một job chạy ở nền về tiền cảnh, chiếm terminal.

`fg %1 `      # đưa job id 1 về foreground
fg         # nếu chỉ có 1 job, fg mặc định job đó

bg — Tiếp tục job đã bị dừng nhưng cho chạy ở nền

Nếu job đang Stopped (bị tạm dừng), bg sẽ tiếp tục chạy nó ở nền.

bg %2

`Ctrl-Z` — Tạm dừng tiến trình hiện tại (SIGTSTP)

Trong terminal, nhấn Ctrl-Z sẽ gửi SIGTSTP cho tiến trình foreground, chuyển nó sang trạng thái Stopped và trả job id.

Ví dụ thao tác:

Chạy vim file.txt

Nhấn Ctrl-Z → shell trả về [1]+ Stopped vim file.txt

`bg %1` để tiếp tục ở nền hoặc fg %1 để quay lại foreground.

Kết hợp quản lý và tín hiệu

`kill %1` gửi SIGTERM tới job id 1 (shell sẽ chuyển job id thành PID rồi gửi signal).

`kill -9 23456` gửi SIGKILL tới PID cụ thể (dùng khi tiến trình không chịu dừng).

disown %1 xóa job khỏi bảng job của shell — dùng khi muốn đóng terminal mà job vẫn chạy (kết hợp nohup nếu cần).

Lưu ý thực tế

jobs và fg/bg chỉ hoạt động với các job khởi tạo từ shell hiện tại (interactive shell).

Để một tiến trình sống sót sau khi thoát shell: nohup command & hoặc command & disown.

Dùng jobs -l để biết PID khi cần kill PID.

Lịch sử lệnh (history) và fc
history — Hiển thị lịch sử lệnh của shell

history in danh sách các lệnh trước đó với số thứ tự.

history N in N dòng cuối.

Ví dụ:

history | tail -n 10
#   512  ls -la
#   513  git status
#   514  ./deploy.sh

Khởi chạy lại lệnh từ lịch sử

`!514` — chạy lại lệnh số 514.

`!!` — chạy lại lệnh ngay trước đó.

`!git` — chạy lại lệnh cuối cùng bắt đầu bằng git.

**Cẩn trọng:** ! có thể thực thi lệnh không mong muốn — kiểm tra history trước khi dùng trong script quan trọng.

`fc` — Fix Command / edit và re-execute

`fc` mở trình soạn thảo để sửa một lệnh trong lịch sử rồi thực thi nó (mặc định dùng $FCEDIT hoặc $EDITOR).

Thông dụng:

`fc -l` — liệt kê các lệnh trong khoảng (mặc định là vài lệnh gần nhất).

`fc` — mở lệnh cuối trong editor, sửa, rồi thực thi.

`fc -s old=new` — thực thi lại lệnh cuối, thay old bằng new (tương tự phép thay thế nhanh).

Ví dụ:

# Hiển thị 10 lệnh gần nhất
fc -l -10

# Mở lệnh cuối trong editor để chỉnh sửa
fc

# Thực thi lại lệnh cuối, thay 'foo' -> 'bar'
fc -s foo=bar

Tìm kiếm tương tác

Ctrl-R để dùng reverse-i-search — tìm nhanh trong lịch sử nhập lệnh tương tác (rất tiện khi thao tác thủ công).

Mẹo và best practices

Khi sửa command nhỏ: dùng !!:s/old/new/ hoặc fc -s old=new.

Trước khi dùng !n hoặc !!, kiểm tra history để tránh hậu quả không mong muốn.

Dùng jobs -l khi cần PID chính xác để kill.

Dùng disown hoặc nohup nếu muốn tiến trình chạy tiếp sau khi đóng terminal.

Sử dụng screen hoặc tmux cho các tác vụ dài thay vì chỉ dựa vào bg/disown.