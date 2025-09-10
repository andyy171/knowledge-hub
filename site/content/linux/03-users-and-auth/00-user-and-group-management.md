---
title: "Quản lý Người dùng và nhóm trong Linux"
date: 2025-09-09T22:01:00+07:00
draft: false
author: "Your Name"
description: "Giới thiệu cách kiểm tra và chuyển đổi người dùng trong Linux."
categories: ["Linux", "Users"]
tags: ["user", "authentication", "sudo"]
---

## Giới thiệu
Quản lý người dùng trong Linux liên quan đến việc kiểm tra danh tính người dùng hiện tại và chuyển đổi quyền truy cập (root/user).

---

## Các lệnh quản lý người dùng
- **`whoami`**: Hiển thị người dùng hiện tại.
  - Ví dụ: `whoami` trả về `user` hoặc `root`.
- **`sudo su`**: Chuyển sang người dùng root (yêu cầu mật khẩu).
  - Ví dụ: `sudo su` đăng nhập với quyền root.
- **`exit`**: Thoát khỏi phiên root hoặc SSH, quay lại người dùng trước đó.

---

## Mẹo
- Sử dụng `sudo` để chạy lệnh với quyền root, tránh lỗi "Permission denied".
- Kiểm tra người dùng trước khi thực hiện tác vụ nhạy cảm.


# Các đường dẫn thư mục phổ biến 
- /etc/passwd: username:x:UID:GID:desc:home:shell — mật khẩu di chuyển vào /etc/shadow.
- /etc/shadow: username:hashed:lastchg:min:max:warn:inactive:expire — chứa hash + policy.
- /etc/group: group:x:GID:user1,user2
- /etc/gshadow: bảo mật nhóm (mật khẩu nhóm, admins).
- /etc/sudoers: cấu hình ai được sudo (chỉnh bằng visudo).

## Các lệnh hay dùng
```bash
id username
sudo visudo
passwd username         # đổi mật khẩu hoặc khóa/unlock
sudo passwd -l user
```

- Lưu ý
+ Sửa trực tiếp /etc/passwd rủi ro — dùng useradd/usermod/userdel khi có thể.
+ /var/log/auth.log chứa audit xác thực (xem khi điều tra).


