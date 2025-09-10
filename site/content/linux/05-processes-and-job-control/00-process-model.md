---
title: "Quản lý tiến trình trong Linux"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Hướng dẫn cài đặt, cập nhật và gỡ bỏ gói phần mềm trong Linux (Ubuntu)."
categories: ["Linux", "Packages"]
tags: ["apt", "package-management", "software"]
---
# Các file thuộc chủ đề 
(Monitoring processes and job control)[01-monitoring-processes.md]

# Processes Management
- Linux là hệ điều hành đa nhiệm, cho phép nhiều tiến trình chạy đồng thời. **Kernel (nhân hệ điều hành)** quản lý việc phân phối tài nguyên CPU, bộ nhớ, và I/O giữa các tiến trình. Khi một tiến trình "treo" hoặc chiếm dụng tài nguyên quá mức, bạn cần kiểm tra và can thiệp để duy trì hiệu suất hệ thống.
## Khái niệm quan trọng 
### Tiến Trình Cha và Tiến Trình Con 
**PID 1:** Tiến trình đầu tiên khi hệ thống khởi động là init hoặc systemd. 
**Cây tiến trình:** Mỗi tiến trình có một tiến trình cha (parent process), và có thể sinh ra các tiến trình con (child processes). Sử dụng pstree để xem cây tiến trình:
### Daemon Định nghĩa: Tiến trình chạy nền, không gắn với terminal, thực hiện các dịch vụ hệ thống (ví dụ: sshd, httpd). Ví dụ:
bash
systemctl status sshd  # Xem trạng thái dịch vụ SSH daemon
### Tiến trình Zombie (Z) - Trường hợp :Tiến trình con kết thúc nhưng tiến trình cha không nhận được thông báo hoặc không xử lý tín hiện **SIGCHLD** - Giải pháp: * Tìm và kết thúc tiến trình cha (PID của zombie sẽ được giải phóng tự động). * Nếu tiến trình cha là init (PID 1), hệ thống sẽ tự dọn dẹp. ### Tiến Trình Uninterruptible Sleep (D) - LÀ Tiến trình đang chờ I/O (ví dụ: đọc/ghi đĩa) và không thể bị dừng bằng kill. - Xử lý: Chờ hệ thống hoàn thành tác vụ I/O hoặc khởi động lại dịch vụ liên quan. ## Các công cụ quản lý tiến trình ### Lệnh ps (Process Status) - Liệt kê các tiến trình đang chạy. **Cú pháp :**
bash
ps [options]
Các tùy chọn phổ biến: - **ps:** Chỉ hiển thị tiến trình thuộc terminal hiện tại. - **ps x:** Hiển thị tất cả tiến trình của người dùng, bao gồm cả tiến trình không gắn với terminal (TTY hiển thị là ?). - **ps aux:** Liệt kê tất cả tiến trình trên hệ thống (của mọi người dùng), bao gồm thông tin chi tiết như CPU, bộ nhớ. **Các trường thông tin quan trọng:** **PID:** ID của tiến trình (Process ID). **TTY:** Terminal điều khiển tiến trình. **TIME:** Thời gian CPU mà tiến trình đã sử dụng. **CMD:** Lệnh hoặc tên chương trình đang chạy. Ví dụ:
bash
ps aux | less # Xem tất cả tiến trình và cuộn trang dễ dàng
#### ps aux Khi sử dụng lệnh ps aux, sẽ bao gồm các cột thông tin sau: - USER: Người dùng sở hữu tiến trình. - PID: ID của tiến trình. - %CPU: Phần trăm CPU tiến trình đang sử dụng. - %MEM: Phần trăm RAM tiến trình đang sử dụng. - VSZ (Virtual Memory Size): Tổng bộ nhớ ảo (bao gồm RAM và swap) mà tiến trình chiếm dụng (đơn vị KB). - RSS (Resident Set Size): Bộ nhớ thực (RAM) mà tiến trình đang sử dụng (đơn vị KB). - TTY: Terminal điều khiển tiến trình (? nếu là tiến trình nền hoặc daemon). - STAT: Trạng thái tiến trình . Cột STAT hiển thị trạng thái và đặc tính của tiến trình thông qua các ký tự: * R (Running): Tiến trình đang chạy hoặc sẵn sàng chạy. * S (Sleeping): Tiến trình đang chờ sự kiện (ví dụ: nhập liệu từ người dùng hoặc kết nối mạng). * D (Uninterruptible Sleep): Tiến trình đang chờ I/O (ví dụ: đọc/ghi đĩa) và không thể bị gián đoạn. * T (Stopped): Tiến trình bị dừng (tạm dừng bằng Ctrl+Z hoặc bởi trình gỡ lỗi). * Z (Zombie): Tiến trình đã kết thúc nhưng chưa được dọn dẹp bởi tiến trình cha. * Các ký hiệu bổ sung: - <: Tiến trình có độ ưu tiên cao (high priority, "less nice"). - N: Tiến trình có độ ưu tiên thấp (low priority, "nice"). - +: Tiến trình thuộc nhóm job hiện tại của shell. * START: Thời gian/ngày tiến trình được khởi động. * TIME: Tổng thời gian CPU tiến trình đã sử dụng. * COMMAND: Lệnh hoặc tên chương trình đang chạy. ### Lệnh top - Hiển thị thông tin tiến trình và tài nguyên hệ thống (CPU, RAM) theo thời gian thực. **Cú pháp:**
bash
top
**Các thao tác trong top:** **k:** Gửi tín hiệu kết thúc tiến trình (nhập PID và tín hiệu, ví dụ SIGTERM hoặc SIGKILL). **q:** Thoát khỏi top. **Shift + M:** Sắp xếp theo mức sử dụng bộ nhớ. **Shift + P:** Sắp xếp theo mức sử dụng CPU. **Thông tin quan trọng:** **PID:** ID tiến trình. **USER:** Người dùng sở hữu. **PR (Priority):** Độ ưu tiên của tiến trình. **NI (Nice Value):** Giá trị "nice" (từ -20 đến 19), điều chỉnh độ ưu tiên. **VIRT (Virtual Memory):** Tổng bộ nhớ ảo. **RES (Resident Memory):** Bộ nhớ thực (RAM) đang sử dụng. **SHR (Shared Memory):** Bộ nhớ chia sẻ với các tiến trình khác. **S (Status):** Trạng thái tiến trình **%CPU:** Phần trăm CPU tiến trình sử dụng. **%MEM:** Phần trăm bộ nhớ vật lý tiến trình sử dụng. **COMMAND:** Tên lệnh hoặc tiến trình. - Lệnh top cung cấp giao diện thời gian thực chia làm 2 phần chính: 1. Phần Tóm Tắt Hệ Thống (System Summary) - Dòng 1 - Thời Gian và Uptime: * Thời gian hiện tại: Giờ hệ thống (ví dụ: 12:34:56). * Uptime: Thời gian hệ thống đã hoạt động liên tục (ví dụ: up 2 days, 3:45). * Số người dùng: Số lượng người dùng đang đăng nhập (ví dụ: 2 users). - Dòng 2 - Load Average: * Load Average (1, 5, 15 phút): Chỉ số tải trung bình, thể hiện số tiến trình đang chờ CPU. * Giá trị < 1.0: Hệ thống nhàn rỗi. * Giá trị > 1.0: Hệ thống đang quá tải. * Ví dụ: load average: 0.75, 1.20, 1.50. - Dòng 3 - Trạng Thái CPU: * us (user): % CPU dành cho tiến trình người dùng. * sy (system): % CPU dành cho kernel. * ni (nice): % CPU dành cho tiến trình có độ ưu tiên thấp. * id (idle): % CPU nhàn rỗi. * wa (I/O wait): % CPU chờ I/O (đĩa, mạng). * hi (hardware interrupts): % CPU xử lý ngắt phần cứng. * si (software interrupts): % CPU xử lý ngắt phần mềm. * st (steal time): % CPU bị "đánh cắp" bởi máy ảo (trong môi trường ảo hóa). - Dòng 4 - Bộ Nhớ Vật Lý (Mem): * Tổng (total): Tổng RAM (ví dụ: 7.7 GiB). * Đã dùng (used): RAM đang được sử dụng. * Trống (free): RAM trống. * Buffer/Cache: RAM dùng cho bộ đệm và cache. - Dòng 5 - Bộ Nhớ Swap: * Tổng (total): Tổng swap. * Đã dùng (used): Swap đang dùng. * Trống (free): Swap trống. 2. Bảng Danh Sách Tiến Trình Danh sách tiến trình được sắp xếp theo %CPU mặc định, với các cột chính: **PID:** ID tiến trình. **USER:** Người dùng sở hữu. **PR (Priority): **Độ ưu tiên kernel (giá trị thấp = ưu tiên cao). **NI (Nice Value):** Độ ưu tiên người dùng (từ -20 đến 19). **VIRT:** Bộ nhớ ảo (bao gồm RAM, swap, và bộ nhớ chia sẻ). **RES:** Bộ nhớ thực (RAM) tiến trình đang dùng. **SHR:** Bộ nhớ chia sẻ với tiến trình khác. **S (Status):** Trạng thái tiến trình (R, S, D, Z, T). **%CPU:** % CPU tiêu thụ. **%MEM:** % RAM tiêu thụ. **TIME+:** Tổng thời gian CPU đã sử dụng. **COMMAND:** Tên lệnh hoặc chương trình. #### Tương tác với top **Shift + P:**Sắp xếp theo %CPU. **Shift + M:** Sắp xếp theo %RAM. **Shift + T:** Sắp xếp theo thời gian chạy. **k:** Gửi tín hiệu kết thúc tiến trình (nhập PID và tín hiệu, ví dụ: 9 cho SIGKILL) ## Quản Lý Jobs (Công Việc) và Điều Khiển tiến trình nền/Tiền ( Background/Foreground) Lệnh jobs: Liệt kê các công việc (jobs) đang chạy trong shell hiện tại.
bash
jobs
Kết quả hiển thị ID job (ví dụ: [1], [2]) và trạng thái (Running, Stopped). Lệnh bg (Background): Đưa job tạm dừng hoặc đang chạy foreground xuống chạy nền.
bash
bg %1  # Đưa job có ID 1 chạy nền
Lệnh fg (Foreground): Đưa job từ nền lên foreground để tương tác.
bash
fg %1  # Đưa job có ID 1 lên foreground
### Chạy tiến trình ở Background và Foreground **Chạy tiến trình ở foreground (mặc định):** Khi bạn chạy một lệnh (ví dụ: xlogo), tiến trình sẽ chiếm dụng shell cho đến khi kết thúc. Bạn không thể sử dụng shell cho đến khi tiến trình hoàn tất. Ví dụ:
bash
xlogo  # Chạy ở foreground, shell bị khóa
**Chạy tiến trình ở background:** Thêm ký tự & vào cuối lệnh để chạy tiến trình ở background. Shell sẽ trả về prompt ngay lập tức. Ví dụ:
bash
xlogo &  # Chạy ở background, shell vẫn sử dụng được
Kết quả:
bash
[1] 12345  # [Job_ID] PID
### Quản Lý Jobs với jobs, fg, và bg - Liệt kê jobs: Lệnh jobs hiển thị danh sách các job đang chạy hoặc tạm dừng từ shell hiện tại. Ví dụ:
bash
jobs
Kết quả:
bash
[1]  Running                 xlogo &
[2]- Stopped                 sleep 1000
[3]+ Running                 nano file.txt
- Đưa job từ background lên foreground: Sử dụng fg %<Job_ID>. Nếu không chỉ định Job_ID, job mới nhất sẽ được chọn. Ví dụ:
bash
fg %1  # Đưa job 1 lên foreground
- Đưa job từ foreground xuống background: 1. Tạm dừng job đang chạy ở foreground bằng Ctrl + Z. 2. Sử dụng bg %<Job_ID> để tiếp tục chạy job ở background. Ví dụ:
bash
sleep 1000  # Chạy ở foreground
# Nhấn Ctrl + Z để tạm dừng
bg %1  # Tiếp tục chạy job 1 ở background
### Gửi Tín Hiệu Điều Khiển Tiến Trình **Kết thúc tiến trình ở foreground:** Nhấn Ctrl + C để gửi tín hiệu SIGINT (interrupt), yêu cầu tiến trình kết thúc "nhẹ nhàng". Ví dụ:
bash
xlogo  # Chạy ở foreground
# Nhấn Ctrl + C để kết thúc
**Kết thúc tiến trình ở background:** Sử dụng kill với PID hoặc Job_ID. Ví dụ:
bash
kill 12345   # Kết thúc tiến trình PID 12345
kill %1      # Kết thúc job 1 bằng SIGTERM - kết thúc mặc định
kill -9 %1   # Buộc kết thúc job 1 bằng SIGKILL - buộc kết thúc
## Lệnh kill và killall kill: Gửi tín hiệu để kết thúc hoặc điều khiển tiến trình. ### Các tín hiệu (Signals) **SIGTERM (15):** Tín hiệu mặc định, yêu cầu tiến trình kết thúc "nhẹ nhàng". **SIGKILL (9):** Buộc tiến trình dừng ngay lập tức (không thể bỏ qua).
bash
kill <PID>          # Gửi SIGTERM
kill -9 <PID>       # Gửi SIGKILL
Ngoài các tín hiệu phổ biến như SIGTERM, SIGKILL, còn có các tín hiệu khác được sử dụng trong các **tình huống đặc biệt**: **SIGQUIT (3):** - Tương tự SIGINT, nhưng khi nhận tín hiệu này, tiến trình thường kết thúc và tạo core dump (bản ghi lỗi để debug). - Kích hoạt bằng Ctrl-\ hoặc kill -3 <PID>. **SIGUSR1 (10) và SIGUSR2 (12):** - Không có hành vi mặc định, thường được dùng để giao tiếp tùy chỉnh giữa các tiến trình. - Ví dụ: Ứng dụng có thể dùng SIGUSR1 để tái tạo file log mà không cần khởi động lại.
bash
kill -SIGUSR1 <PID>  # Yêu cầu tiến trình xử lý tín hiệu tùy chỉnh
**SIGWINCH (28):** Thông báo thay đổi kích thước cửa sổ terminal. Các chương trình như top hoặc less sử dụng tín hiệu này để vẽ lại giao diện. - Dừng tất cả các tiến trình killall: Dừng tất cả tiến trình có tên xác định.
bash
killall firefox     # Dừng tất cả tiến trình Firefox
- Liệt kê tất cả các tín hiêu j Sử dụng lệnh kill -l để xem danh sách đầy đủ các tín hiệu:
bash
kill -l
Kết quả:
```bash
`1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
...
```
- Xử Lý Tín Hiệu Trong Script/Chương Trình * Các tiến trình có thể bẫy (trap) tín hiệu để thực hiện hành động tùy chỉnh trước khi kết thúc. 
* Ví dụ trong bash script:
bash
#!/bin/bash
# Bẫy SIGINT (Ctrl-C) và in thông báo
trap "echo 'Tiến trình đã bị dừng bởi Ctrl-C'; exit" SIGINT
while true; do
  echo "Đang chạy..."
  sleep 1
done
Khi nhấn Ctrl-C, script sẽ in thông báo và thoát sạch. - Gửi Tín Hiệu Đến Nhóm Tiến Trình * Sử dụng PID âm để gửi tín hiệu đến toàn bộ nhóm tiến trình (process group). * Ví dụ: Dừng tất cả tiến trình trong nhóm có PGID là 1234:
bash
kill -SIGSTOP -1234  # Gửi SIGSTOP đến cả nhóm
- Sử dụng kết hợp với pgrep/pkill
bash
pkill -SIGTERM firefox    # Gửi SIGTERM đến tất cả tiến trình Firefox
pgrep python | xargs kill  # Dừng tất cả tiến trình Python
Kiểm tra tín hiệu có hiệu lực không
bash
kill -0 <PID>  # Kiểm tra xem tiến trình có tồn tại không (không gửi tín hiệu thực sự)
- Phân quyền bảo mật Quyền gửi tín hiệu: 1. Người dùng thông thường chỉ có thể gửi tín hiệu đến tiến trình của chính họ. 2. Root có thể gửi tín hiệu đến mọi tiến trình. 3. **Ngoại lệ:** Một số tiến trình hệ thống (vd: systemd) có cơ chế bảo vệ và không thể bị dừng bởi SIGKILL nếu không có quyền đặc biệt. ## Các ví dụ ### Kết Thúc Tiến Trình Chiếm Dụng CPU 1. Chạy top để xác định tiến trình có %CPU cao:
bash
top
2. Ghi lại PID của tiến trình (ví dụ: 1234). 3. Gửi tín hiệu SIGKILL:
bash
kill -9 1234
### Chuyển Tiến Trình Sang Nền 1. Khởi chạy một tiến trình (ví dụ: sleep 1000). 2. Nhấn Ctrl + Z để tạm dừng tiến trình. 3. Đưa tiến trình xuống chạy nền:
bash
bg %1
### Xử Lý Tiến Trình Zombie 1. Tìm tiến trình zombie bằng ps aux:
bash
ps aux | grep 'Z'
2. Xác định PID của tiến trình zombie (ví dụ: 1234). 3. Tìm PID của tiến trình cha (PPID) bằng ps -o ppid= -p 1234. 4. Kết thúc tiến trình cha để giải phóng zombie:
bash
kill <PPID>
### Điều Chỉnh Độ Ưu Tiên với nice và renice - Đặt độ ưu tiên khi khởi chạy:
bash
nice -n 10 command  # Chạy lệnh với độ nice +10 (ưu tiên thấp)
- Thay đổi độ ưu tiên của tiến trình đang chạy:
bash
renice -n 5 -p 1234  # Đặt độ nice của PID 1234 thành 5
### Điều khiển tiến trình với X Logo **Chạy X Logo ở background:**
bash
xlogo &
Kết quả: [1] 12345. **Kiểm tra jobs:**
bash
jobs
Kết quả: [1] Running xlogo &. **Đưa X Logo lên foreground:**
bash
fg %1
Tiến trình X Logo sẽ hiển thị cửa sổ và chiếm dụng shell. **Kết thúc X Logo bằng Ctrl + C:** Nhấn Ctrl + C để gửi SIGINT, cửa sổ X Logo đóng lại, shell trả về prompt.


### Liệt kê các quy trình
```bash
ps aux          # Hiển thị tất cả các quy trình đang chạy
ps -ef          # Định dạng khác để liệt kê quy trình
ps -u username  # Quy trình của một người dùng cụ thể
```
### Theo dõi quy trình
```bash
top             # Công cụ tương tác giám sát quy trình
htop            # Phiên bản nâng cao có màu và hỗ trợ chuột
```

### Kiểm soát quy trình
```bash
kill PID        # Gửi SIGTERM để kết thúc quy trình
kill -9 PID     # Buộc dừng quy trình (SIGKILL)
killall name    # Kết thúc tất cả quy trình theo tên
```

### Quản lý dịch vụ
```bash
systemctl start service    # Khởi động dịch vụ
systemctl stop service     # Dừng dịch vụ
systemctl restart service  # Khởi động lại dịch vụ
```

### Quản lý ưu tiên quy trình
```bash
nice -n 10 command         # Chạy lệnh với độ ưu tiên thấp hơn
renice -n 10 -p PID        # Điều chỉnh ưu tiên quy trình đang chạy
```
