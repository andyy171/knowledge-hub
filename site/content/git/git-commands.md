---
title: "Git Commands"
linkTitle: "git"
weight: 30
description: "Commonly used Git commands and workflows"
---

## First time setup

- Cấu hình user:
```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
- Cấu hình alias:
```bash
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.l 'log --all --decorate --oneline --graph'
git config --global alias.unstage 'reset HEAD --'
File config: $HOME/.gitconfig
```
- Tạo 1 commit 
```bash
git add . → stage toàn bộ thay đổi
git add file.txt → stage file cụ thể
git commit -m "message" → commit thay đổi đã stage
git commit -am "message" → stage và commit (không bao gồm file mới)
```
- Unstag - Loại bỏ các tệp khỏi vùng trung gian ( staging) của Git 

+ Đưa những thay đổi đã thêm vào commit đó quay trở lại thư mục làm việc (work dir) hoặc trạng thái trước đó 
```bash
git reset → bỏ stage toàn bộ

git reset HEAD -- file.txt → bỏ stage file cụ thể

Alias: git unstage file.txt
```
- Sửa đổi commit cuối cúng 
```bash
git commit --amend -m "new message" → sửa message commit cuối

git commit --amend --no-edit → thêm thay đổi nhưng giữ nguyên message

⚠️ Chỉ dùng khi commit chưa push lên remote.
```
- Branches
+ Tạo local branch:

```bash
git branch new-feature
git checkout new-feature
git checkout -b new-feature
```
+ Tạo remote branch:
```bash
git checkout -b new-feature
git push -u origin new-feature
```

+ Liệt kê branch:
```bash
git branch → local

git branch -r → remote

git branch -a → tất cả
```
+ Chuyển sang remote branch khác:

```bash
git checkout branch-name

```
+ Xem lịch sử commit :
```bash
git log

git log --all --decorate --oneline --graph (alias git l)
```
- Hoàn tác commit
+ Local (unpublished):
```bash
git reset --hard <commit> → reset và bỏ thay đổi

git reset --soft <commit> → reset nhưng giữ thay đổi trong staging

git reset <commit> → reset, giữ thay đổi (không stage)
```
+ Remote (published):
```bash
git revert <commit> → tạo commit mới để revert thay đổi
```
- Checkout commits
git checkout <commit> → xem lại trạng thái repo tại commit

Quay về branch chính: git checkout master

- Commit references
HEAD → commit hiện tại

HEAD~1 → commit cha của HEAD

master~1 → commit cha của tip của branch master

- Commit search
+ Theo nội dung:

 ```bash
git log -S "Hello, World!" --oneline
```
+ Theo message:

 ```bash
 
git log --grep="#2244" --oneline
Diff
git diff → thay đổi chưa stage

git diff --staged → thay đổi đã stage

git diff <commit> → so sánh với commit cụ thể

git diff <commit1> <commit2> → so sánh giữa 2 commit

git diff <commit> -- ./file.txt → so sánh một file cụ thể
```