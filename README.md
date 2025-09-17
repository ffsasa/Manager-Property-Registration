# Manager Property Registration Frontend

Ứng dụng quản trị nội bộ để đăng nhập và theo dõi danh sách khách hàng đăng ký tư vấn. Dự án được xây dựng với [React](https://react.dev) và [Vite](https://vitejs.dev/) sử dụng JavaScript thuần (không TypeScript).

## Tính năng chính

- Đăng nhập sử dụng tài khoản nội bộ, xác thực bằng JWT token.
- Lưu trữ phiên đăng nhập với `localStorage` để tự động duy trì trạng thái.
- Hiển thị danh sách khách hàng từ API `Consultation` với phân trang.
- Đánh dấu trực quan các khách hàng mới (khi trường `isCheck`/`ischeck` là `false`).
- Làm mới danh sách và đăng xuất.
- Giao diện và cấu trúc thư mục chuẩn để tái sử dụng cho các dự án quản trị tương tự.

## Cấu trúc thư mục

```
├── public/               # Tài nguyên tĩnh (favicon, logo, ...)
├── src/
│   ├── assets/           # Hình ảnh, icon nội bộ
│   ├── components/       # UI component chia theo domain
│   │   ├── Consultations/
│   │   ├── Layout/
│   │   ├── Pagination/
│   │   └── UI/
│   ├── constants/        # Hằng số dùng chung (base URL, page size,...)
│   ├── context/          # React context (AuthContext)
│   ├── hooks/            # Custom hooks (useAuth,...)
│   ├── pages/            # Trang theo routing (Login, Dashboard)
│   ├── routes/           # Các wrapper cho routing (ProtectedRoute)
│   ├── services/         # Giao tiếp API (authService, consultationService)
│   ├── utils/            # Helper (formatDate, storage,...)
│   ├── App.jsx           # Định nghĩa router
│   ├── index.css         # Style toàn cục
│   └── main.jsx          # Điểm khởi tạo ứng dụng
├── index.html
├── package.json
└── vite.config.js
```

## Cấu hình môi trường

Tạo file `.env` ở thư mục gốc để tùy chỉnh API nếu cần:

```
VITE_API_BASE_URL=http://103.90.224.27:8080
```

> Mặc định ứng dụng sử dụng `http://103.90.224.27:8080` nếu biến môi trường không được khai báo.

## Cài đặt & chạy dự án

```bash
npm install
npm run dev    # Chạy trên http://localhost:5173
npm run build  # Build production
npm run preview
```

## Liên hệ API

- **Đăng nhập:** `POST /api/v1/auth/login`
- **Danh sách tư vấn:** `GET /api/v1/consultations`
  - Tham số phân trang: `page`, `size`
  - Yêu cầu header `Authorization: Bearer <token>`

Các service (`src/services/*.js`) đã chuẩn hóa payload để tương thích với cấu trúc response phổ biến của Swagger API.

## Lưu ý triển khai

- Mặc định ứng dụng sử dụng localStorage để ghi nhớ token. Khi token hết hạn hãy xử lý gia hạn ở service tuỳ theo API thực tế.
- Để tùy chỉnh style hãy cập nhật các file CSS module trong từng component.
- Nếu API trả về tên trường khác (`ischeck`, `fullName`, `phone`, ...), các helper đã xử lý các trường phổ biến. Có thể mở rộng tại `ConsultationList.jsx`.

Chúc bạn triển khai thành công!