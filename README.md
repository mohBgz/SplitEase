# SplitEase

**SplitEase** is a web app designed to make dividing bills easy for friends sharing the same receipt! It is a full-stack web app built with **Vite + React** for the frontend and **Node.js** for the backend. The app is fully containerized using **Docker**.

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine using Docker.

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: Included with Docker Desktop

---

## 🛠️ Installation & Running

### Step 1: Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### Step 2: Run the Project with Docker Compose

Build and start the project using Docker Compose:

```bash
docker-compose up --build
```

Once the containers are running:

- The **frontend** (Vite React app) will be available at: [http://localhost:5173](http://localhost:5173)
- The **backend** (Express app) will be available at: [http://localhost:5000](http://localhost:5000)

---

## 🧪 Testing with Real Bills

You can test the bill upload feature using the following options:

1. Use the sample bills provided in the `./backend/tests/data/` directory.
2. Upload your own JSON bills via the frontend interface or using a tool like Postman.

---

## 🔄 Hot Reload

The app supports hot reload for both the frontend and backend. Any changes to the code will automatically reflect inside the running containers.