# G-Scores

Hệ thống tra cứu và thống kê điểm thi THPT 2024.

* **Link Demo Trực Tuyến:** [https://g-score-2024.netlify.app/](https://g-score-2024.netlify.app/)

> ⚠️ **LƯU Ý VỀ DỮ LIỆU BẢN CLOUD:** 
> Do chính sách giới hạn bộ nhớ đệm (1GB storage) của gói cơ sở dữ liệu Cloud miễn phí, cơ sở dữ liệu trên Cloud chỉ chứa điểm thi của **470.000 thí sinh đầu tiên** (tra cứu các SBD lớn hơn sẽ báo không có điểm). 
> Nếu bạn khởi chạy ứng dụng dưới máy **Local** hoặc bằng **Docker Local**, hệ thống sẽ nạp và hiển thị **đầy đủ 100% dữ liệu (1.061.605 thí sinh)** không bị giới hạn.

---

## 🛠️ Công nghệ sử dụng

### Frontend
* **React.js** (Phiên bản 18+, khởi tạo bằng **Vite**).
* **React Router DOM** (Quản lý định tuyến trang).
* **Axios** (Kết nối và gọi API tới Backend).
* **Vanilla CSS** (Thiết kế giao diện hiện đại, responsive).

### Backend
* **Node.js** & **Express.js** (Xây dựng các RESTful API).
* **Sequelize ORM** (Tương tác và quản lý Database thông qua các Model, Migration, Seeder).
* **csv-parse** (Đọc và xử lý file CSV dữ liệu thi dung lượng lớn).

### Database
* **MySQL 8.0** (Hệ quản trị cơ sở dữ liệu quan hệ).

---

## 🚀 Công nghệ Deploy (Môi trường Cloud)

* **Frontend Web Hosting:** **Netlify** (Tự động build và phân phối qua CDN).
* **Backend Web Service:** **Render** (Máy chủ chạy Node.js).
* **Database Cloud:** **Aiven** (Dịch vụ cung cấp MySQL Cloud bảo mật SSL).
* **Containerization:** **Docker** & **Docker Compose** (Đóng gói môi trường chạy thử cục bộ tiện lợi).

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
