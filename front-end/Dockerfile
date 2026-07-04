# --- STAGE 1: Build React App ---
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Biên dịch React app sang thư mục dist
RUN npm run build

# --- STAGE 2: Chạy Web Server Nginx ---
FROM nginx:alpine

# Sao chép cấu hình nginx đã chuẩn bị vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép các file tĩnh đã build ở Stage 1 vào thư mục phục vụ của Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose cổng port 80 cho web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
