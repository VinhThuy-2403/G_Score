# G-Scores

Hệ thống tra cứu và thống kê điểm thi THPT 2024.

---

## Cách 1: Khởi chạy bằng Docker

### Bước 1: Khởi động các container
Chạy lệnh sau tại thư mục gốc của dự án:
```bash
docker-compose up -d --build
```

### Bước 2: Khởi tạo database và nạp dữ liệu
Chạy các lệnh sau để migrate và seed cơ sở dữ liệu:
```bash
# Tạo cấu trúc bảng
docker exec -it gscores-backend-app npx sequelize-cli db:migrate

# Nạp dữ liệu môn học và điểm thi từ file CSV
docker exec -it gscores-backend-app npx sequelize-cli db:seed:all
```

### Bước 3: Truy cập ứng dụng
* Giao diện người dùng (Frontend): `http://localhost`
* API Backend: `http://localhost:5000`

### Bước 4: Tắt ứng dụng
```bash
docker-compose down
```

---

## Cách 2: Khởi chạy trực tiếp (Local Development)

### Bước 1: Thiết lập Database MySQL & Cấu hình Môi trường
1. Tạo một database mới tên là `gscores` trong MySQL local của bạn (cổng mặc định `3306`).
2. Trong thư mục `back-end`, sao chép file `.env.example` thành file `.env`, sau đó mở file `.env` vừa tạo và cấu hình lại thông tin kết nối database (tài khoản, mật khẩu) cho phù hợp với máy của bạn.

### Bước 2: Khởi chạy Backend
1. Di chuyển vào thư mục backend:
   ```bash
   cd back-end
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Chạy các lệnh khởi tạo database:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
4. Khởi động server backend:
   ```bash
   npm run dev
   ```

### Bước 3: Khởi chạy Frontend
1. Mở terminal mới, di chuyển vào thư mục frontend:
   ```bash
   cd front-end
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Khởi động ứng dụng frontend:
   ```bash
   npm run dev
   ```
4. Mở trình duyệt và truy cập: `http://localhost:5173`
