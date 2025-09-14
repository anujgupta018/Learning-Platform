# Learning-Platform

```markdown
A full-stack online learning platform where instructors can create courses and quizzes, and students can browse courses, complete lectures, and track their progress. Built with **React (TypeScript)**, **Node.js (Express)**, and **MongoDB**.

---

## 🚀 Features

### ✅ Authentication & Authorization

- User registration and login with JWT-based authentication
- Role-based access control (Instructor vs Student)

### ✅ Instructor Features

- Create new courses with titles and descriptions
- Add lectures (Reading or Quiz type)
- Manage quizzes with questions, options, and correct answers

### ✅ Student Features

- Browse and view available courses
- Navigate through lectures sequentially
- Complete reading lectures by viewing
- Attempt quizzes with automatic grading
- Track progress with percentage of completed lectures

---

## 🛠 Tech Stack

| Frontend           | Backend           | Database |
| ------------------ | ----------------- | -------- |
| React (TypeScript) | Node.js (Express) | MongoDB  |

Additional libraries:

- `bcryptjs` for password hashing
- `jsonwebtoken` for token-based authentication
- `mongoose` for MongoDB ORM

---

## 📂 Folder Structure
```

learning-platform/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── .env

│ ├── package.json

│ └── server.ts

├── frontend/

│ └── (React app code)

├── .gitignore

└── README.md

````

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/anujgupta018/Learning-Platform.git
cd Learning-Platform
````

### Setup Backend

```bash
cd backend
npm install
```

1. Create a `.env` file in `backend/` with the following variables:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

2. Start the server:

```bash
npm start
```

### Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

You need to set up the following environment variables in `backend/.env`:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

> **Note** : Use a strong, random string for `JWT_SECRET`. You can generate it using online tools or Node.js.

---

## 📖 API Endpoints

### Auth

- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login and receive a token

### Courses

- `POST /api/courses` → Create a course (Instructor only)
- `GET /api/courses` → Get list of all courses

### Lectures

- `POST /api/lectures` → Add a lecture (Instructor only)
- `GET /api/lectures/:id` → Get lecture details

### Progress

- `GET /api/progress` → Get progress for logged-in user

---

## ✅ How to Use

1. Register as an instructor or student.
2. Instructors can create courses and lectures.
3. Students can browse courses, view lectures, and track their progress.
4. JWT tokens are used for secure communication between frontend and backend.

---

## 📚 Future Improvements

✔ File upload for lectures (images, PDFs)

✔ Search functionality for courses

✔ Responsive UI for mobile devices

✔ Unit and integration testing

✔ Password reset functionality via email

---

## 🤝 Contribution

Feel free to fork this repository and create pull requests! Contributions are welcome.

---

## 📜 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

## 📬 Contact

**Anuj Gupta**

GitHub: [@anujgupta018](https://github.com/anujgupta018)

Email: invincibleanuj1718@gmail.com

---