### Lệnh id - Lệnh id hiển thị thông tin nhận dạng của người dùng, bao gồm UID (User ID), GID (Group ID) và các nhóm khác mà người dùng tham gia.
bash
id
### Lệnh chmod Lệnh chmod dùng để thay đổi quyền truy cập của tập tin hoặc thư mục. Quyền truy cập thường được chia thành 3 nhóm: r (read): Cho phép đọc tập tin. w (write): Cho phép ghi/chỉnh sửa tập tin. x (execute): Cho phép thực thi tập tin hoặc truy cập thư mục. Ví dụ :
bash
chmod 755 ten_tap_tin_hoac_thu_muc
// Cho phép owner đọc ghi và thực thi , group và others chỉ đọc và thực thi
Mỗi chữ số octal ( từ 0 -7 ) là tổ hợp của 3 quyền cơ bản : **4**: Quyền **đọc (read)** - Ký hiệu là r. **2**: Quyền **ghi (write**) - Ký hiệu là w. **1**: Quyền **thực thi (execute)** - Ký hiệu là x. Giá trị của mỗi chữ số được tính bằng cách cộng các quyền lại với nhau: 7 = 4 (read) + 2 (write) + 1 (execute) = rwx (đọc, ghi và thực thi). 5 = 4 (read) + 1 (execute) = r-x (đọc và thực thi, không có quyền ghi). 0 = Không có quyền nào. Trong câu lệnh trên 755 thì phân quyền được thực hiện như sau : **7 (owner): rwx** Owner có quyền đọc (r), ghi (w) và thực thi (x) tệp tin hoặc thư mục. **5 (group): r-x** Group có quyền đọc (r) và thực thi (x), nhưng không có quyền ghi (w). **5 (others): r-x** Others có quyền đọc (r) và thực thi (x), nhưng không có quyền ghi (w). ### Lệnh umask - umask (user file creation mask) là một giá trị dùng để xác định quyền truy cập mặc định của các tệp tin và thư mục mới được tạo. - Khi một tệp tin hoặc thư mục mới được tạo, hệ thống sẽ sử dụng giá trị umask để loại bỏ (mask) một số quyền nhất định từ quyền mặc định ban đầu. #### Quyền mặc định ban đầu Tệp tin: Khi một tệp tin mới được tạo, quyền mặc định ban đầu là 666 (rw-rw-rw-), tức là: - Owner: Đọc và ghi (rw-). - Group: Đọc và ghi (rw-). - Others: Đọc và ghi (rw-). Thư mục: Khi một thư mục mới được tạo, quyền mặc định ban đầu là 777 (rwxrwxrwx), tức là: - Owner: Đọc, ghi và thực thi (rwx). - Group: Đọc, ghi và thực thi (rwx). - Others: Đọc, ghi và thực thi (rwx). #### Cách unmask hoạt động -Giá trị umask là một số octal (hệ cơ số 8) gồm 3 chữ số, đại diện cho các quyền sẽ bị loại bỏ (mask) khỏi quyền mặc định ban đầu. **Tập tin:** Quyền mặc định tối đa là 666 (rw-rw-rw-). **Thư mục:** Quyền mặc định tối đa là 777 (rwxrwxrwx). Công thức tính quyền cuối cùng: Quyền tệp tin = Quyền mặc định ban đầu (666) - Giá trị umask. Quyền thư mục = Quyền mặc định ban đầu (777) - Giá trị umask. Ví dụ minh họa **Với umask 022:** - Tập tin: 666 - 022 = 644 → rw-r--r-- (chủ sở hữu đọc/ghi, nhóm và others chỉ đọc). - Thư mục: 777 - 022 = 755 → rwxr-xr-x (chủ sở hữu toàn quyền, nhóm và others đọc/thực thi). **Với umask 027:** - Tập tin: 666 - 027 = 640 → rw-r----- (chủ sở hữu đọc/ghi, nhóm chỉ đọc, others không có quyền). - Thư mục: 777 - 027 = 750 → rwxr-x--- (chủ sở hữu toàn quyền, nhóm đọc/thực thi, others không có quyền).
bash
umask 022 file_name_or_folder_name
Giá trị umask 022 có nghĩa: 0: Không loại bỏ quyền nào của owner. 2: Loại bỏ quyền ghi (w) của group. 2: Loại bỏ quyền ghi (w) của others. **Áp dụng cho tệp tin:** Quyền mặc định ban đầu của tệp tin: 666 (rw-rw-rw-). Áp dụng umask 022: Owner: rw- (không bị ảnh hưởng bởi 0). Group: rw- - w- = r-- (loại bỏ quyền ghi). Others: rw- - w- = r-- (loại bỏ quyền ghi). Kết quả: Quyền cuối cùng của tệp tin là 644 (rw-r--r--). **Áp dụng cho thư mục:** Quyền mặc định ban đầu của thư mục: 777 (rwxrwxrwx). Áp dụng umask 022: Owner: rwx (không bị ảnh hưởng bởi 0). Group: rwx - w- = r-x (loại bỏ quyền ghi). Others: rwx - w- = r-x (loại bỏ quyền ghi). Kết quả: Quyền cuối cùng của thư mục là 755 (rwxr-xr-x). ### Lệnh sudo và su **sudo:** - Dùng để thực hiện một lệnh với quyền của người dùng khác, thường là quyền root. Nó cho phép người dùng thông thường chạy các lệnh đòi hỏi quyền cao mà không cần đăng nhập vào tài khoản root.
bash
sudo ten_lenh
**su:** - Dùng để chuyển sang người dùng khác hoặc chạy một shell với quyền của người dùng khác. Khi dùng su, bạn thường phải nhập mật khẩu của tài khoản đó.
bash
su - ten_nguoi_dung
### Lệnh chown và chgrp **chown:** Dùng để thay đổi chủ sở hữu của tập tin hoặc thư mục.
bash
chown ten_nguoi_dung ten_tap_tin
**chgrp:** Dùng để thay đổi nhóm sở hữu của tập tin hoặc thư mục.
bash
chgrp ten_nhom ten_tap_tin
### Lệnh passwd - Lệnh passwd dùng để thay đổi mật khẩu của người dùng hiện tại hoặc người dùng khác (nếu bạn có quyền root),quản lý các thông tin liên quan đến mật khẩu, chẳng hạn như đặt thời hạn hết hạn mật khẩu, khóa tài khoản, v.v. Cú pháp cơ bản
bash
passwd [tùy chọn] [tên người dùng]
Nếu không chỉ định tên người dùng, lệnh sẽ thay đổi mật khẩu của người dùng hiện tại. Nếu bạn là root, bạn có thể chỉ định tên người dùng để thay đổi mật khẩu của người dùng đó. #### Các cách sử dụng 1. Thay đổi mật khẩu của người dùng hiện tại
bash
passwd
Hệ thống sẽ yêu cầu bạn nhập mật khẩu hiện tại, sau đó nhập mật khẩu mới hai lần để xác nhận. 2. Thay đổi mật khẩu của người dùng khác (yêu cầu quyền root):
bash
sudo passwd tên_người_dùng
Hệ thống sẽ yêu cầu bạn nhập mật khẩu mới cho người dùng đó. 3. Khóa tài khoản người dùng:
bash
    sudo passwd -l tên_người_dùng
Tùy chọn -l (lock) sẽ khóa tài khoản của người dùng, ngăn họ đăng nhập. 4. Mở khóa tài khoản người dùng:
bash
    sudo passwd -u tên_người_dùng
Tùy chọn -u (unlock) sẽ mở khóa tài khoản của người dùng. 5. Đặt thời hạn hết hạn mật khẩu:
bash
sudo passwd -x số_ngày tên_người_dùng
Tùy chọn -x đặt số ngày tối đa mật khẩu có hiệu lực. Sau số ngày này, người dùng phải thay đổi mật khẩu. 6. Đặt số ngày cảnh báo trước khi mật khẩu hết hạn:
bash
sudo passwd -w số_ngày tên_người_dùng
Tùy chọn -w đặt số ngày cảnh báo trước khi mật khẩu hết hạn. 7. Đặt số ngày tối thiểu giữa các lần thay đổi mật khẩu:
bash
sudo passwd -n số_ngày tên_người_dùng
Tùy chọn -n đặt số ngày tối thiểu mà người dùng phải chờ trước khi có thể thay đổi mật khẩu lại. 8. Xóa mật khẩu của người dùng:
bash
sudo passwd -d tên_người_dùng
Tùy chọn -d (delete) xóa mật khẩu của người dùng, cho phép họ đăng nhập mà không cần mật khẩu (không an toàn). 9. Hiển thị trạng thái tài khoản:
bash
sudo passwd -S tên_người_dùng
Tùy chọn -S (status) hiển thị trạng thái mật khẩu của người dùng, bao gồm: - Tên người dùng. - Trạng thái mật khẩu (đã khóa, mật khẩu hợp lệ, v.v.). - Ngày thay đổi mật khẩu lần cuối. - Tuổi tối thiểu, tối đa và cảnh báo trước khi hết hạn.