# 🏙️ FixBengaluru

FixBengaluru is a modern, full-stack MERN application that empowers Bengaluru citizens to report neighborhood issues directly to their MLAs. The platform streamlines civic problem reporting, tracking, and resolution, making Bengaluru a better place for everyone.

---

## 🚀 Features
- 📝 User-friendly issue reporting form (area, title, description, contact, image upload)
- 📷 Image upload (compulsory for every issue)
- 📍 Area/ward selection for Bengaluru
- 🗂️ Admin dashboard to view, filter, and update issue status (Pending/Solved)
- 🔐 Admin authentication with JWT
- 🌗 Light/Dark theme toggle
- 📱 Responsive, modern UI

---

## 🛠 Tech Stack
- **Frontend:** React, Axios, CSS Modules
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (admin only)
- **Image Upload:** Multer
- **Database:** MongoDB Atlas (or local)

---

## 📦 Project Structure
```
FixBengaluru/
  backend/
    controllers/
    models/
    routes/
    uploads/
    server.js
    ...
  frontend/
    src/
      components/
      App.js
      ...
    public/
    ...
  README.md
```

---

## ⚡️ Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd FixBengaluru
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
- Create a `.env` file for sensitive configs (optional, recommended for production).
- Start the backend:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm start
```

### 4. Access the App
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🏗️ Usage
- **Report an Issue:** Fill out the form, upload an image, and submit.
- **Admin Login:** Go to `/admin/login`, log in as admin, and manage issues.
- **Update Status:** Admins can mark issues as Pending or Solved.
- **Theme Toggle:** Use the 🌙/☀️ button in the navbar.

---

## 👤 Admin Setup
- Register an admin via the backend `/api/auth/register` endpoint with `role: "admin"`.
- Or, insert an admin user directly in MongoDB with a bcrypt-hashed password and `role: "admin"`.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


