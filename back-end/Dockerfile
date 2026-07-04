# Sử dụng Node.js LTS làm base image
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt các thư viện (chỉ cài production dependencies để tối ưu kích thước image)
RUN npm ci --only=production

# Sao chép toàn bộ mã nguồn backend vào container
COPY . .

# Expose cổng port 5000 của backend
EXPOSE 5000

# Lệnh khởi chạy server backend
CMD ["node", "src/server.js"]
