# Ứng dụng Kiểm tra Số dư Ví trên Ronin Saigon Testnet

Dự án này được thiết kế cho học sinh trung học cơ sở và trung học phổ thông (lớp 9 đến lớp 12) để học cách kiểm tra số dư của một địa chỉ ví EVM trên mạng Ronin Saigon (testnet).

## Mô tả

Ứng dụng này sử dụng TypeScript và thư viện ethers.js để kết nối trực tiếp đến mạng Ronin Saigon testnet thông qua một node RPC công cộng. Nó cho phép người dùng kiểm tra số dư của một địa chỉ ví EVM cụ thể và hiển thị số dư bằng đơn vị RON.

## Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- npm (trình quản lý gói của Node.js)

## Hướng dẫn cài đặt

### Bước 1: Cài đặt Node.js và npm

1. Truy cập trang web chính thức của Node.js: https://nodejs.org/
2. Tải xuống phiên bản LTS (Long Term Support) mới nhất
3. Cài đặt Node.js theo hướng dẫn trên màn hình
4. Để kiểm tra cài đặt, mở Terminal (hoặc Command Prompt trên Windows) và gõ:
   ```
   node -v
   npm -v
   ```

### Bước 2: Tải và cài đặt dự án

1. Tải xuống hoặc sao chép dự án này vào máy tính của bạn
2. Mở Terminal (hoặc Command Prompt) và di chuyển đến thư mục dự án:
   ```
   cd đường-dẫn-đến-thư-mục-dự-án
   ```
3. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```

## Cách sử dụng

### Kiểm tra số dư của một địa chỉ ví

1. Mở Terminal và di chuyển đến thư mục dự án
2. Chạy lệnh sau để kiểm tra số dư:
   ```
   npm run check-balance
   ```
3. Nhập địa chỉ ví EVM khi được yêu cầu (ví dụ: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F)

### Ví dụ

```
$ npm run check-balance
Nhập địa chỉ ví EVM: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
Đang kết nối đến mạng Ronin Saigon testnet...
Số dư của địa chỉ 0x71C7656EC7ab88b098defB751B7401B5f6d8976F: 10.5 RON
```

## Cấu trúc dự án

- `src/index.ts`: File chính của ứng dụng, chứa mã nguồn để kiểm tra số dư ví
- `src/utils.ts`: Chứa các hàm tiện ích như chuyển đổi đơn vị từ wei sang RON

## Tìm hiểu thêm

- Trang chính thức của Ronin: https://roninchain.com/
- Tài liệu về ethers.js: https://docs.ethers.org/
- Tài liệu về TypeScript: https://www.typescriptlang.org/docs/