# 🛒 Microservices E-Commerce Application

## 📌 Overview

This project is a **practice implementation of a Microservices Architecture** using Python and React.
The system is divided into independent services that communicate via APIs, making it scalable and modular.

---

## 🏗️ Architecture

The application consists of:

* **Frontend (React)** – User Interface
* **Backend Microservices (Python/Flask)**:

  * 🧑 User Service
  * 📦 Product Service
  * 🧾 Order Service

Each service is independent and communicates through REST APIs.

---

## ⚙️ Tech Stack

* **Frontend**: React (Vite)
* **Backend**: Python (Flask)
* **Containerization**: Podman / Docker
* **API Communication**: REST
* **Database**: (Shared or Separate based on configuration)

---

## 📂 Project Structure

```
project-root/
│
├── frontend/
│   └── React application
│
├── backend/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
│
├── docker-compose.yml / podman-compose.yml
└── README.md
```

---

## 🚀 Features

* Microservices-based architecture
* Independent services
* REST API communication
* Containerized deployment
* Scalable and modular design

---

## 🔗 Service Communication

Services communicate via API calls:

```
Frontend → Backend Services → Database
```

Example:

* Frontend calls Product API
* Order service calls Product service internally

---

## 🗄️ Database Design

### Option 1 (Recommended)

Each service has its **own database**

### Option 2 (Current Practice)

All services share the same database but use separate tables

---

## 🐳 Running the Application

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Build and run containers

```bash
podman compose up --build
```

---

### 3. Access application

* Frontend:

```
http://localhost:5173
```

* Backend APIs:

```
http://localhost:5000
```

---

## 🔧 Environment Variables

Example for frontend:

```
VITE_API_URL=http://localhost:5000
```

---

## ⚠️ Important Notes

* Do not use `localhost` inside containers for service communication
* Use service names like:

```
http://backend:5000
```

* Enable CORS in backend for frontend communication

---

## 🧠 Learning Objectives

This project demonstrates:

* Microservices architecture basics
* Container-based deployment
* API communication between services
* Debugging networking & CORS issues

---

## 🔮 Future Improvements

* Add API Gateway
* Implement authentication (JWT)
* Use separate databases per service
* Add message broker (Kafka/RabbitMQ)
* Deploy on cloud

---

## 👨‍💻 Author

Developed as a practice project for learning **DevOps and Microservices Architecture**

---

## 📄 License

This project is for educational purposes only.
