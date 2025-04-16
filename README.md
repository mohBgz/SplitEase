# SplitEase

**SplitEase** is a web application designed to simplify splitting bills among friends sharing the same receipt. It is a full-stack solution built with **Vite + React** on the frontend and **Node.js** on the backend, fully containerized using **Docker** for local development.

> **⚠️ Note:** The application is still under development and not fully functional. Some features may be incomplete or subject to change.
---

## 🚀 Getting Started

Follow these steps to set up and run the project locally for development using Docker.

---

## 📋 Prerequisites

Ensure the following tools are installed on your system:

- **Docker**: [Get Docker](https://www.docker.com/get-started)
- **Docker Compose**: Included with Docker Desktop

---

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/mohBgz/SplitEase.git
cd SplitEase
```

### Step 2: Start the Development Environment with Docker Compose

Build and launch the development environment using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Once running, access the application at:

- 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
- 🔌 **Backend**: [http://localhost:5000](http://localhost:5000)

✅ **Hot Reload Enabled**  
Changes in the source code will automatically reflect in the running containers.

---

## 🧪 Testing the Application

You can test the app in two ways:

1. 📁 Use sample bills from `./backend/tests/data/`
2. 📤 Upload your own `.json` bills via:
    - The web interface
    - Tools like Postman

---


> **Note:** This setup is optimized for development. Changes to the code will automatically reflect in the running containers.

---
